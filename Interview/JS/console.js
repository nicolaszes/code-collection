/**
 * 自定义 console 对象的方法
 */
(function newConsole() {
  let count = 1;
  console["log"] = info => `${count++}: ${info}`;
  // console['log'] = console['log'].bind(console, '温馨提示')
})();

function Person(name) {
  this.name = name;
}
Person.prototype.age = 20;
Person.prototype.award = [];

var jack = new Person("jack");
var rose = new Person("rose");

jack.age++;
rose.award.push("oscar");

console.log(rose.age);
console.log(jack.award);
