/**
 * es6 class 存在暂时性死区
 */
class PersonClass {
  constructor(name) {
    this.name = name
  }

  sayName () {
    console.log(this.name)
  }
}
let person = new PersonClass('nicolas')


let PersonClass = (function() {
  'use strict'
  const PersonClass2 = function (name) {
    // 确保通过关键字 new来调用该函数
    if (typeof new.target === 'undefined') {
      throw new Error('必须通过关键字 new调用构造函数')
    }
    this.name = name
  }

  Object.defineProperty(PersonClass2.prototype, 'sayName', {
    value: function (name) {
      // 确保不会通过关键字 new来调用
      if (typeof new.target !== 'undefined') {
        throw new Error('不可使用关键字 new调用构造函数')
      }
      return this.name
    },
    enumerable: false,
    writable: true,
    configrable: true,
  })

  return PersonClass2
})()
let person = new PersonClass('nicolas')
person.sayName()


/**
 * 作为一等公民的类
 * 传入函数，可以从函数返回，并且可以赋值给变量的值
 */
function createObject(classDef) {
  return new classDef()
}
let obj = createObject(class {
  sayHi () {
    console.log('Hi')
  }
})
obj.sayHi()

let person = new class {
  constructor (name, sex) {
    this.name = name
    this.sex = sex
  }

  sayName () {
    console.log(this.name)
  }

  static saySex () {
    console.log(this.sex)
  }
}('nicolas', 'male')
person.saySex()

/**
 * 继承与派生类
 */
function Rectangle(length, width) {
  this.length = length
  this.width = width
}

Rectangle.prototype.getArea = function () {
  return this.length * this.width
}

function Square (length) {
  Rectangle.call(this, length, length)
}

Square.prototype = Object.create(Rectangle.prototype, {
  constructor: {
    value: Square,
    enumerable: true,
    writable: true,
    configurable: true,
  }
})

var square = new Square(3)


/**
 * super() 使用关键点:
 * 1.只可在派生类的构造函数中使用 super()，如果尝试在非派生类（不是用 extends声明的类，或函数中使用会导致程序抛出错误）
 * 2.在构造函数中访问 this之前一定要调用 super()，它负责初始化 this，如果在调用 super()之前尝试访问 this，会报错
 * 3.如果不想调用 super()，则唯一的方法是让类返回一个对象
 */
class Rectangle {
  constructor (length, width) {
    this.length = length
    this.width = width
  }

  getArea () {
    return this.length * this.width
  }

  static create(length, width) {
    return new Rectangle(length, width)
  }
}

// 派生类
class Square extends Rectangle {
  constructor (length) {
    // 等价于 Rectangle.call(this, length, length)
    super(length, length)
  }

  // 类方法遮蔽
  getArea () {
    // return this.length * this.length
    // 遮蔽后调用 Rectangle.prototype.getArea()
    return super.getArea()
  }
}

const square = new Square(4)
const rect = Square.create(3, 4)

/**
 * 创建 mixin
 */
let SerializableMixin = {
  serilize() {
    return JSON.stringify(this)
  }
}

let AreaMixin = {
  getArea () {
    return this.length * this.width
  }
}

function mixin(...mixins) {
  var base = function () {}
  Object.assign(base.prototype, ...mixins)
  return base
}

class Square extends mixin(AreaMixin, SerializableMixin) {
  constructor (length) {
    super()
    this.length = length
    this.width = width
  }
}

var x = new Square(3)