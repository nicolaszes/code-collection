const socket = require('ws://127.0.0.1:12010/updates')
socket.open = () => {
  setInterval(() => {
    if (socket.bufferedAmount === 0) {
      socket.send(getUpdateData())
    }
  }, 50)
}
socket.onmessage = (event) => {
  // Todo event data
}