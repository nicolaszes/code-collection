/**
 * ios 下失效的解决方式
 */
// <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
window.onload = function () {
  document.addEventListener('touchstart', function (event) {
    if(event.touches.length > 1){
      event.preventDefault();
    }
  })
  var lastTouchEnd = 0;
  document.addEventListener('touchend', function (event) {
      var now = (new Date()).getTime();
      if(now - lastTouchEnd <= 300){
          event.preventDefault();
      }
      lastTouchEnd = now;
  }, false)
}
