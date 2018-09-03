const dgram = require('dgram')
const message = new Buffer('deep in node')

const client = dgram.createSocket('udp4')
client.send(message, 0, message.length, 41234, 'localhost', (err, bytes) => {
  client.close()
})