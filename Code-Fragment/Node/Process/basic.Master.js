const { fork } = require('child_process')
const cpus = require('os').cpus()

cpus.map(() => fork('./basic.Worker.js'))
