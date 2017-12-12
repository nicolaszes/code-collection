#### 数据类型
* 6种数据类型
	+ 弱类型特性
	+ 原始类型
		- Number
		- String
		- Boolean
		- Null
		- Undefined
	+ 复杂类型
		- Object( Function, Array, Date, RegExp...)
* 隐式转换
	+ num - 0 // 转换为数字
	+ num + '' //转换为字符串

* js包装对象
	+ 

* 类型检测
	+ typeof 适合基本类型判断
	+ instanceof 适合内置对象和基元类型 
		- 原型链上判断
		- 不同 window和 iframe之间不可使用
	+ Object.prototype.toString.apply([]) === '[Object, Array]';
		- IE6/7/8 下失效
	+ constructor
	+ duck type // 特征判断


#### 表达式和运算符
+ 表达式
	- 函数表达式
	- 属性访问表达式
+ 运算符
	- 
#### 语句
* 函数，switch，和循环语句
	+ with: 
		- 让 js引擎优化更加困难
		- 可读性差
		- 可被变量定义取代
		- 严格模式下禁用
* 严格模式
	+ 
	```
	'use strict';
	function() {
		a = 1; //会报错
	}
	!function() { // !可以让解释器理解为函数表达式
		a = 1; //会报错
	}();
	```

	+ arguments 参数

* 正则表达式
	+