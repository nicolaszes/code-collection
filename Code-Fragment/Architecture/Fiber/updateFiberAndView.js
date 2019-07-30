/**
 * 来源：https://zhuanlan.zhihu.com/p/37095662
 * 
 * react fiber 运作过程
 */
var queue = []
ReactDOM.render = function (root, container) {
  queue.push(root)
  updateFiberAndView()
}
function getVdomFromQueue () {
  return queue.shift()
}
function Fiber (vnode) {
  for (var i in vnode) {
    this[i] = vnode[i]
  }
  this.uuid = Math.random()
}
// 我们简单的 Fiber目前来看，只比 vdom多了一个 uuid属性
function toFiber(vnode) {
  if (!vnode.uuid) {
    return new Fiber(vnode)
  }
  return vnode
}