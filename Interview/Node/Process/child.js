const http = require('http')
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('handle by child, pid is ' + process.pid + '\n')
})

process.on('message', (m, tcp) => {
  if (m === 'server') {
    tcp.on('connection', socket => {
      server.emit('connection', socket)
    })
  }
})

// process.send({ foo: 'bar' })