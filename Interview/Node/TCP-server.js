const net = require('net')
const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    socket.write('你好')
  })
  socket.on('end', () => {
    console.log('连接断开')
  })
  socket.write('欢迎光临 node')
})

server.listen(8124, function () {
  console.log('server bound')
})
server.listen('/tmp/echo.sock')