/**
 * 最少知识原则
 */

/**
 * 中介者模式
 */
class Mediator {
  send(msg, colleague) {}
}

class Colleague {
  constructor(mediator) {
    this.mediator = mediator
  }

  send(msg) {
    throw new Error('Abstract method')
  }

  receive(msg) {
    throw new Error('Abstract method')
  }
}

class ConcreteColleagueA extends Colleague {
  constructor(mediator) {
    super(mediator)
  }

  send(msg) {
    this.mediator.send(msg, this)
  }

  receive(msg) {
    console.log(msg, "`receive` of ConcreteColleagueA is being called!")
  }
}

class ConcreteColleagueB extends Colleague {
  constructor(mediator) {
    super(mediator)
  }

  send(msg) {
    this.mediator.send(msg, this)
  }

  receive(msg) {
    console.log(msg, "`receive` of ConcreteColleagueA is being called!")
  }
}

class ConcreteMediator extends Mediator {
  send(msg, colleague) {
    if (this.concreteColleagueA === colleague) {
      this.concreteColleagueB.receive(msg)
    } else {
      this.concreteColleagueA.receive(msg)
    }
  }
}

var cm = new ConcreteMediator()
let c1 = new ConcreteColleagueA(cm)
let c2 = new ConcreteColleagueB(cm)

cm.concreteColleagueA = c1
cm.concreteColleagueB = c2

c1.send("`send` of ConcreteColleagueA is being called!")
c2.send("`send` of ConcreteColleagueB is being called!")

/**
 * 外观模式: 对客户屏蔽一组子系统的复杂性
 * 为一组子系统提供一个简单便利的访问入口。
 * 隔离客户与复杂子系统之间的联系，客户不用去了解子系统的细节。
 */
var A = function () {
  a1()
  a2()
}

var B = function () {
  b1()
  b2()
}

var facade = function () {
  A()
  B()
}

facade()