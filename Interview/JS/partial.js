/*
 * 局部应用是指固定一个函数的一些参数，然后产生另一个更小元的函数。
 * 功能上更像 curry的阉割版
 */
function partial (fn) {
    var args = [].slice.call(arguments, 1);
    return function () {
        var newArgs = args.concat([].slice.call(arguments))
        return fn.apply(this, newArgs)
    }
}

let partial = (fn, ...x) => (...args) => fn(...x, ...args)

function add(a, b) {
  return a + b + this.value;
}

// 使用 bind改变了 this的指向
// var addOne = add.bind(null, 1); // NaN or 4
var addOne = partial(add, 1); // 5

var value = 1;
var obj = {
    value: 2,
    addOne: addOne
}
console.log(obj.addOne(2)) // 5

/**
 * second edition
 */
var _ = {};

function partial (fn) {
  var args = [].slice.call(arguments, 1)
  console.log(arguments, args)
  return function () {
    var position = 0;
    for (var i = 0; i < args.length; i++) {
      console.log(position, arguments[position])
      args[i] = args[i] === _ ? arguments[position++] : args[i]
    }

    while (position < arguments.length) {
      args.push(arguments[position++])
    }
    return fn.apply(this, args)
  }
}

var subtract = (a, b, c) => (console.log(b - a - c));
var subFrom20 = partial(subtract, _, 20, _);
subFrom20(5, 6)
