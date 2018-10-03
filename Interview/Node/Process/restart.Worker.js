const http = require('http')
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('handled by child, pid is ' + process.pid + '\n')
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

process.on('uncaughtException', () => {
  // 停止接收新的连接
  worker.close(() => {
    // 所有已有连接断开后，退出进程
    process.exit(1)
  })
})