/**
 * 类的声明
 * ES5 及更早版本中都不存在类
 */
function Animal1 () {
  this.name = 'name'
}

/**
 * es6中的 class声明
 */
class Animal2 {
  constructor () {
    this.name = 'name';
  }
}

/**
 * 实例化
 */
new Animal1, new Animal2


/**
 * ++++++++++++ 类的继承，优缺点 ++++++++++++++
 */

/**
 * 1. 借助构造函数实现继承
 */
function Parent1 () {
  this.name = 'parent1'
}

function Child1 () {
  /**
   * 将父级构造函数的 this指向子构造函数的实例上去
   */
  Parent1.call(this) // apply，改变函数运行的上下文
  this.type = 'child1'
}

/**
 * 优点
 * 1. 避免了引用类型的属性被所有实例共享
 * 2. 可以在 Child中向 Parent传参
 * 缺点
 * 1.方法在构造函数中定义，每次创建实例都会创建一遍方法
 */


/**
 * 2. 借助原型链实现继承
 */
function Parent2 () {
  this.name = 'parent2'
}
function Child2 () {}

Child2.prototype = new Parent2

/**
 * 缺点
 * 1.引用类型的属性被所有实例共享
 */

/**
 * 3. 组合继承
 */
function Parent3 () {
  this.name = 'parent3'
}
function Child3 () {
  Parent3.call(this)
  this.type = 'child3'
}

Child3.prototype = new Parent3
/**
 * 优点
 * 1.融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
 * 缺点
 * 1.父级的构造函数执行了两次
 */

/**
 * 3-1. 组合继承优化
 */
function Parent4 () {
  this.name = 'parent4'
}
function Child4 () {
  Parent4.call(this)
  this.type = 'child4'
}

// 共用同一个 object
Child4.prototype = Parent4.prototype

/**
* 缺点
* 1.无法通过 instanceof 和 constructor判断父类的构造函数
*/

/**
 * 3-2. 组合继承优化
 */
function Parent5 () {
  this.name = 'parent5'
}
function Child5 () {
  Parent5.call(this)
  this.type = 'child5'
}

Child5.prototype = Object.create(Parent5.prototype)
Child5.prototype.constructor = Child5
/**
 * 缺点
 * 1.无法通过 instanceof判断父类的构造函数
 */
