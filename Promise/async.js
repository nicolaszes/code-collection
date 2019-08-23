async function a () {
  const res1 = await 1
  const res2 = await b().catch((err) => {
    console.log(err)
  })

  const res3 = await 3

  console.log(res1, res2, res3) // 1, undefined, 3
}

async function b () {
  throw Error('2')
  console.log(2)
  await 2
}

a()