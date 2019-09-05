/**
 * 所谓的变量提升，是指在 JavaScript 代码执行过程中
 */

/**
 * 变量的声明和赋值
 */
var myname = '极客时间'

// 可以看成
var myname    // 声明部分
myname = '极客时间'  // 赋值部分


/**
 * 函数的声明和赋值
 */
function foo(){
  console.log('foo')
}

var bar = function(){
  console.log('bar')
}

/**
 * 变量提升
 * 
 * 所谓的变量提升，是指在 JavaScript 代码执行过程中
 * Javascript 引擎把变量的声明部分和函数的声明部分提升到代码开头的“行为”
 * 变量被提升后，会给变量设置默认值，这个默认值就是我们熟悉的 undefined
 */


/**
 * 编译阶段
 */
// 第一部分：变量提升部分的代码
var myname = undefined
function showName() {
  console.log('函数 showName 被执行');
}

// 执行部分的代码
showName()
console.log(myname)
myname = '极客时间'

// 经过编译后，会生成两部分内容：执行上下文（Execution context）和可执行代码

VariableEnvironment:
  myname -> undefined, 
  showName -> function : {console.log(myname)

showName()
console.log(myname)
var myname = '极客时间'
function showName() {
  console.log('函数 showName 被执行');
}

/**
 * 执行阶段
 */
VariableEnvironment:
  myname -> " 极客时间 ", 
  showName -> function : {console.log(myname)

/**
 * 代码中出现相同的变量或者函数怎么办？
 */
function showName() {
  console.log('极客邦');
}
showName();
function showName() {
  console.log('极客时间');
}
showName(); 
