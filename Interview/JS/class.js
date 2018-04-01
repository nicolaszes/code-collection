// class PersonClass {
//   constructor(name) {
//     this.name = name
//   }
//
//   sayName () {
//     console.log(this.name)
//   }
// }
// let person = new PersonClass('nicolas')


// let PersonClass = (function() {
//   'use strict'
//   const PersonClass2 = function (name) {
//     // 确保通过关键字 new来调用该函数
//     if (typeof new.target === 'undefined') {
//       throw new Error('必须通过关键字 new调用构造函数')
//     }
//     this.name = name
//   }
//
//   Object.defineProperty(PersonClass2.prototype, 'sayName', {
//     value: function (name) {
//       // 确保不会通过关键字 new来调用
//       if (typeof new.target !== 'undefined') {
//         throw new Error('不可使用关键字 new调用构造函数')
//       }
//       console.log(this.name)
//     },
//     enumerable: false,
//     writable: true,
//     configrable: true,
//   })
//
//   return PersonClass2
// })()
// let person = new PersonClass('nicolas')
// person.sayName()


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
