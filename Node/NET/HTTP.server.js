const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain'})
  res.end('hello world\n')
})

server.listen(1337, '127.0.0.1')

// curl -v http://127.0.0.1:1337/
// *   Trying 127.0.0.1...
// 三次握手
// * TCP_NODELAY set
// * Connected to 127.0.0.1 (127.0.0.1) port 1337 (#0)

// 完成握手，客户端向服务端发送请求报文
//   GET / HTTP/1.1
//   Host: 127.0.0.1:1337
//   User-Agent: curl/7.54.0
//   Accept: */*

// 服务端完成处理后，向客户端发送响应内容，包括响应头和响应体
//   HTTP/1.1 200 OK
//   Content-Type: text/plain
//   Date: Tue, 11 Sep 2018 13:46:41 GMT
//   Connection: keep-alive
//   Transfer-Encoding: chunked
//  
//  hello world

// 结束会话
// * Connection #0 to host 127.0.0.1 left intact
// * Closing connection #0