const { serilize } = require('./cookie')

const sessionUtils = {}

// 一个键值作为 Session的口令
const sessions = {}
const key = 'session_id'
const EXPIRES = 20 * 60 * 1000

sessionUtils.generate = () => {
  const session = {}
  session.id = (new Date()).getTime() + Math.random()
  session.cookie = {
    expire: (new Date()).getTime() + EXPIRES
  }
  sessions[session.id] = session
  return session
}

// 每个请求到来时，检查 Cookie中的口令与服务器端的数据，若过期，就重新生成
sessionUtils.checkCookie = (req, res) => {
  const id = res.cookies[key]
  if (!id) {
    req.session = generate()
    return null
  }

  const session = sessions[id]

  if (!session) {
    // 如果 session 过期或口令不对，重新生成 session
    req.session = generate()
    return null
  }

  if (session.cookie.expire > (new Date()).getTime()) {
    // 更新超时时间
    session.cookie.expire = (new Date()).getTime() + EXPIRES
    req.session = session
    return null
  }
  
  // 超时了，删除旧的数据，并重新生成
  delete sessions[id]
  req.session = generate()
  return null
}

// 响应给客户端时设置新的值，以便下次请求时能够对应服务器端的数据
sessionUtils.writeHead = (req, res) => {
  const { writeHead } = res
  res.writeHead = () => {
    let cookies = res.getHeader('Set-Cookie')
    const session = serilize(key, req.session.id)
    cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session]
    res.setHeader('Set-Cookie', cookies)
    return writeHead.apply(this, arguments)
  }
}

sessionUtils.handle = (req, res) => {
  if (!(req.cookies && req.cookies.isVisit)) {
    req.session = {
      id: 1,
      isVisit: true
    }

    let cookies = res.getHeader('Set-Cookie') || 'string')
    const session = serilize(
      key, 
      req.session.id, 
      { 
        domain: 'nico.com',
        // httpOnly: true,
        secure: true
      }
    )
    cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session]
    console.log(cookies)
    res.setHeader('Set-Cookie', cookies)

    res.writeHead(200)
    res.end('hello world...')
  } else {
    res.writeHead(200)
    res.end('hello again')
    // Todo
  }
}

module.exports = sessionUtils