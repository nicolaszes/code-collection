const environments = {}

environments.staging = {
  'httpPort': 3333,
  'httpsPort' : 3334,
  'envName': 'staging',
  'hashingSecret': 'thisIsASecret',
  'maxChecks' : 5,
  'twilio' : {
    'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
    'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
    'fromPhone' : '+15005550006'
  },
  'templateGlobals' : {
    'appName' : 'UptimeChecker',
    'companyName' : 'NotARealCompany, Inc.',
    'yearCreated' : '2018',
    'baseUrl' : 'http://localhost:3333/'
  }
}

environments.production = {
  'httpPort': 5000,
  'httpsPort' : 5001,
  'envName': 'production',
  'hashingSecret': 'thisIsAlsoASecret',
  'maxChecks' : 5,
  'twilio' : {
    'accountSid' : '',
    'authToken' : '',
    'fromPhone' : ''
  }
}

const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' 
  ? process.env.NODE_ENV.toLowerCase() 
  : ''
const environmentToExport = typeof(environments[currentEnvironment]) === 'object' 
  ? environments[currentEnvironment] 
  : environments.staging

module.exports = environmentToExport