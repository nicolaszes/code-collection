process.on('message', m => {
  console.log('Child got message', m)
})

process.send({ foo: 'bar' })