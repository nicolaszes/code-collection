/**
 * 所有异常处理收敛到 action 中
*/
namespace BasicAction {
  const successRequest = () => Promise.resolve('a')
  const failRequest = () => Promise.reject('b')

  class Action {
    async successReuqest() {
      const result = await successRequest()
      console.log('successReuqest', '处理返回值', result) // successReuqest 处理返回值 a
    }

    async failReuqest() {
      const result = await failRequest()
      console.log('failReuqest', '处理返回值', result) // 永远不会执行
    }

    async allReuqest() {
      const result1 = await successRequest()
      console.log('allReuqest', '处理返回值 success', result1) // allReuqest 处理返回值 success a
      const result2 = await failRequest()
      console.log('allReuqest', '处理返回值 success', result2) // 永远不会执行
    }
  }

  const action = new Action()
  action.successReuqest()
  action.failReuqest()
  action.allReuqest()
}

// 程序崩溃
// Uncaught (in promise) b
// Uncaught (in promise) b

/**
 * 为了防止程序崩溃，需要业务线在所有 async 函数中包裹 try catch。
 * 我们需要一种机制捕获 action 最顶层的错误进行统一处理。
 * 
 * 类级别装饰器，专门捕获 async 函数抛出的异常
 */
const asyncClass = (errorHandler?: (error?: Error) => void) => (target) => {
  Object.getOwnPropertyNames(target.prototype).forEach(key => {
    const func = target.prototype[key]
    target.prototype[key] = async (...args) => {
      try {
        await func.apply(this, args)
      } catch (error) {
        errorHandler && errorHandler(error)
      }
    }
  })
  return target
}

/**
 * 类所有方法都用 try catch 包裹住，将异常交给业务方统一的 errorHandler 处理
 */
namespace DecoratorClassAction {
  const successRequest = () => Promise.resolve('a')
  const failRequest = () => Promise.reject('b')

  const iAsyncClass = asyncClass(error => {
    console.log('统一异常处理', error) // 统一异常处理 b
  })

  @iAsyncClass
  class Action {
    async successReuqest() {
      const result = await successRequest()
      console.log('successReuqest', '处理返回值', result)
    }

    async failReuqest() {
      const result = await failRequest()
      console.log('failReuqest', '处理返回值', result) // 永远不会执行
    }

    async allReuqest() {
      const result1 = await successRequest()
      console.log('allReuqest', '处理返回值 success', result1)
      const result2 = await failRequest()
      console.log('allReuqest', '处理返回值 success', result2) // 永远不会执行
    }
  }

  const action = new Action()
  action.successReuqest()
  action.failReuqest()
  action.allReuqest()
}

/**
 * 方法级别的异常处理
 * 装饰器需要放在函数上
 */
const asyncMethod = (errorHandler?: (error?: Error) => void) =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const func = descriptor.value
    return {
      get() {
        return (...args: any[]) => {
          return Promise.resolve(func.apply(this, args)).catch(error => {
            errorHandler && errorHandler(error)
          })
        }
      },
      set(newValue: any) {
        return newValue
      }
    }
  }

namespace MethodDecoratorAction {
  const successRequest = () => Promise.resolve('a')
  const failRequest = () => Promise.reject('b')

  const asyncAction = asyncMethod(error => {
    console.log('统一异常处理', error) // 统一异常处理 b
  })

  class Action {
    @asyncAction async successReuqest() {
      const result = await successRequest()
      console.log('successReuqest', '处理返回值', result)
    }

    @asyncAction async failReuqest() {
      const result = await failRequest()
      console.log('failReuqest', '处理返回值', result) // 永远不会执行
    }

    @asyncAction async allReuqest() {
      const result1 = await successRequest()
      console.log('allReuqest', '处理返回值 success', result1)
      const result2 = await failRequest()
      console.log('allReuqest', '处理返回值 success', result2) // 永远不会执行
    }
  }

  const action = new Action()
  action.successReuqest()
  action.failReuqest()
  action.allReuqest()
}