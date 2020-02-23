/**
 * f(1).value == 1; 
 * f(1)(2).value == 5; 
 * f(1)(2)(3).value == 14;
 */

function add(n) {
  let sum = [n];

  function powAdd(m) {
    sum.push(m);
    powAdd.value = sum
      .map(item => Math.pow(item, 2))
      .reduce((pre, next) => pre + next);
    return powAdd;
  }

  powAdd.value = sum
    .map(item => Math.pow(item, 2))
    .reduce((pre, next) => pre + next);
  return powAdd;
}

add(1).value;
add(1)(2).value;
add(1)(2)(3).value;

/**
 * add(1)(2)(3); // 6
 * add(1)(2)(3)(4); // 10
 * add(1)(2)(3)(4)(5); // 15
 * 
 * var addTwo = add(2);
 * addTwo; // 2
 * addTwo + 5; // 7
 * addTwo(3); // 5
 * addTwo(3)(5); // 10
 */
const add = n => {
  const f = x => add(n + x);
  f.valueOf = () => n;
  return f;
};

function add(n) {
  function func(x) {
    console.log(n, x, n + x);
    return add(n + x);
  }
  func.valueOf = function() {
    return n;
  };
  return func;
}

function add(n){
  // Let the currying begin!
  function next(val) {
    next.sum += val;
    
    return next;
  }
  
  next.sum = n
  
  next[Symbol.toPrimitive] = function(hint) {
    if (hint === 'default') {
      return next.sum;
    }
    if (hint == 'number') {
      return next.sum;
    }
    if (hint == 'string') {
      return String(next.sum);
    }
    return true;
  }
    
  return next;
}