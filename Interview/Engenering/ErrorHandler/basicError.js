/**
 * try-catch
 * 捕捉到运行时非异步错误
 */
try {
  error
} catch (err) {
  console.log(err)
}

/**
 * window.onerror
 * 捕捉到运行时错误
 */
window.onerror = function (msg, url, row, col, error) {
  console.log('我知道错误了')
  console.log({
    msg,
    url,
    row,
    col,
    error
  })
  return true
}
error
// or
setTimeout(() => {
  error
})

/**
 * 无法捕获到网络异常的错误
 * 需结合服务端排查分析是 404还是 500
 */
/* <script>
  window.onerror = function (msg, url, row, col, error) {
    console.log('我知道异步错误了');
    console.log({
      msg,  url,  row, col, error
    })
    return true;
  };
</script>
<img src="./404.png"> */

window.addEventListener("unhandledrejection", function (e) {
  e.preventDefault()
  console.log('我知道 promise 的错误了');
  console.log(e.reason);
  return true;
});