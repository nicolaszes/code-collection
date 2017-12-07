/*
 * function cuury
 * 将多个参数的一个函数转换成一系列使用一个参数的函数
 * 用闭包把参数保存起来，当参数的数量足够执行函数了，就开始执行函数
 */
// 示意而已
function ajax(type, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.send(data);
}

// 虽然 ajax 这个函数非常通用，但在重复调用的时候参数冗余
ajax('POST', 'www.test.com', "name=kevin")
ajax('POST', 'www.test2.com', "name=kevin")
ajax('POST', 'www.test3.com', "name=kevin")

// 利用 curry
var ajaxCurry = curry(ajax);

// 以 POST 类型请求数据
var post = ajaxCurry('POST');
post('www.test.com', "name=kevin");

// 以 POST 类型请求来自于 www.test.com 的数据
var postFromTest = post('www.test.com');
postFromTest("name=kevin");


/*
 * curry first edition
 */
var curry = function (fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    var newArgs = args.concat([].slice.call(arguments))
    return fn.apply(this, newArgs)
  }
}

function add(a, b) {
  return a + b;
}

var addCurry = curry(add, 1, 2);
addCurry();

var addCurry = curry(add, 1);
addCurry(2);

var addCurry = curry(add);
addCurry(1, 2);
