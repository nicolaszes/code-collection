// Promise
const sleep = time => {
  return new Promise(resolve => setTimeout(resolve, time))
}
sleep(1000).then(() => {
  console.log(1)
})

// Generator
function* sleepGenerator() {
  yield new Promise(function (resolve) {
    setTimeout(resolve, time);
  })
}

sleepGenerator(1000).next().value.then(() => {
  console.log(1)
})

// Async/await
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

async function output() {
  let out = await sleep(1000)
  console.log(1)
  return out
}

// ES5
function sleep(callback, time) {
  if (typeof callback !== 'function') {
    throw new Error('must be function')
  }
  setTimeout(callback, time)
}

function output() {
  console.log(1)
}
sleep(output, 1000)