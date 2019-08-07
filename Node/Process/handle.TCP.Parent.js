const child1 = require('child_process').fork('./handle.TCP.Child.js')
const child2 = require('child_process').fork('./handle.TCP.Child.js')

// Open up the server object and send the handle
const server = require('net').createServer()

server.on('connection', (socket) => {
  socket.end('handled by parent\n')
})
server.listen(1337, () => {
  child1.send('server', server)
  child2.send('server', server)

  // 关掉
  server.close()
})