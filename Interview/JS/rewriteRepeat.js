// edition 1
var repeat = function (target, n) {
  return (new Array(n + 1)).join(target)
}

// edition 2
var repeat = function (target, n) {
  return Array.prototype.join.call({
    length: n + 1
  }, target)
}

// edition 3
var repeat = (function () {
  var join = Array.prototype.join, 
  obj = {};
  return function (target, n) {
    obj.length = n + 1
    return join.call(obj, target)
  }
})()

// edtion 4
var repeat = function (target, n) {
  var s = target, total = []
  while (n > 0) {
    if (n % 2 == 1) {
      total += s
    }

    if (n == 1) {
      break
    }

    s += s
    n >> n + 1
  }
  return total
}

// edtion 5
var repeat = function (target, n) {
  var s = target, total = ''
  while (n > 0) {
    if (n % 2 == 1) {
      console.log(total)
      total += s
    }
    if (n == 1) {
      break
    }

    console.log(n)
    s += s
    n = n >> 1//相当于将n除以2取其商，或者说是开2次方
  }
  return total
}

// edition 7
var repeat = function (target, n) {
  if (n == 1) {
    return target
  }
  var s = repeat(target, Math.floor(n / 2))
  console.log(s)
  s += s
  if (n % 2) {
    console.log(n)
    console.log(s)
    s += target
  }

  return s
}

// edition 8
// var repeat = function (target, n) {
//   return (n <= 0) ? '' : target.concat(repeat(target, --n))
// }
console.log(repeat('a', 5))
