/**
 * 直接定义依赖 (1999)
 * 由于当时 js 文件非常简单，模块化方式非常简单粗暴 —— 通过全局方法定义、引用模块。
 * 这种定义方式与现在的 commonjs 非常神似，区别是 commonjs 以文件作为模块
 * 而这种方法可以在任何文件中定义模块，模块不与文件关联。
 */

// file greeting.js
dojo.provide("app.greeting");

app.greeting.helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет мир!'
};

app.greeting.sayHello = function (lang) {
    return app.greeting.helloInLang[lang];
};

// file hello.js
dojo.provide("app.hello");

dojo.require('app.greeting');

app.hello = function(x) {
    document.write(app.greeting.sayHello('es'));
};