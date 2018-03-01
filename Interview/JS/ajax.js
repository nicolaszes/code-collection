/**
 * 模拟创建 ajax
 */
util.json = function (options) {
  var opt = {
    url: '',
    type: 'get',
    data: {},
    success: function () {},
    error: function () {},
  }

  util.extend(opt, options)

  if (opt.url) {
    var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
    var data = opt.data,
        url = opt.url,
        type = opt.type.toUpperCase(),
        dataArr = [];

    for (var k in data) {
      dataArr.push(k + '=' + data[k])
    }

    if (type === 'GET') {
      url = url + '?' + dataArr.join('&')
      xhr.open(type, url.replace(/\?$/g, ''), true)
      xhr.send()
    }

    if (type === 'POST') {
      xhr.open(type, url, true)
      xhr.sendRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      xhr.send(dataArr.join('&'))
    }

    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 206 || xhr.status === 304) {
        var res;
        if (opt.success && opt.success instanceof Function) {
          res = xhr.responseText

          if (typeof res === 'string') {
            res = JSON.parse(res)
            opt.success.call(xhr, res)
          }
        }
      } else {
        if (opt.error && opt.error instanceof Function) {
          opt.error.call(xhr, res)
        }
      }
    }
  }
}
