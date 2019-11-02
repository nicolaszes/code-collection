/**
 * 深拷贝的实现
 */
function deepCopy(target) {
  // 只拷贝对象
  if (typeof target !== "object") return;
  // 根据 obj的类型判断是新建一个数组还是对象
  var cloneTarget = target instanceof Array ? [] : {};
  for (var key in target) {
    cloneTarget[key] = typeof target[key] === "object" ? deepCopy(target[key]) : target[key];
  }
  return cloneTarget;
};

/**
 * 循环引用
 * Map => WeakMap
 */
function deepCopy(target, map = new WeakMap()) {
  // 只拷贝对象
  if (typeof target !== "object") return target;

  // 根据 obj的类型判断是新建一个数组还是对象
  var cloneTarget = target instanceof Array ? [] : {};

  if (map.get(target)) {
    return target;
  }
  map.set(target, cloneTarget);

  for (var key in target) {
    cloneTarget[key] = typeof target[key] === "object" ? deepCopy(target[key]) : target[key];
  }
  return cloneTarget;
};


/**
 * 性能优化
 * 我们先使用 while来实现一个通用的 forEach遍历， iteratee是遍历的回掉函数，他可以接收每次遍历的 value和 index两个参数
 */
function forEach(array, iteratee) {
  let index = -1;

  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

function deepCopy(target, map = new WeakMap()) {
  // 只拷贝对象
  if (typeof target !== "object") {
    return target;
  }

  // 根据 obj的类型判断是新建一个数组还是对象
  var cloneTarget = target instanceof Array ? [] : {};

  if (map.get(target)) {
    return target;
  }
  map.set(target, cloneTarget);

  const keys = isArray ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = clone2(target[key], map);
  });
  return cloneTarget;
};

/**
 * 其他数据类型
 */
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';

// 合理的判断引用类型
function isObject(target) {
  const type = typeof target;
  return target !== null && (type === 'object' || type === 'function');
}

// 获取数据类型
function getType(target) {
  return Object.prototype.toString.call(target);
}

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function deepCopy(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  // 初始化
  const type = getType(target)
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type)
  }

  // 防止循环引用
  if (map.get(target)) {
    return target;
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type === setTag) {
    target.forEach(value => {
      cloneTarget.add(deepCopy(value));
    });

    return cloneTarget;
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, deepCopy(value));
    });

    return cloneTarget;
  }

  // 克隆对象和数组
  const keys = isArray ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = deepCopy(target[key], map);
  });
  return cloneTarget;
};