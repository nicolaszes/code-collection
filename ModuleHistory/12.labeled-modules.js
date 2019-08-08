// file greeting.js
var helloInLang = {
  en: 'Hello world!',
  es: '¡Hola mundo!',
  ru: 'Привет мир!'
};

exports: var greeting = {
  sayHello: function (lang) {
      return helloInLang[lang];
  }
};

// file hello.js
require: './lib/greeting';
var phrase = greeting.sayHello('es');
document.write(phrase);