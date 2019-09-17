// file lib/greeting.js
const helloInLang = {
  en: 'Hello world!',
  es: '¡Hola mundo!',
  ru: 'Привет мир!'
};

export const greeting = {
  sayHello: function (lang) {
    return helloInLang[lang];
  }
};

// file hello.js
import {
  greeting
} from "./lib/greeting";
const phrase = greeting.sayHello("en");
document.write(phrase);