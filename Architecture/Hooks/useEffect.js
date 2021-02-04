let memoizedState  = [];
let currentCursor = 0;

/**
 * 第一个参数的执行时机
 * useEffect的调用时机是浏览器渲染结束后执行的
 * @param {*} fn 
 * @param {*} watch
 */
function useEffect(fn, watch) {
  const hasWatchChange = memoizedState[currentCursor]
    ? !watch.every((val, i) => val === memoizedState[currentCursor][i])
    : true;
  if (hasWatchChange) {
    setTimeout(fn())
    memoizedState[currentCursor++] = watch;
  }
}