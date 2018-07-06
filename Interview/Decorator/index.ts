/**
 * class Decorator
 * 
 * 类级别装饰器，修饰整个类，可以读取、修改类中任何属性和方法。
 */
const classDecorator = (target: any) => {
  const keys = Object.getOwnPropertyNames(target.prototype)
  console.log('classA keys,', keys) // classA keys ["constructor", "sayName"]
}

@classDecorator
class A {
  sayName() {
    console.log('classA ascoders')
  }
}
const a = new A()
a.sayName() // classA ascoders

/**
 * Method Decorator
 * 
 * 方法级别装饰器，修饰某个方法，和类装饰器功能相同，但是能额外获取当前修饰的方法名。
 */
const methodDecorator = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  return {
    get() {
      return () => {
        console.log('classC method override')
      }
    }
  }
}

class C {
  @methodDecorator
  sayName() {
    console.log('classC ascoders')
  }
}
const c = new C()
c.sayName() // classC method override

/**
 * Property Decorator
 * 
 * 属性级别装饰器，修饰某个属性，和类装饰器功能相同，但是能额外获取当前修饰的属性名。
 * 目前标准尚未支持，通过 get set 模拟实现
 */
const propertyDecorator = (target: any, propertyKey: string | symbol) => {
  Object.defineProperty(target, propertyKey, {
    get() {
      return 'github'
    },
    set(value: any) {
      return value
    }
  })
}

class B {
  @propertyDecorator
  private name = 'ascoders'

  sayName() {
    console.log(`classB ${this.name}`)
  }
}
const b = new B()
b.sayName() // classB github