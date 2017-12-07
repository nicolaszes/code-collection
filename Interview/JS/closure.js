/*
 * 考察同步异步，作用域，闭包
 * the answer is 5 => 5,5,5,5,5
 */
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(new Date, i)
  }, 1000)
}
// console.log(new Date, i)

/*
 * expand closure
 * Wanted the answer is 5 => 0,1,2,3,4
 * use IIFE
 */
// plan A
for (var i = 0; i < 5; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(new Date, j)
    }, 1000)
  })(i)
}
console.log(new Date, i)

// plan B
var output = i => {
  setTimeout(function () {
    console.log(new Date, i)
  }, 1000)
}

for (var i = 0; i < 5; i++) {
  output(i)
}
console.log(new Date, i)

// plan C
let i;
for (i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(new Date, i)
  }, 1000)
}
console.log(new Date, i)


/*
 * Wanted the answer is => 0 => 1 => 2 => 3 => 4 => 5
 * use IIFE
 */
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(new Date, j);
    }, 1000 * j));  // 这里修改 0~4 的定时器时间
  })(i);
}
setTimeout(function() { // 这里增加定时器，超时设置为 5 秒
  console.log(new Date, i);
}, 1000 * i);

/*
 * use Promise
 */
// Plan A
const tasks = [];
for (var i = 0; i < 5; i++) {
   (j => tasks.push(new Promise(resolve => {
        setTimeout(() => {
           console.log(new Date, j)
           resolve()
        }, j * 1000)
     })
   ))(i)
}
Promise.all(tasks).then(() => {
   setTimeout(() => {
      console.log(new Date, i)
   }, 1000)
})

// Plan B beautify
const tasks = [];
let output = i => new Promise(resolve => {
  setTimeout(() => {
    console.log(new Date, i)
    resolve()
  }, i * 1000)
})
let i;
for (i = 0; i < 5; i++) {
  tasks.push(output(i))
}

Promise.all(tasks).then(() => {
  setTimeout(() => {
    console.log(new Date, i)
  }, 1000)
})

/*
 * use async / await
 */
const sleep = time => new Promise(resolve => {setTimeout(resolve, time)});

(async () => {
  for (var i = 0; i < 5; i++) {
    await sleep(1000)
    console.log(new Date, i)
  }
  await sleep(1000)
  console.log(new Date, i)
})()
