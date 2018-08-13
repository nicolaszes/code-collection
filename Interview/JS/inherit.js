function inherit(proto) {
  //proto是一个对象，但不能是null
  if (proto == null) throw TypeError();
  if (Object.create) return Object.create(proto); //如果Object.create()存在,使用它
  // var t = typeof proto; //否则进一步检查
  if (typeof proto !== "object" && typeof proto !== "function")
    throw TypeError();
  var F = function() {}; // 定义一个空构造函数
  F.prototype = proto; // 将其原型属性设置为proto
  return new F(); // 使用F()创建proto的继承对象
}
