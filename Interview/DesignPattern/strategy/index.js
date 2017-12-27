/**
 * 策略模式
 * “复用在程序的任何地方，还能作为插件的形式，方便地被移植到其他项目中。”
 */
var calculateBonus = function( performanceLevel, salary ){
  if ( performanceLevel === 'S' ){
    return salary * 4;
  }
  if ( performanceLevel === 'A' ){
    return salary * 3;
  }
  if ( performanceLevel === 'B' ){
    return salary * 2;
  }
};

calculateBonus( 'B', 20000  );      // 输出：40000
calculateBonus( 'S', 6000 );      // 输出：24000”

/**
 * 策略模式重构
 */
var performanceS = function(){};
performanceS.prototype.calculate = function (salary) {
  return salary * 4;
};
var performanceA = function(){};
performanceA.prototype.calculate = function (salary) {
  return salary * 3;
};
var performanceB = function(){};
performanceB.prototype.calculate = function (salary) {
  return salary * 2;
};

var Bonus = function () {
  this.salary = null;
  this.strategy = null;
};

Bonus.prototype.setSalary = (salary) => {
  this.salary = salary;
};
Bonus.prototype.setStrategy = (strategy) => {
  this.strategy = strategy;
};
Bonus.prototype.getBonus = () => {
  // 把计算奖金的操作委托给对应的策略对象
  return this.strategy.calculate(this.salary)
}

var bonus = new Bonus();
bonus.setSalary( 10000 );
bonus.setStrategy( new performanceS() );  // 设置策略对象
console.log( bonus.getBonus() );    // 输出：40000
bonus.setStrategy( new performanceA() );  // 设置策略对象
console.log( bonus.getBonus() );    // 输出：30000

/**
 * js 版本的策略模式
 */
let strategies = {
  S: (salary) => salary * 4,
  A: (salary) => salary * 3,
  B: (salary) => salary * 2
};

let calculateBonus = (level, salary) => strategies[level](salary);
console.log(calculateBonus('S', 2000));
console.log(calculateBonus('A', 1000));

/**
 * 表单校验
 */
var strategies = {
  isNonEmpty: (value, errorMsg) => {    // 不为空
    if ( value === '' ){
      return errorMsg ;
    }
  },
  minLength: (value, length, errorMsg) => {    // 限制最小长度
    if ( value.length < length ){
      return errorMsg;
    }
  },
  isMobile: (value, errorMsg) => {    // 手机号码格式
    if ( !/(^1[3|5|8][0-9]{9}$)/.test( value ) ){
      return errorMsg;
    }
  }
};

var validataFunc = function () {
  var validator = new Validator(); //创建一个 validator对象
  /***************添加一些校验规则****************/
  validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空');
  validator.add( registerForm.password, 'minLength:6', '密码长度不能少于6位' );
  validator.add( registerForm.phoneNumber, 'isMobile', '手机号码格式不正确' );

  var errorMsg = validator.start();    // 获得校验结果
  return errorMsg;  // 返回校验结果”
}

var registerForm = document.getElementById( 'registerForm' );
registerForm.onsubmit = function () {
  var errorMsg = validataFunc();   // 如果errorMsg有确切的返回值，说明未通过校验
  if ( errorMsg ){
    alert ( errorMsg );
    return false;    // 阻止表单提交
  }
};

var Validator = function () {
  this.cache = [];
}

Validator.prototype.add = function (dom, rule, errorMsg) {
  var ary = rule.split( ':' );    // 把strategy和参数分开
  this.cache.push(function () {  // 把校验的步骤用空函数包装起来，并且放入cache
    var strategy = ary.shift();     // 用户挑选的strategy
    ary.unshift( dom.value );    // 把input的value添加进参数列表
    ary.push( errorMsg );    // 把errorMsg添加进参数列表
    return strategies[ strategy ].apply( dom, ary );
  });
};

Validator.prototype.start = function(){
  for ( var i = 0, validatorFunc; validatorFunc = this.cache[ i++ ]; ){
    var msg = validatorFunc();    // 开始校验，并取得校验后的返回信息
    if ( msg ){     // 如果有确切的返回值，说明校验没有通过
      return msg;
    }
  }
};

/**
 * 给某个文本输入框添加多种校验规则
 */
Validator.prototype.add = function( dom, rules ){
  var self = this;
  for ( var i = 0, rule; rule = rules[ i++ ]; ){
    (function( rule ){
      var strategyAry = rule.strategy.split( ':' );
      var errorMsg = rule.errorMsg;

      self.cache.push(function () {
        var strategy = strategyAry.shift();
        strategyAry.unshift( dom.value );
        strategyAry.push( errorMsg );
        return strategies[ strategy ].apply( dom, strategyAry );
      });
    })( rule )
  }
};
