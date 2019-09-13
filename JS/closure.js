/*
 * 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，
 * 在IE中可能导致内存泄露。
 * 解决方法是，在退出函数之前，将不使用的局部变量全部删除。
 * 
 * 闭包会在父函数外部，改变父函数内部变量的值。
 * 所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），
 * 把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。
 * 
 * 
 * 闭包：可以继续访问定义时的词法作用域
 * 考察同步异步，作用域，闭包
 * the answer is 5 => 5,5,5,5,5
 */
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(new Date(), i);
  }, 1000);
}
// console.log(new Date, i)

/*
 * expand closure
 * Wanted the answer is 5 => 0,1,2,3,4
 * use IIFE
 */
// plan A
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(new Date(), j);
    }, 1000);
  })(i);
}
console.log(new Date(), i);

// plan B
var output = i => {
  setTimeout(function() {
    console.log(new Date(), i);
  }, 1000);
};

for (var i = 0; i < 5; i++) {
  output(i);
}
console.log(new Date(), i);

// plan C
let i;
for (i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(new Date(), i);
  }, 1000);
}
console.log(new Date(), i);

/*
 * Wanted the answer is => 0 => 1 => 2 => 3 => 4 => 5
 * use IIFE
 */
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(new Date(), j);
    }, 1000 * j); // 这里修改 0~4 的定时器时间
  })(i);
}
setTimeout(function() {
  // 这里增加定时器，超时设置为 5 秒
  console.log(new Date(), i);
}, 1000 * i);

/*
 * use Promise
 */
// Plan A
const tasks = [];
for (var i = 0; i < 5; i++) {
  (j =>
    tasks.push(
      new Promise(resolve => {
        setTimeout(() => {
          console.log(new Date(), j);
          resolve();
        }, j * 1000);
      })
    ))(i);
}
Promise.all(tasks).then(() => {
  setTimeout(() => {
    console.log(new Date(), i);
  }, 1000);
});

// Plan B beautify
const tasks = [];
let output = i =>
  new Promise(resolve => {
    setTimeout(() => {
      console.log(new Date(), i);
      resolve();
    }, i * 1000);
  });
let i;
for (i = 0; i < 5; i++) {
  tasks.push(output(i));
}

Promise.all(tasks).then(() => {
  console.log("start");
  setTimeout(() => {
    console.log("final");
    console.log(new Date(), i);
  }, 1000);
});

/*
 * use async / await
 */
const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

(async () => {
  for (var i = 0; i < 5; i++) {
    await sleep(1000);
    console.log(new Date(), i);
  }
  await sleep(1000);
  console.log(new Date(), i);
})();


var bar = {
  myName:"time.geekbang.com",
  printName: function () {
      console.log(myName)
  }
}
function foo() {
  let myName = " 极客时间 "
  return bar.printName
}
let myName = " 极客邦 "
let _printName = foo()
_printName()
bar.printName()


/**
 * 这道题其实是个障眼法，只需要确定好函数调用栈就可以很轻松的解答
 * 调用了foo()后，返回的是bar.printName，后续就跟foo函数没有关系了
 * 所以结果就是调用了两次bar.printName()，根据词法作用域，结果都是“极客邦”，也不会形成闭包。
 * 
 * 闭包还可以这样理解：
 * 当函数嵌套时，内层函数引用了外层函数作用域下的变量，并且内层函数在全局作用域下可访问时，就形成了闭包。
 */


// 全局执行上下文：
// 变量环境：
// Bar=undefined
// Foo= function
// 词法环境：
// myname = undefined
// _printName = undefined

// 开始执行：
// bar ={myname: "time.geekbang.com", printName: function(){...}}

// myName = " 极客邦 "
//  _printName = foo() 调用foo函数，压执行上下文入调用栈

// foo函数执行上下文：
// 变量环境： 空
// 词法环境： myName=undefined
// 开始执行：
// myName = " 极客时间 "
// return bar.printName
// 开始查询变量bar， 查找当前词法环境（没有）->查找当前变量环境（没有） -> 查找outer词法环境（没有）-> 查找outer语法环境（找到了）并且返回找到的值
// pop foo的执行上下文

// _printName = bar.printName
// printName（）压bar.printName方法的执行上下文入调用栈

// bar.printName函数执行上下文：
// 变量环境： 空
// 词法环境： 空
// 开始执行：
// console.log(myName)
// 开始查询变量myName， 查找当前词法环境（没有）->查找当前变量环境（没有） -> 查找outer词法环境（找到了）
// 打印" 极客邦 "
// pop bar.printName的执行上下文

// bar.printName() 压bar.printName方法的执行上下文入调用栈

// bar.printName函数执行上下文：
// 变量环境： 空
// 词法环境： 空
// 开始执行：
// console.log(myName)
// 开始查询变量myName， 查找当前词法环境（没有）->查找当前变量环境（没有） -> 查找outer词法环境（找到了）
// 打印" 极客邦 "
// pop bar.printName的执行上下文