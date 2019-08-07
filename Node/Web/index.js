const http = require('http')
const { handle } = require('./session')

const server = http.createServer((req, res) => {
  handle(req, res)
  // res.writeHead(200, { 'Content-Type': 'text/plain'})
  // res.end('hello world\n')
})

server.listen(4000)