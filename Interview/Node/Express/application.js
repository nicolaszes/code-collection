/**
 * 仅仅核心部分
 */
module.exports = function createApplication() {
  /**
   * 把一些常用的功能和变量绑定到了app对象中去
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  var app = function(req, res, next) {
    app.handle(req, res, next)
  }

  mixin(app, EventEmitter.prototype, false)
  mixin(app, proto, false)

  // expose the prototype that will get set on requests
  app.request = Object.create(req, {
    app: { 
      configurable: true,
      enumerable: true,
      writable: true,
      value: app
    }
  })

  // expose the prototype that will get set on responses
  app.response = Object.create(res, {
    app: { 
      configurable: true,
      enumerable: true,
      writable: true,
      value: app
    }
  })

  app.listen = function listen() {
    var server = http.createServer(this)
    return server.listen.apply(server, arguments)
  }

  app.use = function use(fn) {
    var offset = 0
    var path = '/'
  
    // default path to '/'
    // disambiguate app.use([fn])
    if (typeof fn !== 'function') {
      var arg = fn
  
      while (Array.isArray(arg) && arg.length !== 0) {
        arg = arg[0]
      }
  
      // first arg is the path
      if (typeof arg !== 'function') {
        offset = 1
        path = fn
      }
    }
  
    var fns = flatten(slice.call(arguments, offset))
  
    if (fns.length === 0) {
      throw new TypeError('app.use() requires middleware functions')
    }
  
    // setup router
    this.lazyrouter()
    var router = this._router
  
    fns.forEach(function (fn) {
      // non-express app
      if (!fn || !fn.handle || !fn.set) {
        return router.use(path, fn)
      }
  
      debug('.use app under %s', path)
      fn.mountpath = path
      fn.parent = this
  
      // restore .app property on req and res
      router.use(path, function mounted_app(req, res, next) {
        var orig = req.app
        fn.handle(req, res, function (err) {
          setPrototypeOf(req, orig.request)
          setPrototypeOf(res, orig.response)
          next(err)
        })
      })
  
      // mounted an app
      fn.emit('mount', this)
    }, this)
  
    return this
  }

  app.init()
  return app
}