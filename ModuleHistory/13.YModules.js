// file greeting.js
modules.define('greeting', function(provide) {
  provide({
      helloInLang: {
          en: 'Hello world!',
          es: '¡Hola mundo!',
          ru: 'Привет мир!'
      },

      sayHello: function (lang) {
          return this.helloInLang[lang];
      }
  });
});

// file app.js
modules.require(['greeting'], function(greeting) {
  document.write(greeting.sayHello('ru'));
});
// Result: "Привет мир!"
