/**
 * 模版依赖定义 (2006)
 * 这时候开始流行后端模版语法，通过后端语法聚合 js 文件，从而实现依赖加载
 * 说实话，现在 go 语言等模版语法也很流行这种方式
 * 写后端代码的时候不觉得，回头看看，还是挂在可维护性上。
 */

var greeting = (function () {
  var module = {};

  var helloInLang = {
      en: 'Hello world!',
      es: '¡Hola mundo!',
      ru: 'Привет мир!'
  };

  module.getHello = function (lang) {
      return helloInLang[lang];
  };

  module.writeHello = function (lang) {
      document.write(module.getHello(lang))
  };
  
  return module;
}());