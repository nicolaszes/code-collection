/**
 * 窗口的 resize，scroll，输入框内容校验等操作时
 * 如果这些操作处理函数较为复杂或页面频繁重渲染等操作时
 * 如果事件触发的频率无限制，会加重浏览器的负担，导致用户体验非常糟糕
 */

/**
 * debounce 防抖，就是防止抖动
 * 当持续触发事件时，debounce会合并事件且不会去触发事件
 * 当一定时间内没有触发在执行这个事件
 */
// https://segmentfault.com/a/1190000005926579
function debounce(fn, delay) {
  var ctx;
  var args;
  var timer = null;

  var later = function () {
    fn.apply(ctx, args)
    // 当事件真正执行后，清空定时器
    timer = null;
  };

  return function () {
    ctx = this;
    args = arguments;
    // 当持续触发事件时，若发现事件触发的定时器已设置时，则清除之前的定时器
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 重新设置事件触发的定时器
    timer = setTimeout(later, delay)
  }
}

/**
 * 节流，当触发事件时，保证隔一段时间触发一次事件
 * 合并一段时间内的事件，并在该时间结束时真正的去触发一次事件
 */
function throttle (fn, delay) {
  var ctx;
  var args;
  // 记录上次触发事件
  var previous = Date.now()
  var later = function () {
    fn.apply(ctx, args);
  };

  return function () {
    ctx = this;
    args = arguments;
    var now = Date.now();
    // 本次事件触发与上一次的时间比较
    var diff = now - previous - delay;

    // 如果间隔时间超过设定时间，即再次设置事件触发的定时器
    if (diff >= 0) {
      // 更新最近事件触发的时间
      previous = now;
      setTimeout(later, delay);
    }
  }
}
