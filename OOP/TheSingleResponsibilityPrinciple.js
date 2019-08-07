/**
 * 单一职责模式
 *
 * SRP原则的应用难点就是如何去分离职责
 * 一方面，如果随着需求的变化，有两个职责总是同时变化，那就不必分离他们。
 * 比如在ajax请求的时候，创建xhr对象和发送xhr请求几乎总是在一起的，那么创建xhr对象的职责和发送xhr请求的职责就没有必要分开。
 *
 * 另一方面，职责的变化轴线仅当它们确定会发生变化时才具有意义，
 * 即使两个职责已经被耦合在一起，但它们还没有发生改变的征兆，
 * 那么也许没有必要主动分离它们，在代码需要重构的时候再进行分离也不迟。
 *
 * 优点
 * 降低了单个类或者对象的复杂度，按照职责把对象分解成更小的粒度，
 * 这有助于代码的复用，也有利于进行单元测试。当一个职责需要变更的时候，不会影响到其他的职责。
 *
 * 缺点
 * 增加编写代码的复杂度。当我们按照职责把对象分解成更小的粒度之后，实际上也增大了这些对象之间相互联系的难度。
 */

/**
 * 1.代理模式
 */
// myImage 负责往页面中添加 img标签
var myImage = (function() {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc: function(src) {
      imgNode.src = src
    }
  }
})()

// proxyImage 负责预加载图片
var proxyImage = (function() {
  var img = new Image()
  img.load = function() {
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function(src) {
      myImage.setSrc('http://imgcache.qq.com/music/photo/000GGDys0yA0Nk.jpg')
      img.src = src
    }
  }
})()

proxyImage.setSrc('http://imgcache.qq.com/music/photo/000GGDys0yA0Nk.jpg')

/**
 * 迭代器模式
 */
var appendDiv = function(data) {
  for (var i = 0, l = data.length; i < l; i++) {
    var div = document.createElement('div')
    div.innerHTML = data[i]
    document.body.appendChild(div)
  }
}

appendDiv([1, 2, 3, 4, 5, 6])

var each = function(obj, callback) {
  var value,
    i = 0,
    length = obj.length,
    isArray = isArraylike(obj) // isArraylike函数未实现，可以翻阅jQuery源代码

  if (isArray) {
    // 迭代类数组
    for (; i < length; i++) {
      callback.call(obj[i], i, obj[i])
    }
  } else {
    for (i in obj) {
      // 迭代object对象
      value = callback.call(obj[i], i, obj[i])
    }
  }
  return obj
}

var appendDiv = function(data) {
  each(data, function(i, n) {
    var div = document.createElement('div')
    div.innerHTML = n
    document.body.appendChild(div)
  })
}

appendDiv([1, 2, 3, 4, 5, 6])
appendDiv({
  a: 1,
  b: 2,
  c: 3,
  d: 4
})

/**
 * 单例模式
 */
var createLoginLayer = (function() {
  var div
  return function() {
    if (!div) {
      div = document.createElement('div')
      div.innerHTML = '我是登录浮窗'
      div.style.display = 'none'
      document.body.appendChild(div)
    }
    return div
  }
})()

/**
 * 优化后
 */
var getSingle = function(fn) {
  // 获取单例
  var result
  return function() {
    return result || (result = fn.apply(this, arguments))
  }
}

var createLoginLayer = function() {
  // 创建登录浮窗
  var div = document.createElement('div')
  div.innerHTML = '我是登录浮窗'
  document.body.appendChild(div)
  return div
}

var createSingleLoginLayer = getSingle(createLoginLayer)

var loginLayer1 = createSingleLoginLayer()
var loginLayer2 = createSingleLoginLayer()

alert(loginLayer1 === loginLayer2) // 输出： true

/**
 * 装饰者模式
 * 让类或者对象一开始只具有一些基础的职责，更多的职责在代码运行时被动态装饰到对象上面。
 * 装饰者模式可以为对象动态增加职责，从另一个角度来看，这也是分离职责的一种方式。
 * <html>
    <body>
        <button tag="login" id="button">点击打开登录浮层</button>
    </body>
  </html>
 */

Function.prototype.after = function(afterfn) {
  var __self = this
  return function() {
    var ret = __self.apply(this, arguments)
    afterfn.apply(this, arguments)
    return ret
  }
}

var showLogin = function() {
  console.log('打开登录浮层')
}

var log = function() {
  console.log('上报标签为: ' + this.getAttribute('tag'))
}

document.getElementById('button').onclick = showLogin.after(log)
// 打开登录浮层之后上报数据
