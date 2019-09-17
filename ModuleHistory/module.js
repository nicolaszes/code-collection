/**
 * 1.最早，我们这么写代码
 * Global 被污染，很容易命名冲突
 */
function foo() {
  //...
}

function bar() {
  //...
}

/**
 * 2.简单封装：Namespace 模式
 * 
 * 减少 Global 上的变量数目
 * 本质是对象，一点都不安全
 */
var MYAPP = {
  foo: function () {},
  bar: function () {}
}

MYAPP.foo();

/**
 * 3.匿名闭包 ：IIFE 模式
 * 
 * 函数是 JavaScript 唯一的 Local Scope
 * 增强一点：引入依赖
 */
var Module = (function ($) {
  var _$body = $("body"); // we can use jQuery now!
  var foo = function () {
    console.log(_$body); // 特权方法
  }

  // Revelation Pattern
  return {
    foo: foo
  }
})(jQuery)

Module.foo();
Module._private; // undefined

/**
 * 4.DOM 顺序即执行顺序
 * 
 * 但现实是这样的 …
 * 难以维护 Very difficult to maintain!
 * 依赖模糊 Unclear Dependencies
 * 请求过多 Too much HTTP calls
 */
body
script(src = "zepto.js")
script(src = "jhash.js")
script(src = "fastClick.js")
script(src = "iScroll.js")
script(src = "underscore.js")
script(src = "handlebar.js")
script(src = "datacenter.js")
script(src = "deferred.js")
script(src = "util/wxbridge.js")
script(src = "util/login.js")
script(src = "util/base.js")
script(src = "util/city.js")
script(src = "util/date.js")
script(src = "util/cookie.js")
script(src = "app.js")

/**
 * 5.LABjs - Script Loader
 * 
 * 基于文件的依赖管理
 */
$LAB
  .script(["script1.js", "script2.js", "script3.js"])
  .wait(function () { // wait for all scripts to execute first
    script1Func();
    script2Func();
    script3Func();
  });

/**
 * 6.YUI3 Loader - Module Loader
 */
// YUI - 编写模块
YUI.add('dom', function (Y) {
  Y.DOM = {
    // ...
  }
})

// YUI - 使用模块
YUI().use('dom', function (Y) {
  Y.DOM.doSomeThing();
  // use some methods DOM attach to Y
})

// Sandbox Implementation
// Y 其实是一个强沙箱
// 所有依赖模块通过 attach 的方式被注入沙盒
function Sandbox() {
  // ...
  // initialize the required modules
  for (i = 0; i < modules.length; i += 1) {
    Sandbox.modules[modules[i]](this);
  }
  // ...
}

/**
 * 7.CommonJS - API Standard
 */
// math.js
exports.add = function (a, b) {
  return a + b;
}
// main.js
var math = require('math') // ./math in node
console.log(math.add(1, 2)); // 3

// server.js
var http = require("http"),
  PORT = 8000;

http.createServer(function (req, res) {
  res.end("Hello World");
}).listen(PORT);

console.log("listenning to " + PORT);

// 同步/阻塞式加载
// timeout.js
var EXE_TIME = 2;

(function (second) {
  var start = +new Date();
  while (start + second * 1000 > new Date()) {}
})(EXE_TIME)

console.log("2000ms executed")

// main.js
require('./timeout'); // sync load
console.log('done!');

// 同步加载对服务器/本地环境并不是问题

// 硬盘 I/O		网速 I/O
// HDD:	100 MB/s	ADSL:	4 Mb/s
// SSD:	600 MB/s	4G:	100 Mb/s
// SATA-III:	6000 Mb/s	Fiber:	100 Mb/s
