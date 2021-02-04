class P {
  constructor() {
    this.a = 1
  }
  pFunc = () => {}
}

class C extends P {
  constructor() {
    super()
    this.b = 1
  }
  cFunc = () => {}
}

let c = new C


function Parent() {
  this.a = 1
  this.pFunc = () => {}
}

function Child() {
  this.b = 2
  this.cFunc = () => {}
}

Child.prototype = new Parent

let child = new Child