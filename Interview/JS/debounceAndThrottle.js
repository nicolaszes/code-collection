x;
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
