/**
 * 迭代器模式：“提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示”
 */
var each = function (ary, callback) {
  for (var i = 0; i < ary.length; i++) {
    callback.call(ary[i], i, ary[i])
  }
}
each( [ 1, 2, 3 ], function( i, n ){
  alert ( [ i, n ] );
});

/**
 * 内部迭代器
 * “内部迭代器在调用的时候非常方便，外界不用关心迭代器内部的实现，跟迭代器的交互也仅仅是一次初始调用，但这也刚好是内部迭代器的缺点。”
 */
var compare = function (ary1, ary2) {
  if ( ary1.length !== ary2.length ){
    throw new Error ( 'ary1和ary2不相等' );
  }
  each( ary1, function( i, n ){
      if ( n !== ary2[ i ] ){
          throw new Error ( 'ary1和ary2不相等' );
      }
  });
  alert ( 'ary1和ary2相等' );
}
compare( [ 1, 2, 3 ], [ 1, 2, 4 ] );   // throw new Error ( 'ary1和ary2不相等' );

/**
 * 外部迭代器
 * “显式地请求迭代下一个元素”
 */
var Iterator = function( obj ){
  var current = 0;
  var next = function(){
    current += 1;
  };
  var isDone = function(){
    return current >= obj.length;
  };
  var getCurrItem = function(){
    return obj[ current ];
  };
  return {
    next: next,
    isDone: isDone,
    getCurrItem: getCurrItem
  }
};

/**
 * 迭代类数组对象和字面量对象
 */
$.each = function( obj, callback ) {
  var value,
    i = 0,
    length = obj.length,
    isArray = isArraylike( obj );

    if ( isArray ) {    // 迭代类数组
      for ( i < length; i++ ) {
        value = callback.call( obj[ i ], i, obj[ i ] );

        if ( value === false ) {
          break;
        }
      }
    } else {
      for ( i in obj ) {    // 迭代object对象
        value = callback.call( obj[ i ], i, obj[ i ] );
        if ( value === false ) {
          break;
        }
      }
    }
  return obj;
};

/**
 * 中止迭代器
 */
var each = function (ary, callback) {
  for (var i = 0, l = ary.length; i < l; i++){
    if (callback(i, ary[ i ] ) === false) {    // callback的执行结果返回false，提前终止迭代
      break;
    }
  }
};

each([1, 2, 3, 4, 5], function (i, n) {
  if (n > 3) {         // n大于3的时候终止循环
    return false;
  }
  console.log(n);    // 分别输出：1, 2, 3
});

/**
 * 文件上传
 * “因为使用浏览器的上传控件进行上传速度快，可以暂停和续传，所以我们首先会优先使用控件上传”
 */
var getUploadObj = function () {
  try {
    return new ActiveXObject("TXFTNActiveX.FTNUpload");    // IE上传控件
  } catch (e) {
    if (supportFlash()){       // supportFlash函数未提供
      var str = '<object  type="application/x-shockwave-flash"></object>';
      return $( str ).appendTo( $('body') );
   } else {
      var str = '<input name="file" type="file"/>';  // 表单上传
      return $( str ).appendTo( $('body') );
   }
  }
};

// 封装在自己的函数里
var getActiveUploadObj = function(){
  try {
    return new ActiveXObject( "TXFTNActiveX.FTNUpload" );    // IE上传控件
  } catch (e){
    return false;
  }
};

var getFlashUploadObj = function(){
  if ( supportFlash() ){     // supportFlash函数未提供
    var str = '<object type="application/x-shockwave-flash"></object>';
    return $( str ).appendTo( $('body') );
  }
  return false;
};

var getFormUpladObj = function(){
  var str = '<input name="file" type="file" class="ui-file"/>';  // 表单上传
  return $( str ).appendTo( $('body') );
};

var iteratorUploadObj = function () {
  for (var i = 0, fn; fn = arguments[ i++ ];) {
    var uploadObj = fn();
    if ( uploadObj !== false ){
      return uploadObj;
    }
  }
};

var uploadObj = iteratorUploadObj( getActiveUploadObj, getFlashUploadObj, getFormUpladObj );
