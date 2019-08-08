// file app.tmp.js

/*borschik:include:../lib/main.js*/

/*borschik:include:../lib/helloInLang.js*/

/*borschik:include:../lib/writeHello.js*/

// file main.js
var app = {};

// file helloInLang.js
app.helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет мир!'
};

// file writeHello.js
app.writeHello = function (lang) {
    document.write(app.helloInLang[lang]);
};