/**
 * 单例模式：保证一个类只有一个实例，并提供一个访问它的全局访问点
 * 用途：线程池，全局缓存，浏览器的 window对象
 * 登录浮窗
 */
var Singleton = function (name) {
  this.name = name;
  this.instance = null;
}

Singleton.prototype.getName = function () {
  alert(this.name);
}

Singleton.getInstance = function (name) {
  if(!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
}

var a = Singleton.getInstance('seven1');
var b = Singleton.getInstance('seven2');

alert(a === b)

/**
 * 透明的单例模式
 * 例子：负责在页面中创建唯一的 div节点
 */
var CreateDiv = (function () {
  var instance;
  var CreateDiv = function (html) {
    if (instance) {
      return instance;
    }
    this.html = html;
    this.init();
    return instance = this;
  }

  CreateDiv.prototype.init = function () {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  }

  return CreateDiv;
})();

var a = new CreateDiv('seven1')
var b = new CreateDiv('seven2')

/**
 * 代理实现单例模式
 * CreateDiv 变成一个普通的类
 */
var CreateDiv = function (html) {
  this.html = html;
  this.init();
}

CreateDiv.prototype.init = function () {
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div)
}

var ProxySingletonCreateDiv = (function () {
  var instance;
  return function (html) {
    if (!instance) {
      instance = new CreateDiv(html);
    }
    return instance;
  }
})();

var a = new ProxySingletonCreateDiv( 'sven1' );
var b = new ProxySingletonCreateDiv( 'sven2' );

alert ( a === b );


/**
 * 惰性单例
 */
var createLoginLayer = (function () {
  var div;
  return function () {
    if(!div) {
      div = document.createElement('div');
      div.innerHTML = '我是登录浮窗'
      div.style.display = 'none'
      document.body.appendChild(div);
    }
    return div;
  }
})();

document.getElementById('loginBtn').onClick = function () {
  var loginLayer = createLoginLayer();
  loginLayer.style.display = 'block';
}

/**
 * 通用的惰性单例
 * “创建对象的方法fn被当成参数动态传入getSingle函数”
 */
var getSingle = function () {
  var result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  }
}

var createLoginLayer = function () {
  var div = document.createElement('div');
  div.innerHTML = '我是登录浮窗';
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
}

var createSingleLoginLayer = getSingle(createLoginLayer);
document.getElementById('loginBtn').onClick = function () {
  var loginLayer = createSingleLoginLayer();
  loginLayer.style.display = 'block';
}

var createSingleIframe = getSingle( function(){
    var iframe = document.createElement ( 'iframe' );
    document.body.appendChild( iframe );
    return iframe;
});

document.getElementById( 'loginBtn' ).onclick = function(){
    var loginLayer = createSingleIframe();
    loginLayer.src = 'http://baidu.com';
};
