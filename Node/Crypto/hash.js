const crypto = require('crypto')
const hash = crypto.createHash('sha256')

const password = '111111'
const salt = '5B6g4a'
const hashPassword = (pwd, salt) => {
  const newPwd = crypto.createHash('sha256')
    .update(pwd + salt, 'utf8')
    .digest('hex')
  console.log(newPwd)
  return newPwd
}

hashPassword('111111', salt)