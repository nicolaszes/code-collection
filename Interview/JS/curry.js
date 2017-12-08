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


/*
 * curry second edition
 */
function sub_curry (fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    return fn.apply(this, args.concat([].slice.call(arguments)))
  }
}

function curry (fn, length) {
  // 判断所需传入的参数的个数
  length = fn.length || length;
  var slice = Array.prototype.slice;

  return function () {
    if (arguments.length < length) {
      var combined = [fn].concat(slice.call(arguments));
      return curry(sub_curry.apply(this, combined), length - arguments.length);
    }
    return fn.apply(this, arguments);
  }
}

var fn = curry(function(a, b, c) {
  return [a, b, c];
});

function curry (fn, args) {
  var length = fn.length;
  args = args || [];

  return function () {
    var _args = args.slice(0);
    for (var i = 0; i < arguments.length; i++) {
      _args.push(arguments[i]);
    }

    if (_args.length < length) {
      return curry.call(this, fn, _args)
    }
    return fn.apply(this, _args)
  }
}

var fn = curry(function (a, b, c) {
  console.log([a, b, c])
})

fn('a', 'b', 'c') // ['a', 'b', 'c']
fn('a', 'b')('c') // ['a', 'b', 'c']
fn('a')('b')('c') // ['a', 'b', 'c']
fn('a')('b', 'c') // ['a', 'b', 'c']


/*
 * es6 实现 curry
 * judge 函数判断当前传入的参数 ...args总长度是否满足 fn.length
 * ...扩展运算符，=> 函数，省去了 this的绑定
 */
let curry = fn =>
    judge = (...args) =>
      args.length === fn.length
      ? fn(...args)
      : (...ele) => judge(...args, ...ele)
let fn = curry((a, b, c, d, e) => (console.log([a, b, c, d, e])))

fn(1)(2)(3)(4)(5)
fn(1, 2, 3, 4, 5)
fn(1, 2, 3)(4, 5)
fn(1, 2)(3, 4, 5)
fn(1, 2)(3, 4)(5)
fn(1)(2)(3, 4)(5)
fn(1)(2)(3)(4, 5)

/*
 * curry third edition
 * 占位符替换
 */
function curry (fn, args, holes) {
  length = fn.length;
  args = args || [];
  holes = holes || [];

  return function () {
    var _args = args.slice(0);
    var _holes = holes.slice(0);
    var argsLen = args.length;
    var holesLen = holes.length;
    var arg;
    var index = 0;

    for (var i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      // 处理类似 fn(1, _, _, 4)(_, 3) 这种情况，index 需要指向 holes 正确的下标
      if (arg === _ && holesLen) {
        index++;
        if (index > holesLen) {
          _args.push(arg);
          _holes.push(argsLen - 1 + index - holesLen)
        }
        console.log('holesLen', holesLen, index, _args)
      }
      // 处理类似 fn(1)(_) 这种情况
      else if (arg === _) {
        console.log(arg, args)
        _args.push(arg);
        _holes.push(argsLen + i);
      }
      // 处理类似 fn(_, 2)(1) 这种情况
      else if (holesLen) {
        // fn(_, 2)(_, 3)
        if (index >= holesLen) {
          _args.push(arg);
        }
        // fn(_, 2)(1) 用参数 1 替换占位符
        else {
          _args.splice(_holes[index], 1, arg);
          _holes.splice(index, 1)
        }
        console.log('holesLen', holesLen, index, _args)
      }

      else {
        _args.push(arg);
      }
    }

    // 当占位符存在 or _args的长度小于 fn.length
    if (_holes.length || _args.length < length) {
      return curry.call(this, fn , _args, _holes)
    }

    return fn.apply(this, _args)
  }
}

var _ = {};
var fn = curry(function (a, b, c, d, e) {
  console.log([a, b, c, d, e])
})

fn(1, 2, 3, 4, 5);
fn(1, _, 3, 4, 5)(2);
fn(1, _, _, 4)(_, 3)(2)(5);
fn(1, _, 3)(_, 4)(2)(5);
fn(1)(_)
