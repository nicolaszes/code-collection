/**
 * 我们现在需要写一个 foo 函数，
 * 这个函数返回首次调用时的 Date 对象，注意是首次
 */

/*
 * 普通方法
 * 污染了全局变量，每次调用都需要进行一次判断
 */
var t;
function foo () {
  if (t) return t;
  t = new Date();
  return t
}

/*
 * 闭包
 * 每次调用都会判断一次
 */
var foo = (function () {
  var t;
  return function () {
    if (t) return t;
    t = new Date();
    return t
  }
})()


/*
 * 函数对象
 * 每次调用都会判断一次
 */
function foo () {
  if (foo.t) return foo.t;
  foo.t = new Date();
  return foo.t;
}

/*
 * 惰性函数
 */
var foo = function () {
  var t = new Date();
  foo = function () {
    return t;
  }
  return foo()
}


/*
 * 应用
 */
// 简化写法
  function addEvent (type, el, fn) {
    if (window.addEventListener) {
      el.addEventListener(type, fn, false);
    }
    else if(window.attachEvent){
      el.attachEvent('on' + type, fn);
    }
  }

// 利用惰性函数，我们可以这样做：
function addEvent (type, el, fn) {
  if (window.addEventListener) {
    addEvent = function (type, el, fn) {
      el.addEventListener(type, fn, false);
    }
  }
  else if(window.attachEvent){
    addEvent = function (type, el, fn) {
    el.attachEvent('on' + type, fn);
    }
  }
}
