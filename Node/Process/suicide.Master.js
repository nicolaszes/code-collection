const { fork } = require('child_process')
const cpus = require('os').cpus()

const server = require('net').createServer()
server.listen(1337)

// 重启次数
const limit = 10
// 时间单位
const during = 60000
const restart = []
const isTooFrequently = () => {
  // 记录重启时间
  const time = Date.now()
  const length = restart.push(time)
  if (length > limit) {
    // 取出最后10个记录
    restart = restart.slice(limit * -1)
  }
  // 最后一次重启到前10次重启之间的时间间隔
  return restart.length >= limit && restart[restart.length - 1] - restart[0] < during
}

const workers = {}
const createWorker = () => {
  // 检查是否太过频繁
  if (isTooFrequently()) {
    // 触发giveup事件后，不再重启
    process.emit('giveup', length, during)
    return
  }

  const worker = fork(__dirname + '/suicide.Worker.js')

  worker.on('exit', () => {
    console.log('Worker ' + worker.pid + ' exited.');
    delete workers[worker.pid]
  })

  // 启动新的进程
  worker.on('message', (message) => {
    if (message.act === 'suicide') {
      createWorker()
    }
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