const cp = require('child_process')
const child1 = cp.fork(__dirname + '/child.js')
const child2 = cp.fork(__dirname + '/child.js')

const server = require('net').createServer()

server.listen(1337, () => {
  child1.send('server', server)
  child2.send('server', server)

  server.close()
})
// n.on('message', (m) => {
//   console.log('Parent got message', m)
// })
// n.send('hello')