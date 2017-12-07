// 借用一个不属于它的方法，鸭子类型的思想
Function.prototype.uncurrying = function () {
  var self = this;
  return function () {
    console.log(arguments)
    var obj = Array.prototype.shift.call(arguments);
    console.log(obj, arguments)
    return self.apply(obj, arguments)
  }
}
var push = Array.prototype.push.uncurrying();

!function () {
  push(arguments, 4);
  // console.log(arguments)
}(1, 2, 3)
// console.log(obj)


Function.prototype.uncurrying = function () {
  var self = this;
  return function () {
    return Function.prototype.call.apply( self, arguments );
  }
};

var obj = {
  0: 1,
  length: 1,
}
var shiftUp = Array.prototype.push.uncurrying();

shiftUp(obj, 2)
console.log(obj)
