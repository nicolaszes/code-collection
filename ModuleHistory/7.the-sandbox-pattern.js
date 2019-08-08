// file sandbox.js
function Sandbox(callback) {
  var modules = [];

  for (var i in Sandbox.modules) {
      modules.push(i);
  }

  for (var i = 0; i < modules.length; i++) {
      this[modules[i]] = Sandbox.modules[modules[i]]();
  }
  
  callback(this);
}

// file greeting.js
Sandbox.modules = Sandbox.modules || {};

Sandbox.modules.greeting = function () {
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
};

// file app.js
new Sandbox(function(box) {
  document.write(box.greeting.sayHello('es'));
});