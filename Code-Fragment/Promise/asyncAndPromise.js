const p = Promise.resolve();

(async () => {
  await p; console.log('after:await');
})();

p.then(() => console.log('tick:a'))
 .then(() => console.log('tick:b'))
 .then(() => console.log('tick:d'))
 .then(() => console.log('tick:c'));
 

//  after:await -> tick:a -> tick:b (node 8 wrong)
//  tick:a -> tick:b -> after:await (node 10)

// async function computeAnswer() {
//   return 42;
// }

// const p = computeAnswer();
// // → Promise

// p.then(console.log);
// // prints 42 on the next turn


// class Sleep {
//   constructor(timeout) {
//     this.timeout = timeout;
//   }
//   then(resolve, reject) {
//     const startTime = Date.now();
//     setTimeout(
//       () => resolve(Date.now() - startTime),
//     this.timeout);
//   }
// }

// (async () => {
//   const actualTime = await new Sleep(1000);
//   console.log(actualTime);
// })();