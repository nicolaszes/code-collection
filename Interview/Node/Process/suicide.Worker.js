const http = require('http')
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('handled by child, pid is ' + process.pid + '\n')
  throw new Error()
})

let worker
process.on('message', (m, tcp) => {
  if (m === 'server') {
    worker = tcp
    worker.on('connection', (socket) => {
      server.emit('connection', socket)
    })
  }
})

process.on('uncaughtException', (err) => {
  // 记录日志
  console.error('err', err)

  // 发送自杀信号
  process.send({ act: 'suicide' })

  // 停止接收新的连接
  worker.close(() => {
    // 所有已有连接断开后，退出进程
    process.exit(1)
  })

  // 有可能我们的连接是长连接，不是HTTP服务的这种短连接，
  // 等待长连接断开可能需要较久的时间。
  // 为此为已有连接的断开设置一个超时时间是必要的
  setTimeout(() => {
    process.exit(1)
  }, 5000)
})