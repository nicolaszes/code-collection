#JAVASCRIPT
####1.JS的数据类型
+ 基本数据类型：Boolean，String，Number，Undefined，Null，
+ 引用数据类型：Object（Array，Date，RegExp，Function）

####2.判断数组数据类型
* 方法一：判断其是否具有“数组性质”，如slice()，可自己给该变量定义slice()方法，故有时会失效；
* 方法二：object instanceof Array，某些 IE 版本中不正确；
* 方法三：前面的均有漏洞，ES5 中定义了新方法 Array.isArray()，保证其兼容性，最好的方法如下：
```
if(typeof Array.isArray == "undefined") {
	Array.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === "[Object Array]"
	};
}
```

####3.获取页面所有 checkbox 
```
let domList = document.getElementByTagName('input');
let checkBoxList = [];
let len = domList.length; //缓存到局部变量
while (len--) { // 使用 while 的效率比 for 循环要高
	if (domList[len].type == 'checkbox') {
		checkBoxList.push(domList[len]);
	}
}
```

####4.DOM 被点击时，执行一个函数，应该如何操作
- 直接在 DOM 中被绑定事件：`<div onclick=test()></div>`;
- JS 通过 onclick 绑定：`xxx.onclick = test`;
- 通过事件添加绑定：`addEventListener(xxx, 'click', test)`;

####5.JS 的事件流模型
* “事件冒泡”：事件开始由最具体的元素接受，然后逐级向上传播；
* “事件捕获“：事件由最不具体的元素接收，然后逐级向下，一直到最具体的；
* “DOM 事件流“：三个阶段 —— 事件捕获，目标阶段，事件冒泡；

####6.Ajax 和 JSON 的优缺点
+ Ajax 是异步 javascript 和 XML，用于 web 中实现异步数据交互；
+ 优点：
	- 使得页面不重载全部页面的情况下，加载局部内容，降低数据传输量；
	- 避免用户不断刷新和跳转页面，提高用户体验

+ 缺点：
	- 对搜索引擎不友好；
	- 要实现 Ajax 下的前后退功能成本较大；
	- 可能造成请求数的增加；
	- 跨域问题限制；

+ JSON 是一种轻量级的数据交换格式，ECMA 的一个子集；
+ 优点：
	- 轻量，易于人的阅读和编写；
	- 便于机器解析；
	- 支持复合数据类型（数组，对象，字符串，数字）；

####7.看下列代码输出为何？
```
var a = null;
alert(typeof a);
```
Object, Null 表示一个空指针对象；

####8.看下列代码输出为何？
```
var undefined;
undefined == null; // true;
1 == true; // true;
2 == true; // false;
0 == false; // true;
0 == ''; // true;
NaN == NaN; // false;
[] == false; // true;
[] == ![] // true;
```
+ undefiend 与 null 相等，但是不恒等；
+ 一个是 Number，一个是 String，尝试将 String 转换为 Number；
+ 将 Boolean 转化为 Number，0 或 1；
+ 尝试将 Object 转换为 Number 或 String，取决于另一个对比量的类型；
+ *所以，对于0，空字符串的判断，建议使用‘===’；// 会先判断两边的值的类型；

####9.看代码给答案
```
var a = new Object();
a.value = 1;
b = a;
b.value = 2;
alert(a.value);
```
输出：2；

####10.已知数组var stringArray = [“This”, “is”, “Baidu”, “Campus”]，Alert出”This is Baidu Campus”。
```
alert(stringArray.join(' '));
```
那么问题来了，已知有字符串foo="get-element-by-id",写一个function将其转化成驼峰表示法"getElementById"。
```
function combo(foo) {
	let arr = msg.split('-');

	for (var i = 0; i < arr.length; i++) { // 现代浏览器已经提高了for循环效率
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substr(1,arr[i].length-1);
	}
	msg = arr.join('');
	return msg;
}
```

####11.var numberArray = [3,6,2,4,1,5]; 
- 1).实现对该数组的倒排，输出[5,1,4,2,6,3];
- 2) 实现对该数组的降序排列，输出[6,5,4,3,2,1];
```
let numberArray = [3,6,2,4,1,5];
numberArray.reverse();
numberArray.sort(function(a, b) {
	return b - a;
})
```

####12.输出今天的日期，以YYYY-MM-DD的方式
```
let d = new Date();
let year = d.getFullYear();
let month = d.getMonth() + 1;
month = month < 10 ? '0' + month: month;
let day = d.getDay();
day = day < 10 ? '0' + day: day;
console.log(`${year}-${month}-${day}`)
```

####13.用js实现随机选取10--100之间的10个数字，存入一个数组，并排序
```
let iArray = [];
function getRandom(iStart, iEnd) {
	let iChoice = iEnd - iStart + 1;
	return Math.floor(Math.random() * iChoice + iStart);
}
for(var i = 0; i < 10; i++) {
	iArray.push(getRandom(10, 100));
}
iArray.sort(function(a,b){
   		return a-b;
	}
);
```

####14.怎样添加、移除、移动、复制、创建和查找节点（原生JS，实在基础，没细写每一步
- 1)创建新节点
	+ createDocumentFragment() // 创建一个 DOM 片段
	+ createElement() // 创建一个具体的节点
	+ createTextNode() //创建一个文本节点

- 2）添加，移除，替换，插入
	+ appendChild() // 添加
	+ removeChild() // 移除
	+ replaceChild() // 替换
	+ insertBefore() // 插入

- 3）查找
	+ getElementByTagName() // 通过标签名称
	+ getElementByClassname() // 通过元素类的属性值
	+ getElementById() // 通过元素 ID，唯一性

####15.有这样一个URL：item.taobao.com/item.htm?a=1&b=2&c=&d=xxx&e，请写一段JS程序提取URL中的各个GET参数(参数名和参数个数不确定)，将其按key-value形式返回到一个json结构中，如{a:'1', b:'2', c:'', d:'xxx', e:undefined}。
```
function serilizeUrl(url) {
	let result = {};
	url = url.splite('?')[1];
	let map = url.split('&');
	for (var i = 0; i < map.length; i++) {
		result[map[i].split('=')[0]] = map[i].split("=")[1];
	}
	return result;
}
```

####16.看下面代码，给出输出结果
```
for(var i=1;i<=3;i++){
  	setTimeout(function(){
    	console.log(i);   
  	}, 0); 
};
```
答案：4 4 4。
```
for(var i=1;i<=3;i++){
    setTimeout((function(a){  //改成立即执行函数
        console.log(a);   
    })(i),0); 
}; // 1 2 3
```

####17.写一个function，清除字符串前后的空格。（兼容所有浏览器）
* 使用自带接口trim()，考虑兼容性：
```
if (!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^\s+/, "").replace(/\s+$/,"");
	}
}
 
// test the function
var str = " \t\n test string ".trim();
alert(str == "test string"); // alerts "true"
```

####18.作用域
```
(fucntion() {
	var a = b = 5;
})()

console.log(b); // 5
```

```
(function() {
	'use strict'
	var a = window.b = 5;
})

console.log(b); // Uncaught ReferenceError: b is not defined
```

####19.创建内置方法
```
console.log('hello'.repeatify(3));
```

可行的方法 - *Javascript的继承及原型属性的知识*
```
String.prototype.repeatify = String.prototype.repeatify || function(times) {
	var str = '';
	for(var i = 0; i < times; i++) {
		str += this;
	}
	return str;
}
```

####20.声明提前
```
function test() {
	console.log(a);
	console.log(foo());

	var a = 1;

	function foo() {
		return a;
	}
}
test(); // undefiend 2
```
上面的代码相当于
```
function test() {
	var a;

	function foo() {
		return a;
	}

	console.log(a);
	console.log(foo());

	a = 1;
}
test();
```
变量和函数的声明都被提前至函数体的顶部

####21.Javascript 中的 this
```
var fullname = 'John Doe';
var obj = {
	fullname: 'Colin Ihrig',
	prop: {
		fullname: 'Aurelio De Rosa',
		getFullName: function() {
			return this.fullname;
		}

	}
}

console.log(obj.prop.getFullName());

var test = obj.prop.getFullName;
console.log(test()); // Aurelio De Rosa 和 John Doe
```

+ this 的理解取决于函数如何被调用：
	- 第一个 getFullName() => obj.prop;
	- 第二个 getFullName() => window;

+ 若想让第二个打印出 Aurelio De Rosa：强制转换上下文环境
	- call(): `console.log(test.call(obj.prop))`;
	- apply(): `console.log(test.apply(obj.prop))`;

####22.闭包
```
var nodes = document.getElementsByTagName('button');

for (var i = 0; i < nodes.length; i++) {
   nodes[i].addEventListener('click', function() {
      console.log('You clicked element #' + i);
   });
}
```

+ 解决方法 1):
```
var nodes = document.getElementsByTagName('button');
for (var i = 0; i < nodes.length; i++) {
   nodes[i].addEventListener('click', (function(i) {
      return function() {
         console.log('You clicked element #' + i);
      }
   })(i));
}
```

+ 解决方法 2):
```
function handlerWrapper(i) {
	return function() {
		console.log('You clicked element #' + i)
	}
}

var node = document.getElementByTagName('button');
for (var i = 0; i < node.length; i++) {
	node[i].addEventListener('click', handlerwrapper(i));
}
```

####23.数据类型
```
console.log(typeof null); // Object 指向一个空指针对象
console.log(typeof {}); // Object
console.log(typeof []); // Object
console.log(typeof undefined); // undefiend
```

####24.事件循环
```
function printing() {
	console.log(1);
	setTimeout(function() { console.log(2); }, 1000);
	setTimeout(function() { console.log(3); }, 0);
	console.log(4);
}

printing(); // 1 4 3 2
```

####25.判断质数
```
function isPrime(number) {
	// 判断数据类型是否为数字，是否为正数
	if(typeof number != Number || Number.isIntege(number)) {
		return false;
	}

	//判断是否小于2
	if(number < 2) {
		return false;
	}

	// 判断是否等于2，能否被2整除
	if(number === 2) {
		return true;
	} else if(number % 2 === 0) {
		return false;
	}

	// 判断能否开根号，能否被某个不等于 1的整除
	var squareRoot = Math.sqrt(number);
	for(var i = 3; i <= squareRoot; i += 2) {
		if(number % i === 0) {
			return false;
		}
	}

	return true;
}
```

####26.Array 的操作方法
+ 新建 Array: 
	- `let arr1 = new Array(1, 2, 3);`
	- `let arr2 = [1, 2, 3];`
	- `let arr3 = Array.of(1, 2, 3);`
		* 弥补构造函数Array()因为参数不同导致的不同行为。
		```
		Array(); // []
		Array(3); // [ , , ]
		Array(1, 2, 3); // [1, 2, 3]
		```

+ 数组检测
```
function checkArray(arr) {
	if(typeof Array.isArray) {
		return Array.isArray(arr);
	} else {
		return Object.prototype.toString.call(arr) == '[Object, Array]';
	}
}
```

+ 数组方法
	- 更改原数组
		* 添加项：push(), unshift() // 末尾，第一
		* 移除项：pop(), shift() // 末尾，第一
		* 排序：reverse(), sort() // 反转， 升序／降序
		* 
