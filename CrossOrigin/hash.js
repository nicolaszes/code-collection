/**
 * 利用 hash，场景是 A页面通过 iframe或者 frame嵌入跨域的 B页面
 */
var B = document.getElementsByTagName('iframe');
B.src = B.src + '#' + 'data'
// B中的代码如下
window.onhashchange = function () {
  var data = window.location.hash
}
