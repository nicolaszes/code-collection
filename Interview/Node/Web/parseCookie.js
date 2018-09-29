import { encode } from "punycode";

const parseCookie = (cookie) => {
  const cookies = {}
  if (!cookie) {
    return cookies
  }

  let list = cookie.split(';')
  for (let i = 0; i < list.length; i++) {
    const pair = list[i].split('=')
    cookies[pair[0].trim()] = pair[1]
  }
  return cookies
}

// 在业务逻辑代码执行之前，我们将其挂载在 req对象上，让业务代码可以直接访问
(req, res) => {
  req.cookies = parseCookie(req.headers.cookie)
  handle(req, res)
}

const handle = (req, res) => {
  res.writeHead(200)
  if (!req.cookies.isVisit) {
    res.end('欢迎第一次来到动物园')
  } else {
    // Todo
  }
}

/**
 * Set cookie
 */
const serilize = (name, val, opt) => {
  let pairs = [name + '=' + encode(val)]
  opt = opt || {}
  if (opt.maxAge) pairs.push(`Max-age=${opt.maxAge}`)
  if (opt.domain) pairs.push(`Domain=${opt.domain}`)
  if (opt.path) pairs.push(`Path=${opt.path}`)
  if (opt.expires) pairs.push(`Expires=${opt.expires}`)
  if (opt.httpOnly) pairs.push(`HttpOnly`)
  if (opt.secure) pairs.push(`Secure`)
  return pairs.join('; ')
}

const handle = (req, res) => {
  if (!req.cookies.isVisit) {
    res.setHeader('Set-Cookie', serilize('isVisit', '1'))
    res.writeHead(200)
    res.end('欢迎第一次来到动物园')
  } else {
    res.writeHead(200)
    // Todo
  }
}