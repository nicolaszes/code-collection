const cluster = require('cluster')

cluster.setupMaster({
  exec: 'worker.js'
})

const cpus = require('os').cpus()
cpus.map((item, index) => {
  console.log('cluster', index + 1)
  cluster.fork()
})