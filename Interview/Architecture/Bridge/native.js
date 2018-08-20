function debugAlert (message) {
  if (!isInApp()) {
    return null
  }

  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.Native) {
    window.webkit.messageHandlers.Native.postMessage({
      handlerInterface: 'Native',
      function: 'showAlter:',
      parameters: message
    })
  }
}