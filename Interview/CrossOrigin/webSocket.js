/**
 * webSocket
 * 不受同源策略限制，实现了浏览器和服务器全双工通信，同时允许跨域通讯
 *
 * socket.io.js
 * 原生WebSocket API使用起来不太方便，我们使用Socket.io，
 * 它很好地封装了webSocket接口，提供了更简单、灵活的接口，
 * 也对不支持webSocket的浏览器提供了向下兼容。
 */
<script src="./socket.io.js"></script>
{/* <script> */}
  var socket = io('http://www.domain2.com:8080');
  {/* 连接成功处理 */}
  socket.on('connect', function () {
    // 监听服务端消息
    socket.on('message', function (msg) {
      console.log('data from server: ---->' + msg)
    })

    // 监听服务端关闭
    socket.on('disconnect', function () {
      console.log('server socket has closed')
    })
  })

  document.getElementsByTagName('input')[0].onblur = function () {
    socket.send(this.value)
  }
// </script>
