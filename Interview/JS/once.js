function test1() {
  console.log('this is function --- test1')
}

function test2() {
  console.log('this is function --- test2')
}
/**
 * basic once
 */
var hasRan = false
var result

function once (fn) {
  if (!isFunction(fn)) {
    return new Error('Function type error')
  }

  if (hasRan) {
    return result
  }

  hasRan = true
  var argumentsArr = []
  for (var i in arguments) {
    if (i === 0) continue
    argumentsArr.push(arguments[i])
  }

  return result = fn.apply(this, argumentsArr)
}

// test2并不会被执行
once(test1)
once(test1)
once(test2)
once(test2)
/**
 * once 方法的改进
 */
function once (fn) {
  if (!isFunction(fn)) {
    return new Error('Function type error')
  }

  var hasRan = false
  var result

  return function () {
    if (hasRan) { 
      return result
    }

    hasRan = true
    var argumentsArr = []
    for (var i in arguments) {
      if (i === 0) continue
      argumentsArr.push(arguments[i])
    }

    return result = fn.apply(this, argumentsArr)
  }
}

// 还是会生成变量 onceTest1, onceTest2
var onceTest1 = once(test1)
onceTest1()
onceTest1()

var onceTest2 = once(test2)
onceTest2()
onceTest2()


/**
 * once 第二次改进
 */
var once = function() {
  var hasRan = []
  return function (fn) {
    if (typeof fn !== 'function') {
      return new Error('Function type error')
    }
  
    // 遍历 hasRan 数组，如果数组中存在元素的 func 属性与 fn 相同，表示已经执行过这个 fn ，直接返回结果
    // 通过 toString() 方法，增加对匿名函数的支持
    for (var i in hasRan) {
      if (hasRan[i].func.toString() === fn.toString) {
        return hasRan[i].result
      }
    }

    // 这个 fn 未被执行过，则执行
    var argumentsArr = []
    for (var i in arguments) {
      if (i === 0) continue
      argumentsArr.push(arguments[i])
    }
    var result = fn.apply(this, argumentsArr)

    // 将这个 fn 和执行的结果 result 用一个对象存储起来，并 push 到 hasRan 数组中
    hasRan.push({
      func: fn,
      result: result
    })

    return result
  }
}()

once(test1)
once(test1)
once(test2)
once(test2)