/**
 * 因为 new为关键字，无法像 bind函数一样直接覆盖
 * 写一个函数，命名为 ObjectFactory
 */
function ObjectFactory() {
  var obj = {}
  var Constructor = [].shift.call(arguments)

  obj.__proto__ = Constructor.prototype
  Constructor.apply(obj, arguments)
  return obj
}
/**
 * 在这一版中，我们用 new Obj的方式创建了一个新的对象 obj
 * 取出第一个参数 => 要传入的构造函数，shift会修改原数组，所以，arguments会去除第一个参数
 * 将 obj的原型指向构造函数
 * 改变 this的指向到新建的对象
 */

/**
 * 返回值效果实现
 * 返回值需要是一个对象 {}
 */
function Otaku(name, age) {
  this.strength = 60
  this.age = age
  return {
    name: name,
    habit: 'Games'
  }
}
var person = new Otaku('kevin', 18)

console.log(person.name)
console.log(person.habit)
console.log(person.strength)
console.log(person.age)

/**
 * 如果只返回一个基本类型
 * 相当于没有返回值来处理
 */
function Otaku(name, age) {
  this.strength = 60
  this.age = age
  return 'handsome body'
}
var person = new Otaku('kevin', 18)

console.log(person.name)
console.log(person.habit)
console.log(person.strength)
console.log(person.age)

/**
 * 第二版
 */
function objectFactory() {
  var obj = {}
  var Constructor = [].shift.call(arguments)

  // 创建一个空对象，继承构造函数的 prototype 属性
  obj.__prpto__ = Constructor.prototype
  // 执行构造函数
  var ret = Constructor.apply(obj, arguments)
  // 如果返回结果是对象，就直接返回，否则返回 context 对象
  return typeof ret === 'object' ? ret : obj
}