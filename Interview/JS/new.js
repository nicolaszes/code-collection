/**
 * 因为 new为关键字，无法像 bind函数一样直接覆盖
 * 写一个函数，命名为 ObjectFactory
 */
function ObjectFactory () {
  var obj = new Object();
  var Constructor = [].shift.call(arguments);

  obj.__proto__ = Contructor.prototype;
  Constructor.apply(obj, arguments)
  return obj;
}
/**
 * 在这一版中，我们用 new Obj的方式创建了一个新的对象 obj
 * 取出第一个参数 => 要传入的构造函数，shift会修改原数组，所以，arguments会去除第一个参数
 * 将 obj的原型指向构造函数
 * 改变 this的指向到新建的对象
 */