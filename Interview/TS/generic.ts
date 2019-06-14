type A = {
  a: string
  b: string
  d: number
}

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>> 
  & {
      [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

type FOO = RequireAtLeastOne<A, 'a' | 'b'>

const foo: FOO = {
  a:'2',
  d: 1
}

interface lengthWise {
  length: number
}

function log<T extends lengthWise>(arg: T) {
  console.log(arg.length)
  return arg
}

log({ length: 3 })

let userName: <T>(arg: T) => T = x => x

