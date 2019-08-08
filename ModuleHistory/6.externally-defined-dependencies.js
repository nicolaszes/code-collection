// file deps.json
{
  "files": {
    "main.js": ["sayHello.js"],
    "sayHello.js": ["helloInLang.js"],
    "helloInLang.js": []
  }
}

// file helloInLang.js
var helloInLang = {
  en: 'Hello world!',
  es: '¡Hola mundo!',
  ru: 'Привет мир!'
};

// file sayHello.js
function sayHello(lang) {
  return helloInLang[lang];
}

// file main.js
console.log(sayHello('en'));