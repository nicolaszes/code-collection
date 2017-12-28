/**
 * 代理模式：“为一个对象提供一个代用品或占位符，以便控制对它的访问”
 */
var Flower = function () {};

var xiaoming = {
  sendFlower: function (target) {
    var flower = new Flower();
    target.recieveFlower(flower);
  }
}

var B = {
  recieveFlower: function (flower) {
    A.listenGoodMood(function () {
      A.recieveFlower(flower);
    })
  }
}

var A = {
  recieveFlower: function (flower) {
    console.log('收到花' + flower);
  },
  listenGoodMood: function (fn) {
    setTimeout(function () {
      fn();
    }, 1000)
  }
}

xiaoming.sendFlower(B)

/**
 * 保护代理和虚拟代理
 * 保护代理：“送花的人中年龄太大的或者没有宝马的，这种请求就可以直接在代理B处被拒绝掉。”
 * 虚拟代理：“假设现实中的花价格不菲，导致在程序世界里，new Flower也是一个代价昂贵的操作，那么我们可以把new Flower的操作交给代理B去执行，代理B会选择在A心情好时再执行new Flower”
 */
var B = {
  recieveFlower: function (flower) {
    A.listenGoodMood(function () {
      var flower = new Flower();
      A.recieveFlower(flower);
    })
  }
}

/**
 * 虚拟代理实现图片预加载
 */
var myImage = (function () {
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
    setSrc: function (src) {
      imgNode.src = src;
    }
  }
})();

var proxyImage = (function () {
  var img = new Image;
  img.onload = function () {
    myImage.setSrc(this.src);
  }
  return {
    setSrc: function (src) {
      myImage.setSrc( 'file:// /C:/Users/svenzeng/Desktop/loading.gif' );
      img.src = src;
    }
  }
})();
proxyImage.setSrc('http://imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg')

/**
 * 代理和本体接口的一致性
 */
var myImage = (function () {
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
    imgNode.src = src;
  }
})();

var proxyImage = (function () {
  var img = new Image;
  img.onload = function () {
    myImage.setSrc(this.src);
  }
  return {
    myImage.setSrc( 'file:// /C:/Users/svenzeng/Desktop/loading.gif' );
    img.src = src;
  }
})();
proxyImage.setSrc('http://imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg')


/**
 * 虚拟代理合并 HTTP请求
 */
var synchronousFile = function( id ){
  console.log( '开始同步文件，id为: ' + id );
};

var proxySynchronousFile = (function(){
  var cache = [],    // 保存一段时间内需要同步的ID
      timer;    // 定时器

  return function( id ){
    cache.push( id );
    if ( timer ){    // 保证不会覆盖已经启动的定时器
      return;
    }

    timer = setTimeout(function () {
      synchronousFile( cache.join( ',' ) );    // 2秒后向本体发送需要同步的ID集合
      clearTimeout( timer );    // 清空定时器
      timer = null;
      cache.length = 0; // 清空ID集合
    }, 2000 );
  }
})();

var checkbox = document.getElementsByTagName( 'input' );

for ( var i = 0, c; c = checkbox[ i++ ]; ){
  c.onclick = function(){
    if ( this.checked === true ){
      proxySynchronousFile( this.id );
    }
  }
};


/**
 * 缓存代理
 */
var mult = function(){
  console.log( '开始计算乘积' );
  var a = 1;
  for ( var i = 0, l = arguments.length; i < l; i++ ){
    a = a * arguments[i];
  }
  return a;
};

mult( 2, 3 );    // 输出：6
mult( 2, 3, 4 );    // 输出：24

// 加入缓存代理函数
var proxyMult = (function () {
  var cache = {};
  return function () {
    var args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }
    return cache[args] = mult.apply(this, arguments);
  }
})();

proxyMult(1, 2, 3, 4);
proxyMult(1, 2, 3, 4);

// 用于 ajax异步请求数据，后台不适合

/**
 * 用高阶函数动态创建代理
 */
/**************** 计算乘积 *****************/
var mult = function(){
  var a = 1;
  for ( var i = 0, l = arguments.length; i < l; i++ ){
    a = a * arguments[i];
  }
  return a;
};

/**************** 计算加和 *****************/
var plus = function(){
  var a = 0;
  for ( var i = 0, l = arguments.length; i < l; i++ ){
    a = a + arguments[i];
  }
  return a;
};

// 加入缓存代理函数
var createProxyFactory = function (fn) {
  var cache = {};
  return function () {
    var args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }
    return cache[args] = fn.apply(this, arguments);
  }
};

var proxyMult = createProxyFactory( mult ),
proxyPlus = createProxyFactory( plus );

alert ( proxyMult( 1, 2, 3, 4 ) );    // 输出：24
alert ( proxyMult( 1, 2, 3, 4 ) );    // 输出：24
alert ( proxyPlus( 1, 2, 3, 4 ) );    // 输出：10
alert ( proxyPlus( 1, 2, 3, 4 ) );    // 输出：10
