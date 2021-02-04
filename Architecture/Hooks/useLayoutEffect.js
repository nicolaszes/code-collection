let memoizedState  = [];
let currentCursor = 0;

/**
 * useEffect的调用时机是浏览器渲染结束后执行的
 * useLayoutEffect 是在DOM构建完成，浏览器渲染前执行的
 * @param {*} fn 
 * @param {*} dependencies 
 */
function useLayoutEffect(fn, watch) {
  let hasWatchChange = memoizedState[currentCursor]
    ? !watch.every((item, i) => item === memoizedState[currentCursor][i])
    : true
  if (hasWatchChange){
    Promise.resolve().then(fn())
    memoizedState[currentCursor++] = watch
  }
}