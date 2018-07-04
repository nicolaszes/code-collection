/**
 * Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。
 * 该方法使用源对象的[[Get]]和目标对象的[[Set]]，所以它会调用相关 getter 和 setter。
 * 因此，它分配属性，而不仅仅是复制或定义新的属性。
 * 如果合并源包含getter，这可能使其不适合将新属性合并到原型中。
 * 为了将属性定义（包括其可枚举性）复制到原型，
 * 应使用Object.getOwnPropertyDescriptor()和Object.defineProperty() 。
 * 
 * String 和 Symbol 类型的属性都会被复制。
 * 
 * 当发生错误时，例如有一个属性是不可写的，将会抛出一个 TypeError 错误，目标对象保持不变。
 * 注意 Object.assign() 源对象为 null 或 undefined 时不会报错。
 */
function zyEs6AssignPolyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, "assign", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function (target) {
        "use strict"
        if (target === undefined || target === null) {
          throw new TypeError("Cannot convert first argument to object")
        }

        var to = Object(target)
        for (var i = 1; i < arguments.length; i++) {
          var nextSource = arguments[i]
          if (nextSource === undefined || nextSource === null) {
            continue
          }

          var keysArray = Object.keys(Object(nextSource))
          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
            var nextKey = keysArray[nextIndex]
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey)
            if (desc !== undefined && desc.enumerable) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
        return to
      }
    })
  }
}

let _extends = Object.assign || function (target) {
  for (let i = 1; i < arguments.length; i++) {
    let source = arguments[i]
      for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
  return target
}

function deepExtend() {
  var obj1 = arguments[0]
  var obj2 = arguments[1]
  //存放结果对象
  var resObj = {}
  if (typeof (obj1) != 'object' || typeof (obj2) != 'object') {
    throw Error('must be an object')
  }
  //遍历obj1的所有属性
  for (var i in obj1) {
    //如果对象2里面有对象1的这个属性则继承过来,否则resObj放obj1[i]
    if (obj2.hasOwnProperty(i)) {
      if (typeof (obj1[i]) == 'object') {
        //如果obj1[i]是一个对象，那么递归调用这个方法，并把resObj[i]的属性设置为结果
        resObj[i] = deepExtend(obj1[i], obj2[i])
      } else {
        resObj[i] = obj2[i]
      }
    } else {
      resObj[i] = obj1[i]
    }
  }

  for (var j in obj2) {
    //上一步已经把obj1和obj2共有的属性全替换为obj2的属性，所以这里只需把obj1里不具有的obj2的属性复制即可
    if (!obj1.hasOwnProperty(j)) {
      resObj[j] = obj2[j]
    }
  }
  return resObj
}