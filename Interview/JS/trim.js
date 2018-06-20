String.prototype.trim = function () {　　
  return this.replace(/(^\s*)|(\s*$)/g, "");　　
}

String.prototype.trim = function () {
  var start = 0,
    end = this.length - 1,
    ws = /\s/
  while (ws.indexOf(this.charAt(start)) > -1) {
    start++
  }
  while (end > start && ws.indexOf(this.charAt(end)) > -1) {
    end--
  }
  return this.slice(start, end + 1)　　
}

/**
 * 当字符串的末尾只有一小段空白时候，正则表达式会陷入疯狂工作状态；
 * 而通过循环遍历字符串的效率也比不上正则表达式，所以有了这种混合模式
 */
String.prototype.trim = function () {
  var str = this.replace(/^\s+/, '')
  end = str.length - 1
  ws = /\s/
  while (ws.test(str.charAt(end))) {
    end--
  }
  return str.slice(0, end + 1)　
}

// left trim
String.prototype.trim = function () {　　
  return this.replace(/(^\s*)/g, "");　　
}

// right trim
String.prototype.trim = function () {　　
  return this.replace(/(\s*$)/g, "");　　
}