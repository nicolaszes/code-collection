(function() {
  var id = 0;
  var callback = {}

  window.JSBridge = {
    invoke: function ( briageName, callback, data ) {
      // 判断环境，获取不同的 nativeBridge
      var thisId = id ++;
      callbacks[thisId] = callback; // 存储 callback
      nativeBridge.postMessage({
        bridgeName: bridgeName,
        data: data || {},
        callbackId: thisId, // 传到 native 端
      });
    },
    receiveMessage: function (msg) {
      var bridgeName = msg.bridgeName,
          data = msg.data || {},
          callbackId = msg.callbackId; // Native 将 callbackId 原封不动传回
      // 具体逻辑
      // bridgeName 和 callbackId 不会同时存在
      if (callbackId) {
        if (callbacks[callbackId]) { // 找到相应句柄
          callbacks[callbackId](msg.data) // 执行调用
        }
      } else if (bridgeName) {

      }
    }
  }
})()
