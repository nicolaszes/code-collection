//CommonJS Syntax
var Employee = require("types/Employee");

function Programmer() {
  //do something
}

Programmer.prototype = new Employee();

//如果 require call 是异步的，那么肯定 error
//因为在执行这句前 Employee 模块根本来不及加载进来

//AMD Wrapper
define(
  ["types/Employee"], //依赖
  function (Employee) { //这个回调会在所有依赖都被加载后才执行
    function Programmer() {
      //do something
    };

    Programmer.prototype = new Employee();
    return Programmer; //return Constructor
  }
)

// Module/1.0
var a = require("./a"); // 依赖就近, 执行到此时, a.js 同步下载并执行
a.doSomething();

var b = require("./b")
b.doSomething();

// AMD recommended style
define(["a", "b"], function (a, b) {
  // 依赖前置, 在这里, a.js 已经下载并且执行好了
  a.doSomething();
  b.doSomething();
})

// Sea.js
define(function (require, exports) {
  var a = require('./a');
  a.doSomething();

  exports.foo = 'bar';
  exports.doSomething = function () {};
});

// RequireJS 兼容风格
define('hello', ['jquery'], function (require, exports, module) {
  return {
    foo: 'bar',
    doSomething: function () {}
  };
});

/**
 * Execution Time
 */
// AMD recommended
define(['a', 'b'], function (a, b) {
  a.doSomething(); // 依赖前置，提前执行
  b.doSomething();
})

// CMD recommanded
define(function (require, exports, module) {
  var a = require("a");
  a.doSomething();
  var b = require("b");
  b.doSomething(); // 依赖就近，延迟执行
})