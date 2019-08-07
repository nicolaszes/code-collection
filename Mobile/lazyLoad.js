/**
 * 核心原理
 * 设定一个定时器，计算每张图片是否会随着滚动条，而出现在视口（也就是浏览器中的展现网站的空白部分）中
 * 为 <img/>标签设置一个暂存图片url的自定义的属性（如 loadpic），当图片出现在视口时，再将 loadpic的值赋给图片的 src属性
 * 
 * 提升效率使用 once, throttle
 */

var imgs = document.getElementsByTagName('img')

function lazyLoad() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  var viewportSize = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

  for (var i = 0; i < imgs.length; i++) {
    var x = scrollTop + viewportSize - imgs[i].offsetTop
    if (x > 0) {
      imgs[i].src = imgs[i].getAttribute('loadpic')
    }
  }
}

setInterval(lazyLoad, 1000)