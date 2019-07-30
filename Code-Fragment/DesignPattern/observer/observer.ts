namespace ObserverPattern {
  export class Subject {
    private observers: Observer[] = []

    public register(observer: Observer): void {
      this.observers.push(observer)
    }

    public unregister(observer: Observer): void {
      const pos: number = this.observers.indexOf(observer)
      this.observers.splice(pos, 1)
    }

    public notify(): void {
      for (let i: number = 0, max: number = this.observers.length; i < max; i++) {
        this.observers[i].notify()
      }
    }
  }

  export class ConcreteSubject extends Subject {
    private subjectState: number

    get SubjectState(): number {
      return this.subjectState
    }

    set SubjectState(subjectState: number) {
      this.subjectState = subjectState
    }
  }

  export class Observer {
    public notify(): void {
      throw new Error('Abstract Method!')
    }
  }

  export class ConcreteObserver extends Observer {
    private name: string
    private state: number
    private subject: ConcreteSubject

    constructor(subject: ConcreteSubject, name: string) {
      super()
      this.subject = subject
      this.name = name
    }

    public notify(): void {
      this.state = this.subject.SubjectState
    }

    get Subject(): ConcreteSubject {
      return this.subject
    }

    set Subject(subject: ConcreteSubject) {
      this.subject = subject
    }
  }
}

export namespace Demo {
  export function show() : void {
    var sub: ObserverPattern.ConcreteSubject = new ObserverPattern.ConcreteSubject()

    sub.register(new ObserverPattern.ConcreteObserver(sub, "Jancsi"))
    sub.register(new ObserverPattern.ConcreteObserver(sub, "Julcsa"))
    sub.register(new ObserverPattern.ConcreteObserver(sub, "Marcsa"))

    sub.SubjectState = 123
    sub.notify()
  }
}