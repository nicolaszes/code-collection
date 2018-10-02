const { fork } = require('child_process')
const cpus = require('os').cpus()

const server = require('net').createServer()
server.listen(1337)

const workers = {}
const createWorker = () => {
  const worker = fork(__dirname + '/worker.js')

  // 退出时重新启动新的进程
  worker.on('exit', () => {
    console.log(`Worker ${worker.pid} exited`)
    delete workers[worker.pid]
    createWorker()
  })

  // 句柄转发
  worker.send('server', server)
  workers[worker.pid] = worker
  console.log(`create worker pid ${worker.pid}`)
}

cpus.map(() => createWorker())

process.on('exit', () => {
  workers.map((worker) => workers[worker.pid].kill())
})