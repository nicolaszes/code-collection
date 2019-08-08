// file helloInLang.js
var helloInLang = {
  en: 'Hello world!',
  es: '¡Hola mundo!',
  ru: 'Привет мир!'
};

// file sayHello.js

/*! lazy require scripts/app/helloInLang.js */

function sayHello(lang) {
  return helloInLang[lang];
}

// file hello.js

/*! lazy require scripts/app/sayHello.js */

document.write(sayHello('en'));