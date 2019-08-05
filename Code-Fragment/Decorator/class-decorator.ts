@sealed
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    return 'Hello, ' + this.greeting
  }
}

function sealed(constructor: Function) {
  Object.seal(constructor)
  Object.seal(constructor.prototype)
}

function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
  return class extends constructor {
    newProperty = 'new property'
    hello = 'override'
  }
}

@classDecorator
class Greeter2 {
  property = 'property'
  hello: string
  constructor(m: string) {
    this.hello = m
  }
}

console.log(new Greeter2('world'))