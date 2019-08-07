/**
 * 闭包模块化模式 (2003)
 * 用闭包方式解决了变量污染问题，闭包内返回模块对象，只需对外暴露一个全局变量。
 */

// file app.js
var app = {};

// file greeting.js
app.helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет мир!'
};

// file hello.js
app.writeHello = function (lang) {
    document.write(app.helloInLang[lang]);
};