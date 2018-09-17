// Dependecies
const http = require('http')
const https = require('https')
const url = require('url')
const { StringDecoder } = require('string_decoder')
const path = require('path')
const config = require('./config')
const fs = require('fs')
const handlers = require('./handlers')
const helpers = require('./helpers')
const util = require('util')
const debug = util.debuglog('server')

const server = {}

// Instantiate the HTTP server
server.httpServer = http.createServer((req, res) => {
  server.unifiedServer(req, res)
})

// Instantiate the HTTPS 
server.httpsServerOptions = {
  'key': fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
  'cert': fs.readFileSync(path.join(__dirname, '/../https/cert.pem'))
}
server.httpsServer = https.createServer(server.httpsServerOptions, (req, res) => {
  server.unifiedServer(req, res)
})

server.unifiedServer = (req, res) => {
  const parseUrl = url.parse(req.url, true)
  const path = parseUrl.pathname
  const method = req.method.toLowerCase()
  const trimmedPath = path.replace(/^\/+|\/+$/g, '')
  const queryStringObject = parseUrl.query
  const headers = req.headers

  const decoder = new StringDecoder('utf-8')
  let buffer = ''

  req.on('data', (data) => {
    buffer += decoder.write(data)
  })
  req.on('end', () => {
    buffer += decoder.end()

    let chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' 
      ? server.router[trimmedPath] 
      : handlers.notFound

    // If the request is within the public directory use to the public handler instead
    chosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler

    const data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : helpers.parseJsonToObject(buffer)
    }

    chosenHandler(data, (statusCode, payload, contentType) => {
      // Determine the type of response (fallback to JSON)
      contentType = typeof(contentType) == 'string' ? contentType : 'json';

      statusCode = typeof(statusCode) === 'number' ? statusCode : 200

      let payloadString = ''
      if(contentType == 'json'){
        res.setHeader('Content-Type', 'application/json')
        payload = typeof(payload) == 'object'? payload : {}
        payloadString = JSON.stringify(payload)
      }

      if(contentType == 'html'){
        res.setHeader('Content-Type', 'text/html')
        payloadString = typeof(payload) == 'string'? payload : ''
      }

      if(contentType == 'favicon'){
        res.setHeader('Content-Type', 'image/x-icon')
        payloadString = typeof(payload) !== 'undefined' ? payload : ''
      }

      if(contentType == 'plain'){
        res.setHeader('Content-Type', 'text/plain')
        payloadString = typeof(payload) !== 'undefined' ? payload : ''
      }

      if(contentType == 'css'){
        res.setHeader('Content-Type', 'text/css')
        payloadString = typeof(payload) !== 'undefined' ? payload : ''
      }

      if(contentType == 'png'){
        res.setHeader('Content-Type', 'image/png')
        payloadString = typeof(payload) !== 'undefined' ? payload : ''
      }

      if(contentType == 'jpg'){
        res.setHeader('Content-Type', 'image/jpeg')
        payloadString = typeof(payload) !== 'undefined' ? payload : ''
      }

      res.writeHead(statusCode)
      res.end(payloadString)

      // if the response is 200, print green otherwise print red
      if (statusCode === 200) {
        debug('\x1b[32m%s\x1b[0m', method.toUpperCase()+' /' + trimmedPath + ' ' + statusCode)
      } else {
        debug('\x1b[31m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
      }
    })
  })
}

// Define a request router
server.router = {
  '' : handlers.index,
  'account/create' : handlers.accountCreate,
  'account/edit' : handlers.accountEdit,
  'account/deleted' : handlers.accountDeleted,
  'session/create' : handlers.sessionCreate,
  'session/deleted' : handlers.sessionDeleted,
  'checks/all' : handlers.checksList,
  'checks/create' : handlers.checksCreate,
  'checks/edit' : handlers.checksEdit,
  'ping' : handlers.ping,
  'api/users' : handlers.users,
  'api/tokens' : handlers.tokens,
  'api/checks' : handlers.checks,
  'favicon.ico' : handlers.favicon,
  'public' : handlers.public
}

server.init = () => {
  // start the http server
  server.httpServer.listen(config.httpPort, () => {
    console.log('\x1b[36m%s\x1b[0m', 'The server is up and running on port '+config.httpPort+' in '+config.envName+' mode.')
  })

  server.httpsServer.listen(config.httpsPort, () => {
    console.log('\x1b[35m%s\x1b[0m', 'The server is up and running on port '+config.httpsPort+' in '+config.envName+' mode.')
    // console.log()
  })
}

module.exports = server