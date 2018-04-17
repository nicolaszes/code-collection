/**
 * 传统面向对象语言的装饰者模式
 */
class Plane {
  fire () {
    console.log('发射普通子弹')
  }
}

class MissleDecorator extends Plane {
  constructor (plane) {
    super()
    this.plane = plane
  }
  fire () {
    this.plane.fire()
    console.log('发射导弹')
  }
}

class AtomDecorator extends Plane {
  constructor (plane) {
    super()
    this.plane = plane
  }
  fire () {
    this.plane.fire()
    console.log('发射原子弹')
  }
}

const Boom = new AtomDecorator(new MissleDecorator(new Plane))

/**
 * 在 js中可以很方便的给某个对象扩展属性和方法
 * 但却很难在不改动某个函数源代码的情况下
 * 给该函数添加一些额外的功能
 * 在代码的运行期间，我们很难切入某个函数的执行环境
 */
window.load = function () {
  alert(1)
}

var _load = window.load || function () {}
window.onload = function () {
  _load()
  alert(2)
}
/**
 * 必须维护 _onload的这个中间变量，虽然看起来并不起眼
 * 还会遇到 this被劫持的问题
 */

/**
 * AOP装饰函数
 * 应用实例：
 * 数据统计上报
 * 动态改变函数的参数
 * 插件式的表单验证
 */
Function.prototype.before = function (fn, beforeFn) {
  return function () { // 返回包含了原函数和新函数的代理函数
    // 执行新的函数，保证 this不被劫持，新函数接受的参数
    beforeFn.apply(this, arguments)
    // 原封不动的传入原函数，新函数在原函数之前执行
    // 执行原函数并返回原函数的执行结果
    // 并且保证 this不被劫持
    return fn.apply(this, arguments)
  }
}

Function.prototype.after = function (fn, afterFn) {
  return function () { // 返回包含了原函数和新函数的代理函数
    var result = fn.apply(this, arguments)
    // 执行新的函数，保证 this不被劫持，新函数接受的参数
    afterFn.apply(this, arguments)
    // 执行原函数并返回原函数的执行结果
    return result
  }
}

var showLogin = function () {
  console.log( '打开登录浮层' )
}

var log = function () {
  console.log( '上报标签为' )
}

showLogin = showLogin.after(showLogin, log )   // 打开登录浮层之后上报数据

/**
 * ES6 decorator pattern
 */
class Component {
  operation () {}
}

class ConcreteComponent extends Component {
  constructor(s) {
    super(s)
    this.s = s
  }

  operation() {
    console.log("`operation` of ConcreteComponent", this.s, " is being called!")
  }
}

class Decorator extends Component {
  constructor(id, component) {
    super(id, component)
    this.id = id
    this.component = component
  }

  getId() {
    return this.id
  }

  operation() {
    console.log("`operation` of Decorator", this.id, " is being called!")
    this.component.operation()
  }
}

class ConcreteDecorator extends Decorator {
  constructor(id, component) {
    super(id, component)
  }

  operation() {
    super.operation()
    console.log("`operation` of ConcreteDecorator", this.Id, " is being called!")
  }
}

const decorator1 = new ConcreteDecorator(1, new ConcreteComponent("Comp1"))
decorator1.operation()