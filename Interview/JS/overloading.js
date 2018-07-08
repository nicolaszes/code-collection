/**
 * 函数重载（Method Overloading）函数名一样 参数不一样
 * 函数名称一样，但是输入输出不一样
 * 允许某个函数有各种不同输入，根据不同的输入，调用不同的函数，然后返回不同的结果
 */
function addMethod (obejct, name, fn) {
  var old = object[ name ]
  object[ name ] = function () {
    if (fn.length === arguments.length) {
      return fn.apply(this, arguments)
    }
    else if (typeof old === 'function') {
      return old.apply(this, arguments)
    }
  }
}

/**
 * addMethod 可以这样使用
 */
function Users () {
  addMethod(this, find, function () {
    // Find all users
  });
  addMethod(this, find, function (name) {
    // Find a user by a name
  });
  addmethod(this, find, function (first, last) {
    // Find a user by first and last name
  });
}

/**
 * 将 find方法添加到 Users 的 prototype中
 * 这样所有对象实例将共享 find 函数
 */
function Users () {
  addMethod(Users.prototype, find, function () {
    // Find all users
  });
  addMethod(Users.prototype, find, function (name) {
    // Find a user by name
  });
  addMethod(Users.prototype, find, function (first, last) {
    // Find a user by first and last name
  });
}

/**
 * Users 对象的 find方法成功实现了重载，
 * 可以根据不同的输入调用不同的函数
 */
var users = new Users();
users.find(); // Find all
users.find('John'); // Find users by name
users.find('John', 'Resig'); // Find users by first and last name
users.find('John', 'E', 'Resig'); // Does nothing

/**
 * users对象的 find方法允许 3种不同的输入
 * 0个参数时，返回所有人名
 * 1个参数时，根据 firstName 查找人名并返回
 * 2个参数时，根据 first lastName查找人名并返回
 */

/**
 * 由 addMethod函数的调用顺序可知，users.find 最终绑定的是 find2函数
 * 绑定 find2时，old为 find1
 * 绑定 find1时，old为 find0
 * 3个函数 find0，find1，find2就这样通过闭包链接起来了
 */


/**
 * different edition use ts
 */
class Chicken {}
class Beef {}

// function (c: Chicken) : any;
// function (c: Beef) : any;

function cooking (food) {
  if (food instanceof Chicken) {
    console.log("第一步： 杀鸡取卵");
  }

  if(food instanceof Beef) {
    console.log("牛肉不能煮太久，要不然不好吃了")
  }
}

let c = new Chicken();
let b = new Beef();
cooking(c)
cooking(b)