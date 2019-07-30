/**
 * 数据收集阶段(collect client data)
 * 
 * 
 * 解析、获取用户各种信息，如上：
 * 1.通过dom树，获取到的url，域名，上一跳信息；
 * 2.通过windows，获取到的显视屏的分辨率、长宽（前两类通过内置的js对象获取）；
 * 3.通过_maq全局数组，获取埋点时埋下的用户行为数据。
 * 
 * 将上步的用户信息按特定格式拼接，装到args这个参数中。
 * 
 * 伪装成图片，请求到后端controller中，并将args作为http request参数传入，做后端分析。
 * 
 * 
 * 之所以使用图片请求后端controller而不是ajax直接访问，
 * 原因在于ajax不能跨域请求，ma.js和后端分析的代码可能不在相同的域内，ajax做不到，
 * 而将image对象的src属性指向后端脚本并携带参数，就轻松实现了跨域请求。
 */
(function () {
  var params = {};
  //Document对象数据
  if (document) {
    params.domain = document.domain || ''; //获取域名
    params.url = document.URL || ''; //当前Url地址
    params.title = document.title || '';
    params.referrer = document.referrer || ''; //上一跳路径
  }
  //Window对象数据
  if (window && window.screen) {
    params.sh = window.screen.height || 0; //获取显示屏信息
    params.sw = window.screen.width || 0;
    params.cd = window.screen.colorDepth || 0;
  }
  //navigator对象数据
  if (navigator) {
    params.lang = navigator.language || ''; //获取所用语言种类
  }
  //解析_maq配置
  if (_maq) {
    for (var i in _maq) { //获取埋点阶段，传递过来的用户行为
      switch (_maq[i][0]) {
        case '_setAccount':
          params.account = _maq[i][1];
          break;
        default:
          break;
      }
    }
  }
  //拼接参数串
  var args = '';
  for (var i in params) {
    // alert(i);
    if (args != '') {
      args += '&';
    }
    args += i + '=' + params[i]; //将所有获取到的信息进行拼接
  }
  //通过伪装成Image对象，请求后端脚本
  var img = new Image(1, 1);
  var src = 'http://localhost:8091/data/dataCollection/log.gif?args=' + encodeURIComponent(args);
  alert("请求到的后端脚本为" + src);
  // 新图像元素只要设置了src属性就会开始下载
  // 所以我们这里的事件一定要在指定src属性之前绑定
  // 这也是为什么我们这里不需要把img标签插入DOM 的原因
  img.src = src;
})();