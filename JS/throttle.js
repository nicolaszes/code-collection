/**
 * 窗口的 resize，scroll，输入框内容校验等操作时
 * 如果这些操作处理函数较为复杂或页面频繁重渲染等操作时
 * 如果事件触发的频率无限制，会加重浏览器的负担，导致用户体验非常糟糕
 */

/**
 * 节流，当触发事件时，保证隔一段时间触发一次事件
 * 合并一段时间内的事件，并在该时间结束时真正的去触发一次事件
 */
const throttle = (fn, delay, options) => {
  // 记录上次触发事件
  let previous = 0;
  let timer;
  let result;
  if (!options) options = {};

  var later = (...args) => {
    previous = options.leading === false ? 0 : +new Date;
    timer = null;
    result = fn(...args);
  };

  // 本次事件触发与上一次的时间比较
  // 如果间隔时间超过设定时间，即再次设置事件触发的定时器
  // 其实时间戳版和定时器版的节流函数的区别就是，
  // 时间戳版的函数触发是在时间段内开始的时候，
  // 而定时器版的函数触发是在时间段内结束的时候。
  const throttleFunc = (...args) => {
    let now = +new Date;

    if (!previous && options.leading === false) previous = now;

    let remaining = delay - (now - previous);
    if (remaining <= 0 || remaining > delay) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      result = fn(...args);
    } else if (!timer && options.trailing !== false) {
      timer = setTimeout(() => later(...args), remaining);
    }

    console.log('result', result)
    return result
  };

  throttleFunc.run = () => console.log("run");

  throttleFunc.cancel = () => {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  }

  return throttleFunc;
};

let num = 0
window.addEventListener('resize', throttle(() => {
  console.log('resize')
  return num++
}, 1000, {
  leading: true,
  trailing: true
}))

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
_.throttle = function (func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function () {
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function () {
    var now = _.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
};