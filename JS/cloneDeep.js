/* 常量定义 */
const CLONE_DEEP_FLAG = 1;
const CLONE_FLAT_FLAG = 2;
const CLONE_SYMBOLS_FLAG = 4;

globalThis.Buffer = globalThis.Buffer || undefined;

const argsTag = "[object Arguments]",
  arrayTag = "[object Array]",
  boolTag = "[object Boolean]",
  dateTag = "[object Date]",
  errorTag = "[object Error]",
  funcTag = "[object Function]",
  genTag = "[object GeneratorFunction]",
  mapTag = "[object Map]",
  numberTag = "[object Number]",
  objectTag = "[object Object]",
  regexpTag = "[object RegExp]",
  setTag = "[object Set]",
  stringTag = "[object String]",
  symbolTag = "[object Symbol]",
  weakMapTag = "[object WeakMap]";

const arrayBufferTag = "[object ArrayBuffer]",
  dataViewTag = "[object DataView]",
  float32Tag = "[object Float32Array]",
  float64Tag = "[object Float64Array]",
  int8Tag = "[object Int8Array]",
  int16Tag = "[object Int16Array]",
  int32Tag = "[object Int32Array]",
  uint8Tag = "[object Uint8Array]",
  uint8ClampedTag = "[object Uint8ClampedArray]",
  uint16Tag = "[object Uint16Array]",
  uint32Tag = "[object Uint32Array]";

/* 初始化系列 */
// 初始化数组
function initCloneArray(array) {
  const length = array.length;
  const result = new array.constructor(length);
  // 正则match返回
  if (
    length &&
    typeof array[0] == "string" &&
    hasOwnProperty.call(array, "index")
  ) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

// 初始化普通对象
// 是否是原型对象
function isPrototype(value) {
  return value === (value.constructor.prototype || Object.prototype);
}

function initCloneObject(object) {
  // 不是原型对象，那就Object.create保持继承关系
  // 是原型对象，那就直接返回一个空对象
  return typeof object.constructor == "function" && !isPrototype(object)
    ? Object.create(Object.getPrototypeOf(object))
    : {};
}

// 获取[Object xxx]
function getTag(v) {
  return Object.prototype.toString.call(v);
}
// 普通获取key
function keys(object) {
  return Object.keys(object);
}
// 普通获取key，包含symbol key
function getAllKeys(object) {
  // getOwnPropertySymbols会把不能枚举的都拿到
  return [
    ...Object.getOwnPropertySymbols(object).filter(key =>
      object.propertyIsEnumerable(key)
    ),
    ...Object.keys(object)
  ];
}

// 获取原型链上的key
function keysIn(object) {
  const res = [];
  for (const key in object) {
    // 拷贝所有的属性（除了最大的原型对象）
    if (
      key !== "constructor" ||
      (!isPrototype(object) && object.hasOwnProperty(key))
    ) {
      result.push(key);
    }
  }
  return res;
}

function getAllKeysIn(object) {
  const res = [];
  // in拿不到symbol key
  for (const key in object) {
    // 拷贝所有的属性（除了最大的原型对象）
    if (
      key !== "constructor" ||
      (!isPrototype(object) && object.hasOwnProperty(key))
    ) {
      result.push(key);
    }
  }
  let temp = object;
  // 逐层获取symbol key
  while (temp) {
    res.push(
      ...Object.getOwnPropertySymbols(object).filter(key =>
        object.propertyIsEnumerable(key)
      )
    );
    temp = Object.getPrototypeOf(object);
  }
  return res;
}

/* 克隆系列 */
// 克隆Buffer
const allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice(); // 深拷贝
  }
  const length = buffer.length;
  const result = allocUnsafe
    ? allocUnsafe(length)
    : new buffer.constructor(length);

  // 为什么这就是浅拷贝呢？
  // 其实和const o = { b: 1 }的浅拷贝是const a = new Object(); a.b = o.b同样的道理
  buffer.copy(result);
  return result;
}

// 克隆ArrayBuffer
function cloneArrayBuffer(arrayBuffer) {
  // 先new一个一样长度的
  const result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  // 使用Uint8Array操作ArrayBuffer，重新set一次
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  // 或者使用DataView
  // new DataView(result).setUint8(new Uint8Array(arrayBuffer));
  return result;
}

// 克隆dataview
function cloneDataView(dataView, isDeep) {
  // 先把buffer拷贝
  const buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  // new的时候，传入拷贝过的buffer
  return new dataView.constructor(
    buffer,
    dataView.byteOffset,
    dataView.byteLength
  );
}

// 克隆类型化数组
function cloneTypedArray(typedArray, isDeep) {
  const buffer = isDeep
    ? cloneArrayBuffer(typedArray.buffer)
    : typedArray.buffer;
  return new typedArray.constructor(
    buffer,
    typedArray.byteOffset,
    typedArray.length
  );
}

// 克隆正则对象
function cloneRegExp(regexp) {
  const result = new regexp.constructor(regexp.source, /\w*$/.exec(regexp));
  result.lastIndex = regexp.lastIndex; // 有g的时候的坑
  return result;
}

// 一些对象的初始化或者克隆
function initCloneByTag(object, tag, isDeep) {
  const Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag:
    case float64Tag:
    case int8Tag:
    case int16Tag:
    case int32Tag:
    case uint8Tag:
    case uint8ClampedTag:
    case uint16Tag:
    case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor();

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return new Ctor();

    case symbolTag:
      return Symbol.prototype.valueOf ? Object(object.valueOf()) : {};
  }
}

function baseClone(value, bitmask, customizer, key, object, cache = new Set()) {
  const isDeep = bitmask & CLONE_DEEP_FLAG; // 是否深拷贝
  const isFlat = bitmask & CLONE_FLAT_FLAG; // 是否拷贝原型链上的属性
  const isFull = bitmask & CLONE_SYMBOLS_FLAG; // 是否拷贝symbol key
  const type = typeof value;
  const isArr = Array.isArray(value);
  let result;

  // cloneWith会用到的customizer
  if (customizer) {
    // object是递归带过来的
    result = object ? customizer(value, key, object, cache) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  // 不是复杂类型直接返回
  if (!(value !== null && (type === "object" || type === "function"))) {
    return value;
  }

  if (isArr) {
    // 克隆数组
    result = initCloneArray(value);
    if (!isDeep) {
      // 浅拷贝，直接连上去
      return result.concat(value);
    }
  } else {
    // 克隆其他
    const tag = getTag(value);
    // 是不是函数，按照规范，函数不克隆
    const isFunc = tag == funcTag || tag == genTag;
    // 克隆Buffer
    if (Buffer && Buffer.isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    // 普通对象、argument、函数
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      // 初始化对象
      result = isFlat || isFunc ? {} : initCloneObject(value);
      // 浅拷贝
      if (!isDeep) {
        // 是否获取原型链上的symbol key和普通key
        const getKeysFunc = isFlat ? getAllKeysIn : getAllKeys;
        return getKeysFunc(value).reduce((acc, shallowCopyKey) => {
          // 一个个赋值
          acc[shallowCopyKey] = value[shallowCopyKey];
          return acc;
        }, {});
      }
    } else {
      // 不能拷贝的对象就放弃
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      // arrayBuffer、typedarray、dataView、regexp、Object{[基本数据类型]}的拷贝
      // set、map在这里只是初始化一个空的
      result = initCloneByTag(value, tag, isDeep);
    }
  }

  // 检查环引用
  const cacheed = cache.has(value);
  if (cacheed) {
    return cacheed;
  }
  cache.add(value, result);

  // set和map，一个个来
  if (isSet(value)) {
    value.forEach(subValue => {
      result.add(
        baseClone(subValue, bitmask, customizer, subValue, value, cache)
      );
    });
  } else if (isMap(value)) {
    value.forEach((subValue, key) => {
      result.set(
        key,
        baseClone(subValue, bitmask, customizer, key, value, cache)
      );
    });
  }

  // 获取key的函数
  const keysFunc = isFull
    ? isFlat
      ? getAllKeysIn
      : getAllKeys
    : isFlat
    ? keysIn
    : keys;

  // 对象的属性，只有普通对象有props
  const props = isArr ? undefined : keysFunc(value);
  (props || value).forEach((subValue, key) => {
    let newKey = key; // 数组的index或者对象的key
    let newValue = subValue; // subValue本来是所拷贝的对象里面的key或者数组的一个元素值
    // 是对象的时候
    if (props) {
      newKey = newValue; // 如果是对象，新的key即是forEach第一个参数
      newValue = value[newKey]; // 所拷贝的对象里面的key对应的value
    }
    // 赋值，递归还把当前的一些值带下去(value、cache、newKey)
    result[newKey] = baseClone(
      newValue,
      bitmask,
      customizer,
      newKey,
      value,
      cache
    );
  });
  return result;
}