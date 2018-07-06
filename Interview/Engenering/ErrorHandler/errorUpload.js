/**
 * 动态创建 img标签进行上报
 */
function report(error) {
  var reportUrl = 'http://xxxx/report';
  new Image().src = reportUrl + 'error=' + error;
}

/**
 * Ajax 发送数据
 */
// script error
// http://localhost:8080/index.html
/**
  <script>
    window.onerror = function (msg, url, row, col, error) {
      console.log('我知道错误了，也知道错误信息')
      console.log({
        msg,  url,  row, col, error
      })
      return true;
    };
  </script>
  <script src="http://localhost:8081/test.js" crossorigin></script>

  // http://localhost:8081/test.js
  setTimeout(() => {
    console.log(error);
  });
*/

const Koa = require('koa');
const path = require('path');
const cors = require('koa-cors');
const app = new Koa();

app.use(cors());
app.use(require('koa-static')(path.resolve(__dirname, './public')));

app.listen(8081, () => {
  console.log('koa app listening at 8081')
});

/**
 * 我们都知道 JSONP 是用来跨域获取数据的，并且兼容性良好，在一些应用中仍然会使用到
 */
// http://localhost:8080/index.html
window.onerror = function (msg, url, row, col, error) {
  console.log('我知道错误了，但不知道错误信息');
  console.log({
    msg,  url,  row, col, error
  })
  return true;
};
function jsonpCallback(data) {
  console.log(data);
}
const url = 'http://localhost:8081/data?callback=jsonpCallback';
const script = document.createElement('script');
script.src = url;

// 跨域
script.crossOrigin = 'anonymous';

document.body.appendChild(script);

/**
 * 实际工程中，你可能是面向很多库来编程，
 * 比如使用 jQuery，Seajs 或者 webpack 来异步加载脚本，
 * 许多库封装了异步加载脚本的能力，以 jQeury 为例你可能是这样来触发异步脚本
 * 
 * 修改源代码 ？？？
 */
$.ajax({
  url: 'http://localhost:8081/data',
  dataType: 'jsonp',
  success: (data) => {
    console.log(data);
  }
})

/**
 * 劫持 document.createElement，从根源上去为每个动态生成的脚本添加 crossOrigin 字段
 * 重写 createElement 理论上没什么问题，但是入侵了原本的代码，不保证一定不会出错，
 * 在工程上还是需要多尝试下看看再使用，可能存在兼容性上问题
 */
document.createElement = (function() {
  const fn = document.createElement.bind(document);
  return function(type) {
    const result = fn(type);
    if(type === 'script') {
      result.crossOrigin = 'anonymous';
    }
    return result;
  }
})();
window.onerror = function (msg, url, row, col, error) {
  console.log('我知道错误了，也知道错误信息');
  console.log({
    msg,  url,  row, col, error
  })
  return true;
};
$.ajax({
  url: 'http://localhost:8081/data',
  dataType: 'jsonp',
  success: (data) => {
    console.log(data);
  }
})