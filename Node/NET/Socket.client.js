const WebSocket = (url) => {
  this.options = parseUrl(url)
  this.connect()
}
WebSocket.prototype.onopen = () => {
  // Todo
}
WebSocket.prototype.setSocket = (socket) => {
  this.socket = socket
}
// WebSocket.prototype.connect = () => {
//   const 
// }