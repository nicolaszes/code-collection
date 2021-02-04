let lastCallback
let memoizedState = [];
let currentCursor = 0;

function useCallback(fn, watch) {
  let hasWatchChange = memoizedState[currentCursor] ?
    !watch.every((item, index) => item === memoizedState[currentCursor][index]) :
    true
  if (hasWatchChange) {
    lastCallback = fn
    memoizedState[currentCursor] = watch
  }
  return lastCallback
}