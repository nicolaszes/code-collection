const path = require('path')
const fs = require('fs')
const https = require('https')
const http = require('http')
const url = require('url')
const util = require('util')
const debug = util.debuglog('workers')
const _data = require('./data')
const helpers = require('./helpers.js')
const _logs = require('./logs')

const workers = {}

workers.gatherAllChecks = () => {
  _data.list('checks', (err, checks) => {
    if (!err && checks && checks.length > 0) {
      checks.forEach(check => {
        _data.read('checks', check, (err, originalCheckData) => {
          if (!err && originalCheckData) {
            // pass it
            workers.validateCheckData(originalCheckData)
          } else {
            debug('Error reading one of the checks data')
          }
        })
      })
    } else {
      debug('Error could not find any checks to process')
    }
  })
}

workers.validateCheckData = (originalCheckData) => {
  originalCheckData = typeof(originalCheckData) == 'object' && 
    originalCheckData !== null 
    ? originalCheckData 
    : {}
  originalCheckData.id = typeof(originalCheckData.id) == 'string' 
    && originalCheckData.id.trim().length == 20 
    ? originalCheckData.id.trim() 
    : false
  originalCheckData.userPhone = typeof(originalCheckData.userPhone) == 'string' 
    && originalCheckData.userPhone.trim().length == 11 
    ? originalCheckData.userPhone.trim() 
    : false
  originalCheckData.protocol = typeof(originalCheckData.protocol) == 'string' && 
    ['http','https'].indexOf(originalCheckData.protocol) > -1 
    ? originalCheckData.protocol 
    : false
  originalCheckData.url = typeof(originalCheckData.url) == 'string' && 
    originalCheckData.url.trim().length > 0 
    ? originalCheckData.url.trim() 
    : false
  originalCheckData.method = typeof(originalCheckData.method) == 'string' &&  
    ['post', 'get', 'put', 'delete'].indexOf(originalCheckData.method) > -1 
    ? originalCheckData.method 
    : false
  originalCheckData.successCodes = typeof(originalCheckData.successCodes) == 'object' && 
    originalCheckData.successCodes instanceof Array && 
    originalCheckData.successCodes.length > 0 
    ? originalCheckData.successCodes 
    : false
  originalCheckData.timeoutSeconds = typeof(originalCheckData.timeoutSeconds) == 'number' && 
    originalCheckData.timeoutSeconds % 1 === 0 && originalCheckData.timeoutSeconds >= 1 && 
    originalCheckData.timeoutSeconds <= 5 
    ? originalCheckData.timeoutSeconds 
    : false
  // Set the keys that may not be set (if the workers have never seen this check before)
  originalCheckData.state = typeof(originalCheckData.state) == 'string' && 
    ['up','down'].indexOf(originalCheckData.state) > -1 
    ? originalCheckData.state 
    : 'down'
  originalCheckData.lastChecked = typeof(originalCheckData.lastChecked) == 'number' && 
    originalCheckData.lastChecked > 0 
    ? originalCheckData.lastChecked 
    : false

  // If all checks pass, pass the data along to the next step in the process
  if(originalCheckData.id &&
    originalCheckData.userPhone &&
    originalCheckData.protocol &&
    originalCheckData.url &&
    originalCheckData.method &&
    originalCheckData.successCodes &&
    originalCheckData.timeoutSeconds) {
      workers.performCheck(originalCheckData)
  } else {
    // If checks fail, log the error and fail silently
    debug("Error: one of the checks is not properly formatted. Skipping.")
  }
}

workers.performCheck = (originalCheckData) => {
  // Prepare the intial check outcome
  const checkOutcome = {
    'error' : false,
    'responseCode' : false
  }

  // Mark that the outcome has not been sent yet
  let outcomeSent = false

  // Parse the hostname and path out of the originalCheckData
  const parsedUrl = url.parse(`${originalCheckData.protocol}://${originalCheckData.url}`, true)
  const hostName = parsedUrl.hostname
  const path = parsedUrl.path // Using path not pathname because we want the query string

  const requestDetails = {
    'protocol' : `${originalCheckData.protocol}:`,
    'hostname' : hostName,
    'method' : originalCheckData.method.toUpperCase(),
    'path' : path,
    'timeout' : originalCheckData.timeoutSeconds * 1000
  }

  const _moduleToUse = originalCheckData.protocol == 'http' ? http : https
  const req = _moduleToUse.request(requestDetails, (res) => {
      // Grab the status of the sent request
      const status = res.statusCode

      // Update the checkOutcome and pass the data along
      checkOutcome.responseCode = status
      if(!outcomeSent) {
        workers.processCheckOutcome(originalCheckData,checkOutcome)
        outcomeSent = true
      }
  })

  // Bind to the error event so it doesn't get thrown
  req.on('error', (e) => {
    // Update the checkOutcome and pass the data along
    checkOutcome.error = {'error' : true, 'value' : e}
    if(!outcomeSent) {
      workers.processCheckOutcome(originalCheckData, checkOutcome)
      outcomeSent = true
    }
  })

  // Bind to the timeout event
  req.on('timeout', () => {
    // Update the checkOutcome and pass the data along
    checkOutcome.error = {'error' : true, 'value' : 'timeout'}
    if(!outcomeSent) {
      workers.processCheckOutcome(originalCheckData, checkOutcome)
      outcomeSent = true
    }
  })

  req.end()
}

workers.processCheckOutcome = (originalCheckData, checkOutcome) => {
  // Decide if the check is considered up or down
  const state = !checkOutcome.error && 
    checkOutcome.responseCode && 
    originalCheckData.successCodes.indexOf(checkOutcome.responseCode) > -1 
    ? 'up' 
    : 'down'

  // Decide if an alert is warranted
  const alertWarranted = originalCheckData.lastChecked && 
    originalCheckData.state !== state 
    ? true 
    : false

  const timeOfCheck = Date.now()
  workers.log(originalCheckData, checkOutcome, state, alertWarranted, timeOfCheck)

  // Update the check data
  const newCheckData = originalCheckData
  newCheckData.state = state
  newCheckData.lastChecked = Date.now()

  // Save the updates
  _data.update('checks', newCheckData.id, newCheckData, (err) => {
    if(!err){
      // Send the new check data to the next phase in the process if needed
      if(alertWarranted){
        workers.alertUserToStatusChange(newCheckData)
      } else {
        debug("Check outcome has not changed, no alert needed")
      }
    } else {
      debug("Error trying to save updates to one of the checks")
    }
  })
}

// Alert the user as to a change in their check status
workers.alertUserToStatusChange = (newCheckData) => {
  const msg = 'Alert: Your check for '+newCheckData.method.toUpperCase()+' '+newCheckData.protocol+'://'+newCheckData.url+' is currently '+newCheckData.state
  helpers.sendTwilioSms(newCheckData.userPhone, msg, (err) => {
    if(!err){
      debug("Success: User was alerted to a status change in their check, via sms: ", msg)
    } else {
      debug("Error: Could not send sms alert to user who had a state change in their check", err)
    }
  })
}

workers.log = (originalCheckData, checkOutcome, state, alertWarranted, timeOfCheck) => {
  const logData = {
    'check': originalCheckData,
    'outcome': checkOutcome,
    'state': state,
    'alert': alertWarranted,
    'time': timeOfCheck
  }

  const logString = JSON.stringify(logData)
  const logFileName = originalCheckData.id

  _logs.append(logFileName, logString, (err) => {
    if(!err){
      debug("Logging to file succeeded")
    } else {
      debug("Logging to file failed")
    }
  })
}

workers.rotateLogs = () => {
  // List all the (non compressed) log files
  _logs.list(false, (err, logs) => {
    if(!err && logs && logs.length > 0){
      logs.forEach((logName) => {
        // Compress the data to a different file
        const logId = logName.replace('.log', '')
        const newFileId = logId + '-' + Date.now()
        _logs.compress(logId, newFileId, (err) => {
          if(!err){
            // Truncate the log
            _logs.truncate(logId, (err) => {
              if(!err){
                debug("Success truncating logfile")
              } else {
                debug("Error truncating logfile")
              }
            })
          } else {
            debug("Error compressing one of the log files.", err)
          }
        })
      })
    } else {
      debug('Error: Could not find any logs to rotate')
    }
  })
}

workers.loop = () => {
  setInterval(() => {
    workers.gatherAllChecks()
  }, 1000 * 60)
}

workers.logRotationLoop = () => {
  setInterval(() => {
    workers.rotateLogs()
  },1000 * 60 * 60 * 24)
}

workers.init = () => {
  // Send to console, in yellow
  console.log('\x1b[33m%s\x1b[0m','Background workers are running')
  
  // excute all the checks
  workers.gatherAllChecks()
  // call the loop so the checks will excute later on
  workers.loop()

  // Compress all the logs immediately
  workers.rotateLogs()

  // Call the compression loop so checks will execute later on
  workers.logRotationLoop()
}

module.exports = workers