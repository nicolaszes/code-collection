const cp = require('child_process')
const n = cp.fork('./communicate.Sub.js')

n.on('message', (m) => {
  console.log('Parent got message', m)
})
n.send('hello')