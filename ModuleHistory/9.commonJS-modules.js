// file greeting.js
var helloInLang = {
  en: 'Hello world!',
  es: '¡Hola mundo!',
  ru: 'Привет мир!'
};

var sayHello = function (lang) {
  return helloInLang[lang];
}

module.exports.sayHello = sayHello;

// file hello.js
var sayHello = require('./lib/greeting').sayHello;
var phrase = sayHello('en');
console.log(phrase);

// This function wraps every module before sending it to the JavaScript engine
(function (exports, require, module, __filename, __dirname) {
  // ...
  // Your code injects here!
  // ...
});