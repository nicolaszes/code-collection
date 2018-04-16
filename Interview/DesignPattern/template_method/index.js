/**
 * template method 只需使用继承就可以实现的非常简单的模式
 * 抽象父类
 * 具体的实现子类
 * 子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法
 * 子类实现中的相同部分被上移到父类中，而将不同的部分留待子类来实现，很好的体现了泛化的思想
 * 
 * 把需要执行的操作封装在回调函数里，然后把主动权交给另外一个函数
 */

/**
 * 适用场景，构建一系列的 UI组件，这些组件的构建过程：
 * @1初始化一个 div容器
 * @2通过 ajax请求拉去相应的数据
 * @3把数据渲染到 div容器里面，完成组件的构造
 * @4通知用户组件渲染完毕
 */
class AbstractClass {
  method1 () {
    throw new Error('Abstract Method')
  }
  method2 () {
    throw new Error('Abstract Method')
  }
  method3 () {
    throw new Error('Abstract Method')
  }
  needMethod3 () {
    return true
  }
  /**
   * templateMethod
   */
  templateMethod () {
    console.log('template method is being called')
    this.method1()
    this.method2()
    if (this.needMethod3()) {
      this.method3()
    }
  }
}

class ConcreteClass1 extends AbstractClass {
  method1 () {
    console.log("method1 of ConcreteClass1")
  }
  method2 () {
    console.log("method2 of ConcreteClass1")
  }
  method3 () {
    console.log("method3 of ConcreteClass1")
  }
}

class ConcreteClass2 extends AbstractClass {
  method1 () {
    console.log("method1 of ConcreteClass2")
  }
  method2 () {
    console.log("method2 of ConcreteClass2")
  }
}

const c1 = new ConcreteClass1()
const c2 = new ConcreteClass2()
c1.templateMethod()
c2.templateMethod() // throw error