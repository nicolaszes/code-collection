const cp = require('child_process')
const cpus = require('os').cpus()

cpus.map(() => cp.fork('./handle.Child.js'))
