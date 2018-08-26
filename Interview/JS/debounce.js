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
const debounce = (fn, delay) => {
  let timer = null;

  const debounceFunc = (...args) => {
    // 当持续触发事件时，若发现事件触发的定时器已设置时，则清除之前的定时器
    if (timer) {
      clearTimeout(timer);
    }

    // 重新设置事件触发的定时器
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  return debounceFunc;
};


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
_.debounce = function (func, wait, immediate) {
  var timeout, result;

  var later = function (context, args) {
    timeout = null;
    if (args) result = func.apply(context, args);
  };

  var debounced = restArguments(function (args) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      timeout = _.delay(later, wait, this, args);
    }

    return result;
  });

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
};