/**
 * 窗口的 resize，scroll，输入框内容校验等操作时
 * 如果这些操作处理函数较为复杂或页面频繁重渲染等操作时
 * 如果事件触发的频率无限制，会加重浏览器的负担，导致用户体验非常糟糕
 */

/**
 * 节流，当触发事件时，保证隔一段时间触发一次事件
 * 合并一段时间内的事件，并在该时间结束时真正的去触发一次事件
 */
const throttle = (fn, delay) => {
  // 记录上次触发事件
  let previous = Date.now();
  const throttleFunc = (...args) => {
    let now = Date.now();
    // 本次事件触发与上一次的时间比较
    let diff = now - previous - delay;

    // 如果间隔时间超过设定时间，即再次设置事件触发的定时器
    if (diff >= 0) {
      // 更新最近事件触发的时间
      previous = now;
      setTimeout(() => fn(...args), delay);
    }
  };

  throttleFunc.run = () => console.log("run");

  return throttleFunc;
};

window.resize = throttle(() => {
  console.log(123);
}, 1000);

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