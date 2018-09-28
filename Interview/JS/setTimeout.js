/**
 * JS的如何实现倒计时，为什么不准，校正方式
 * 
 * JS 是单线程的，所以 setTimeout 的误差其实是无法被完全解决的，原因有很多：
 * 可能是回调中的，有可能是浏览器中的各种事件导致。
 * 这也是为什么页面开久了，定时器会不准的原因，当然我们可以通过一定的办法去减少这个误差。
 */
const period = 60 * 1000 * 60 * 2
const startTime = new Date().getTime();
let count = 0
const end = new Date().getTime() + period
const interval = 1000
let currentInterval = interval

function loop() {
  count++
  const offset = new Date().getTime() - (startTime + count * interval); // 代码执行所消耗的时间
  const diff = end - new Date().getTime()
  const h = Math.floor(diff / (60 * 1000 * 60))
  const hdiff = diff % (60 * 1000 * 60)
  const m = Math.floor(hdiff / (60 * 1000))
  const mdiff = hdiff % (60 * 1000)
  const s = mdiff / (1000)
  const sCeil = Math.ceil(s)
  const sFloor = Math.floor(s)
  currentInterval = interval - offset // 得到下一次循环所消耗的时间
  console.log('时：'+h, '分：'+m, '毫秒：'+s, '秒向上取整：'+sCeil, '代码执行时间：'+offset, '下次循环间隔'+currentInterval) // 打印 时 分 秒 代码执行时间 下次循环间隔

  setTimeout(loop, currentInterval)
}

setTimeout(loop, currentInterval)
