class A {}

class B extends A {
  constructor () {
    super()
  }
  
  // method () {
  //   return 'method'
  // }
}

/**
 * babel class super
 */
"use strict";
// var _createClass = function () { 
//   function defineProperties(target, props) { 
//     for (var i = 0; i < props.length; i++) { 
//       var descriptor = props[i]; 
//       descriptor.enumerable = descriptor.enumerable || false; 
//       descriptor.configurable = true; 
//       if ("value" in descriptor) descriptor.writable = true; 
//       Object.defineProperty(target, descriptor.key, descriptor); 
//     } 
//   } 
//   return function (Constructor, protoProps, staticProps) { 
//     if (protoProps) defineProperties(Constructor.prototype, protoProps); 
//     if (staticProps) defineProperties(Constructor, staticProps); 
//     return Constructor; 
//   }; 
// }();

function _possibleConstructorReturn(self, call) {
  // 没有用 super 初始化 this
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  }
  return call && (typeof call === "object" || typeof call === "function") 
    ? call 
    : self
}

/**
 * subClass 继承 superClass
 * @param {*} subClass 
 * @param {*} superClass 
 */
function _inherits(subClass, superClass) {
  // superClass 必须为 null 或者 function
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass)
  }
  /**
   * 设置 subClass.prototype.__proto__ === superClass.prototype 的原型
   */ 
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })
  /**
   * setPrototypeOf 原型链继承
   * subClass.__proto__ === superClass
   */ 
  if (superClass) Object.setPrototypeOf 
    ? Object.setPrototypeOf(subClass, superClass) 
    : subClass.__proto__ = superClass
}

/**
 * 判断 this 是否在原型链中
 * @param {*} instance 
 * @param {*} Constructor 
 */
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function")
  }
}

var A = function A() {
  _classCallCheck(this, A)
}

var B = function(_A) {
  _inherits(B, _A)

  function B() {
    _classCallCheck(this, B)
    console.log(B.__proto__ || Object.getPrototypeOf(B))
    console.log((B.__proto__ || Object.getPrototypeOf(B)).call(this))
    return _possibleConstructorReturn(this, (B.__proto__ || Object.getPrototypeOf(B)).call(this))
  }

  // _createClass(B, [{
  //   key: 'method',
  //   value: function method() {
  //     return 'method';
  //   }
  // }]);

  return B
}(A)

/**
 * ES6 使用 super 访问父类属性，在 Chrome、Babel、TypeScript 不一致?
 * https://www.zhihu.com/question/60239546
 * https://mp.weixin.qq.com/s/X3wwv9svWx6dbhxEEFzbAA
 */
class A {}

class B extends A {
  constructor() {
    super()
    this.x = 1
    super.x = 2
    console.log('this.x:', this.x)
    console.log('super.x:', super.x)
  }
}
A.prototype.x = 3
new B()

// output
//this.x: 2
//super.x: 3