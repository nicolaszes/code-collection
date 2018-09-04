const str = 'deep in node'
const buf = new Buffer(str, 'utf-8')
console.log(buf)

const fs = require('fs')
const path = require('path')
const { StringDecoder } = require('string_decoder')
const decoder = new StringDecoder('utf8')

const rs = fs.createReadStream(path.join(__dirname, '/test.md'), { highWaterMark: 11 })
// rs.setEncoding('utf-8')

let data = ''
rs.on('data', (chunk) => {
  data += decoder.write(chunk)
})
rs.on('end', () => {
  console.log(data)
})