/** @format */
const crypto = require('crypto')
const fs = require('fs')

export const getFileInfo = (
  filePath: string
): Promise<{ buf: Buffer, md5: string }> => {
  return new Promise((resolve, reject) => {
    const start = new Date().getTime()
    const md5sum = crypto.createHash('md5')
    const stream = fs.createReadStream(filePath)
    let content = []
    stream.on('data', function(chunk) {
      const buf = Buffer.from(chunk)
      md5sum.update(buf)
      content.push(buf)
    })
    stream.on('end', function() {
      const md5 = md5sum.digest('hex')
      resolve({ buf: Buffer.concat(content), md5 })
      console.error(
        '文件:' +
          filePath +
          ',MD5签名为:' +
          md5 +
          '.耗时:' +
          (new Date().getTime() - start) / 1000.0 +
          '秒'
      )
    })
    stream.on('error', function(error) {
      reject(error)
    })
  })
}

getFileInfo('/Users/zhangshuai/Downloads/阳光电影www.ygdy8.com.调音师.BD.720p.国印双语中字.mkv')
