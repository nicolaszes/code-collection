type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]

interface A {
  a: number
  b: number
}

type AtLeastOne = RequireAtLeastOne<A>

const obj: AtLeastOne = {
  a: 1
}