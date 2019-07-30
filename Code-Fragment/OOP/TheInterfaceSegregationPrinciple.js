/**
 * 接口隔离原则
 * 
 * 聚集功能职责的
 * 具有单一职责的程序转化到一个具有公共接口的对象
 * 不应该强迫客户依赖于它们不用的方法
 * 
 * 一个对象声明的任意一个操作都包含一个操作名称，参数对象和操作的返回值。
 * 我们称之为操作符的签名（signature）。
 * 一个对象里声明的所有的操作被称为这个对象的接口（interface）。
 * 一个对象的接口描绘了所有发生在这个对象上的请求信息。
 */

var exampleBinder = {};
exampleBinder.modelObserver = (function () {
  /* 私有变量 */
  return {
    observe: function (model) {
      /* 代码 */
      return newModel;
    },
    onChange: function (callback) {
      /* 代码 */
    }
  }
})();

exampleBinder.viewAdaptor = (function () {
  /* 私有变量 */
  return {
    bind: function (model) {
      /* 代码 */
    }
  }
})();

exampleBinder.bind = function (model) {
  /* 私有变量 */
  exampleBinder.modelObserver.onChange( /* 回调callback */ );
  var om = exampleBinder.modelObserver.observe(model);
  exampleBinder.viewAdaptor.bind(om);
  return om;
};