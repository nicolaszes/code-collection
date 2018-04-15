/**
 * 代理和反射是什么？
 * 你可以通过 new Proxy()，用于替代另一个对象（target）
 * 这个代理对目标对象进行了虚拟，因此该代理和该目标对象在表面上可以被当作同一对象来看待
 * 
 * 代理允许你拦截目标对象上的底层操作
 * 拦截行为使用了一个能够响应特定操作的函数（被称为陷阱）
 * 反射接口由 Reflect对象所代表
 */

/**
 * 创建一个简单的代理
 * 代理对象自身没有存储该属性，它只是简单的将值转发给 target对象
 * proxy.name === target.name
 */
let target = {}
let proxy = new Proxy(target, {})

proxy.name = 'proxy'
console.log(proxy.name)
console.log(target.name)

target.name = 'target'
console.log(proxy.name)
console.log(target.name)

/**
 *
 */
let target = { 
  name: 'target', 
  value: 42,
}
let proxy = new Proxy(target, {
  /**
   * 使用 set陷阱函数验证属性值
   * 创建一个对象，要求其属性值只能是数值，意味着该对象的每一个新增属性都要被验证
   * 并且在属性值不为数值的时候应该报错
   * @param {*} trapTarget 
   * @param {*} key 
   * @param {*} value 
   * @param {*} receiver 
   */
  set(trapTarget, key, value, receiver) {
    // 忽略已有属性，避免影响他们
    if (!trapTarget.hasOwnProperty(key)) {
      if (isNaN(value)) {
        throw new TypeError('Property must be a number.')
      }
    }

    // 添加属性
    return Reflect.set(trapTarget, key, value, receiver)
  },
  /**
   * 使用 get陷阱函数进行对象外形验证
   * @param {*} trapTarget 
   * @param {*} key 
   * @param {*} receiver 
   */
  get(trapTarget, key, receiver) {
    if (!(key in receiver)) {
      throw new TypeError("Property " + key + " doesn't exist.")
    }

    return Reflect.get(trapTarget, key, receiver)
  },
  /**
   * 使用 has陷阱函数隐藏属性
   * @param {*} trapTarget 
   * @param {*} key 
   */
  has(trapTarget, key) {
    // 隐藏 key === 'value'的属性
    if (key === 'value') {
      return false
    }
    return Reflect.has(trapTarget, key)
  },
  /**
   * 使用 deleteProperty陷阱函数避免属性被删除
   * Object.defineProperty(target, "name", { configurable: false })
   * console.log("value" in target);     // true
   * @param {*} trapTarget 
   * @param {*} key 
   */
  deleteProperty(trapTarget, key) {
    if (key === 'value') {
      return false
    }
    return Reflect.deleteProperty(trapTarget, key)
  },
  /**
   * 代理陷阱内却必须使用 Reflect 对象上的方法
   * 
   * Object.getPrototypeOf() 与 Object.setPrototypeOf() 属于高级操作
   * Object.getPrototypeOf() 会在操作之前先将参数值转换为一个对象
   * 
   * Reflect.getPrototypeOf() 与 Reflect.setPrototypeOf() 属于底层操作
   * Reflect.getPrototypeOf() 方法在接收到的参数不是一个对象时会抛出错误
   * @param {*} trapTarget 
   */
  getPrototypeOf(trapTarget) {
    // return null
    return Reflect.getPrototypeOf(trapTarget)
  },
  setPrototypeOf(trapTarget) {
    // return false
    return Reflect.setPrototypeOf(trapTarget, proto)
  },
  
  /**
   * 对象可扩展的陷阱函数
   * @param {*} trapTarget 
   */
  isExtensible (trapTarget) {
    return Reflect.isExtensible(trapTarget)
  },
  preventExtensions (trapTarget) {
    // return false
    return Reflect.preventExtensions(trapTarget)
  }
})

// 添加一个新属性
proxy.count = 1
console.log(proxy.count)