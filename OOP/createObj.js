/**
 * 1.工厂模式
 */
function createPerson (name) {
  var o = new Object();
  o.name = name;
  o.getName = function () {
    console.log(this.name)
  }

  return o;
}

var person1 = createPerson('nico')
// 对象无法识别，因为所有的实例都指向一个原型

/**
 * 2.构造函数模式
 */
function Person (name) {
  this.name = name;
  this.getName = function () {
    console.log(this.name)
  }
}

var person2 = new Person('name')
// 优点：实例可以识别为一个特定的类型
// 缺点：每次创建实例时，每个方法都要被创建一次

/**
 * 2-1.构造函数模式优化
 */
function Person (name) {
  this.name = name;
  this.getName = getName
}
function getName() {
  console.log(this.name);
}
var person1 = new Person('nico');
// 解决了每个方法都要被重新创建的问题
// 没有封装

/**
 * 3.原型模式
 */
function Person (name) {}
Person.prototype.name = name;
Person.prototype.getName = function () {
  console.log(this.name);
};

var person1 = new Person();
// 优点：方法不会重新创建
// 1.所有的属性和方法都共享，2.不能初始化参数

/**
 * 3.1 原型模式优化
 */
function Person (name) {};
Person.prototype = {
  name: 'nico',
  getName: function () {
    console.log(this.name)
  }
}

var person1 = new Person();
// 优点：封装性较好
// 缺点：重写了原型，丢失了 constructor属性

/**
 * 3.2 原型模式优化
 */
function Person (name) {};
Person.prototype = {
  constructor: Person,
  name: 'nico',
  getName: function () {
    console.log(this.name);
  }
}

var person1 = new Person();
// 优点：实例可以通过 constructor属性找到所属的构造函数
// 缺点：原型模式该有的缺点还是有


/**
 * 4.组合模式
 */
function Person (name) {
  this.name = name;
}
Person.prototype = {
  constructor: Person,
  getname: function () {
    console.log(this.name)
  }
}

var person1 = new Person();
// 优点：该共享的共享，该私有的私有
// 缺点：有的人就是希望全部写在一起，即封装性

/**
 * 4.1 动态原型模式
 */
function Person(name) {
  this.name = name;
  console.log(Person.prototype)
  if (typeof this.getName !== 'function') {
    console.log(Person.prototype)
    Person.prototype = {
      constructor: Person,
      getName: function () {
        console.log(this.name);
      }
    }
    return new Person(name)
  }
}

var person1 = new Person('nico');
var person2 = new Person('coco');

/**
 * 5.1 寄生构造函数模式
 * "特殊情况下使用。比如我们想创建一个具有额外方法的特殊数组，但是又不想直接修改Array构造函数，我们可以这样写"
 */
function Person(name) {
  var o = new Object();
  o.name = name;
  o.getName = function () {
    console.log(this.name)
  };
  return o;
}

var person1 = new Person('co');
console.log(person1 instanceof Person) // false
console.log(person1 instanceof Object)  // true

function SpecialArray () {
  var values = new Array();
  values.push.apply(values, arguments);
  values.toPipedString = function () {
    return this.join('|');
  };
  return values;
}
var colors = new SpecialArray('red', 'blue', 'green');
var colors2 = SpecialArray('red2', 'blue2', 'green2');

console.log(colors);
console.log(colors.toPipedString()); // red|blue|green

console.log(colors2);
console.log(colors2.toPipedString()); // red2|blue2|green2


/**
 * 5.2 稳妥构造函数模式
 * "有公共属性，而且其方法也不引用 this 的对象"
 */
function Person (name) {
  var o = new Object();
  o.sayName = function () {
    console.log(name);
  };
  return o;
}

var person1 = Person('coco');
person1.sayName();
person1.name = 'daisy';
person1.sayName();
console.log(person1.name); // daisy

// 优点： 适合在一些安全的环境中
// 缺点： 稳妥构造函数模式也跟工厂模式一样，无法识别对象所属类型。
