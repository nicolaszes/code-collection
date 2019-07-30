var crypto = require('crypto');
var config = require('../config/configUtils');

var EXPIRES = 20 * 60 * 1000;
var redisMatrix = require('./redisMatrix');

var sign = function (val, secret) {
  return val + '.' + crypto
    .createHmac('sha1', secret)
    .update(val)
    .digest('base64')
    .replace(/[\/\+=]/g, '');
};
var generate = function () {
  var session = {};
  session.id = (new Date()).getTime() + Math.random().toString();
  session.id = sign(session.id, config.getConfigs().SECRET);
  session.expire = (new Date()).getTime() + EXPIRES;
  return session;
};
var serialize = function (name, val, opt) {
  var pairs = [name + '=' + encodeURIComponent(val)];
  opt = opt || {};

  if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
  if (opt.domain) pairs.push('Domain=' + opt.domain);
  if (opt.path) pairs.push('Path=' + opt.path);
  if (opt.expires) pairs.push('Expires=' + opt.expires);
  if (opt.httpOnly) pairs.push('HttpOnly');
  if (opt.secure) pairs.push('Secure');

  return pairs.join('; ');
};

var setHeader = function (req, res, next) {
  var writeHead = res.writeHead;
  res.writeHead = function () {
    var cookies = res.getHeader('Set-Cookie');
    cookies = cookies || [];
    console.log('writeHead, cookies: ' + cookies);
    var session = serialize(config.getConfigs().session_key, req.session.id);
    console.log('writeHead, session: ' + session);
    cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session];
    res.setHeader('Set-Cookie', cookies);
    return writeHead.apply(this, arguments);
  };

  next();
};

exports = module.exports = function session() {
  return function session(req, res, next) {
    var id = req.cookies[config.getConfigs().session_key];
    if (!id) {
      req.session = generate();
      id = req.session.id;
      var json = JSON.stringify(req.session);
      redisMatrix.hsetRedis(
        id, 
        'session', 
        json,
        function () { setHeader(req, res, next); }
      );
    } else {
      console.log('session_id found: ' + id);
      redisMatrix.hgetRedis(id, 'session', function (err, reply) {
        var needChange = true;
        console.log('reply: ' + reply);
        if (reply) {
          var session = JSON.parse(reply);
          if (session.expire > (new Date()).getTime()) {
            session.expire = (new Date()).getTime() + EXPIRES;
            req.session = session;
            needChange = false;
            var json = JSON.stringify(req.session);
            redisMatrix.hsetRedis(
              id, 
              'session',
              json,
              function () { setHeader(req, res, next); }
            );
          }
        }

        if (needChange) {
          req.session = generate();
          id = req.session.id; // id need change
          var json = JSON.stringify(req.session);
          redisMatrix.hsetRedis(
            id,
            'session',
            json,
            function (err, reply) { setHeader(req, res, next); }
          );
        }
      });
    }
  };
};

module.exports.set = function (req, name, val) {
  var id = req.cookies[config.getConfigs().session_key];
  if (id) {
    redisMatrix.hsetRedis(id, name, val, function (err, reply) {

    });
  }
};
/*
 get session by name
 @req request object
 @name session name
 @callback your callback
 */
module.exports.get = function (req, name, callback) {
  var id = req.cookies[config.getConfigs().session_key];
  if (id) {
    redisMatrix.hgetRedis(id, name, function (err, reply) {
      callback(err, reply);
    });
  } else {
    callback();
  }
};

module.exports.getById = function (id, name, callback) {
  if (id) {
    redisMatrix.hgetRedis(id, name, function (err, reply) {
      callback(err, reply);
    });
  } else {
    callback();
  }
};
module.exports.deleteById = function (id, name, callback) {
  if (id) {
    redisMatrix.hdelRedis(id, name, function (err, reply) {
      callback(err, reply);
    });
  } else {
    callback();
  }
};