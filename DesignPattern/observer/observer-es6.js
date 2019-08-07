class Subject {
  constructor() {
    this.observers = []
  }

  register(observer) {
    this.observers.push(observer)
  }

  unregister(observer) {
    let pos = this.observers.indexOf(observer)
    this.observers.splice(pos, 1)
  }

  notify() {
    console.log("notify all the observers", this.observers)
    for (let i = 0, max = this.observers.length; i < max; i++) {
      this.observers[i].notify()
    }
  }
}

class ConcreteSubject extends Subject {
  constructor(subjectState) {
    super()
    this.subjectState = subjectState
  }

  get SubjectState() {
    return this.subjectState
  }

  set SubjectState(subjectState) {
    this.subjectState = subjectState
  }
}

class Observer {
  notify() {
    throw new Error("Abstract Method!")
  }
}

class ConcreteObserver extends Observer {
  constructor(subject, name) {
    super()
    this.subject = subject
    this.name = name
    this.state = 0
  }

  notify() {
    // console.log("ConcreteObserver's notify method")
    this.state = this.subject.SubjectState
    console.log(this.name, this.state)
  }

  get Subject() {
    return this.subject
  }

  set Subject(subject) {
    this.subject = subject
  }
}

let sub = new ConcreteSubject()
sub.register(new ConcreteObserver(sub, 'Amily'))
sub.register(new ConcreteObserver(sub, 'Bill'))
sub.register(new ConcreteObserver(sub, 'Cicci'))

sub.SubjectState = 123
sub.notify()