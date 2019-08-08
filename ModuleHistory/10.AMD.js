// file lib/greeting.js
define(function() {
  var helloInLang = {
      en: 'Hello world!',
      es: '¡Hola mundo!',
      ru: 'Привет мир!'
  };

  return {
      sayHello: function (lang) {
          return helloInLang[lang];
      }
  };
});

// file hello.js
define(['./lib/greeting'], function(greeting) {
  var phrase = greeting.sayHello('en');
  document.write(phrase);
});