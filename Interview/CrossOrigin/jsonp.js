<script src="http://www.abc.com/?data=name&callback=jsonp"></script>
<script>
  jsonp({
    data: res
  })
</script>
/**
 * jsonp: 利用 script标签的异步加载
 */
util.jsonp = function (url, onsuccess, onerror, chartset) {
  var callbackName = util.getName('tt_player')
  window[callbackName] = function () {
    if (onsuccess && util.isFunction(onsuccess)) {
      onsuccess(arguments[0])
    }
  }

  var script = util.createScript(url + '&callback' + callbackName, chartset)

  script.onload = script.onreadystatechange = function () {
    if (!script.readyState || /loaded|complete/.test(script.readyState)) {
      script.onload = script.onreadystatechange = null

      // 移除 script对象
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }

      // 删除函数或变量
      window[callbackName] = null
    }
  }
}

script.onerror = function () {
  if (onerror && util.isFunction(onerror)) {
    onerror()
  }
}
