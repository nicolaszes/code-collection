/**
 * postMessage
 * H5提出来的一个炫酷的API
 * IE8+，chrome,ff都已经支持实现了这个功能
 * 窗口 A向跨域的窗口 B发送信息
 */
otherWindow.postMessage(message, targetOrigin)

/**
 * otherWindow 指的是目标窗口，也就是要给哪一个 window发送消息
 * window.frames属性的成员或者是 window.open方法创建的窗口
 * message是要发送的消息，类型为 String， Object( IE8, 9 不支持)
 * targetOrigin 是限定消息接受范围，不限制就用 ‘*’
 */
var onmessage = function (event) {
  var data = event.data
  var source = event.source
  var origin = event.origin
}

if (typeof window.addEventListener != 'undefined') {
  window.addEventListener('message', onmessage, false)
} else if (typeof window.attachEvent != 'undefined') {
  window.attachEvent('onmessage', onmessage)
}
