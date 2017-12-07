#CSS
####1.DOM 设置 css样式的方式
+ 外部样式表：引入一个外部 css文件
+ 内部样式表：css代码放在 <head>标签内部
+ 内联样式：css样式直接定义在 HTML元素内部

####3.CSS 选择器有哪些？
+ **：通用选择器
+ X：元素选择器
+ #X：id选择器
+ .X：类选择器
+ X Y：后代选择器
+ X+Y：直接兄弟选择器
+ X>Y：子选择器
+ X~Y：兄弟选择器
+ :link, :visited, :focus, :hover ：链接状态
+ 属性选择器：
	- [attr]：选择所有设置了 attr属性的元素
	- [attr ~= value]：其中一个值刚好为 value
	- [attr |= value]：值刚好为 value或者 value-开头
	- [attr ^= value]：value 为开头
	- [attr $= value]：value 为结尾
	- [attr *= value]：包含 value
+ 伪元素：元素虚拟子元素（元素的最后一个字元素）
	- X:after：IE8+
	- X::after：IE9+
	- X::first-letter：块元素的第一行的第一个字母
	- X::firts-line：块元素的第一行
+ 结构性伪类选择器：
	* 兼容 IE7+：
		- X:first-child：第一个子元素
	* 兼容 IE9+：
		- X:nth-child(an+b)：前面有 an+b-1个兄弟节点的元素，n>=0
		- X:nth-last-child(an+b)：后面有 an+b-1个兄弟节点的元素，n>=0
		- X:nth-of-type(an+b)：前面有 an+b-1个相同标签兄弟的元素
		- X:nth-last-of-type(an+b)：后面有 an+b-1个相同标签兄弟的元素
		- X:last-child：最后一个元素
		- X:only-child：唯一子元素
		- X:only-of-type：没有相同类型的兄弟元素的子元素
		- x:first-of-type：此类型元素的第一个兄弟

+ 选择器的优先级算法：
	```
	switch() {
		case !important:
			大于其它规则;
		case 行内样式: 
			+1000;
		case ID选择器: 
			+100;
		case 类属性 || 属性 || 伪类: 
			+10;
		case 标签: 
			+1;
		case 通配符 || 结合符:
			+0;
	}

	if( 权值一样) {
		先后顺序，顺序靠后的覆盖靠前的规则；
	}

	if(高位的数字 = 高位的数字) {
		if(低位的数字 = 低位的数字) {
			比较
		}
	} else {
		不考虑低位
	}
	```

####4.display：block 和display：inline 的区别
+ display：block
	- `if(!width) { 自动填充满父容器 }`
	- `if(!height) { 扩展高度包含常规流中的子元素 }`
	- 常规流，处于前后元素位置之间
	- margin/padding
	- 忽略 vertical-align
+ display：inline
	- 水平方向上根据 direction依次布局
	- 元素前后不换行
	- float/position: absolute 转换成 block
	- vertical-align 无效
	- white-space
	- margin/padding 竖直方向无效
	- 非替换行内元素：
		* width/height 无效
		* line-height 决定行框高
	- 替换行内元素：
		* height，margin，padding，border决定行框高

####5.DOM元素不显示在浏览器可视范围内？
+ 基本：
	- display: none
	- visibility: hidden
+ 技巧：
	- width/height: 0
	- opacity: 0
	- z-index: -1000

####6.超链接访问过后hover样式就不出现的问题是什么？如何解决？
+ 被点击过后的超链接不再具有 hover 和 active 属性
+ 改变 CSS属性的排列顺序：L-V-H-A（link,visited,hover,active）

####7.什么是FOUC?如何避免

+ Flash Of Unstyled Content：用户定义样式表加载之前浏览器使用默认样式显示文档，用户样式加载渲染之后再从新显示文档，造成页面闪烁。
+ 解决方法：把样式表放到文档的head

####8.如何创建 BFC(块级格式化上下文)(block formatting context)
+ 创建规则
	- 根元素
	- float: 不为none；
	- position: abusolute/fixed;
	- display: inline-block/table-cell/table-caption/flex/inline-flex
	- overflow: 不是visible
+ 作用
	- 可以包含浮动元素
	- 不被浮动元素覆盖
	- 阻止父子元素的 margin重叠 

####9.specified value, computed value, used value计算方法
+ specified value
```
switch() {
	case 设置了值:
		use this;
	case 未设置，继承属性:
		从父元素继承;
	case 没设置，并且不是继承属性:
		css规范指定的初始值;
}
```
+ computed value

####10.如何居中一个 float元素？
+ 浮动的情况下添加margin: 0 auto; 是没有任何效果的
```

```

####11.

####12.Flex弹性布局
+ 容器属性：
	* flex-flow: <flex-direction> || <flex-wrap>;
		- flex-direction: column | column-reverse | row | row-reverse
		![flex-direction](./img/flex-direction.png)

		- flex-wrap: nowrap | wrap | wrap-reverse;
		![no-wrap](./img/no-wrap.png)
		![wrap](./img/wrap.png)
		![wrap-reverse](./img/wrap-reverse.png)

	* justify-content: flex-start | flex-end | center | space-between | space-around
	![justify-content](./img/justify-content.png)

	* align-items: flex-start | flex-end | center | baseline | stretch
	![align-items](./img/align-items.png)

	* align-content: flex-start | flex-end | center | stretch | space-between | space-around
	![align-content](./img/align-content.png)

+ 项目属性：
	- order | flex-grow | flex-shrink | flex-basis | flex | align-self

	* order: `<integer> 定义项目的排列顺序。数值越小，排列越靠前; /* default 0 */`
	![order](./img/order.png)

	* flex: ```
			flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
			该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
			flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
			```
		- flex-grow: `<number>; /* default 0 */`
		![flex-grow](./img/flex-grow.png)

		- flex-shrink: `flex-shrink: <number>; /* default 1 */;`
			- 如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
		![flex-shrink](./img/flex-shrink.png)

		* flex-basis: `定义了在分配多余空间之前，项目占据的主轴空间（main size）`

	* align-self: `auto | flex-start | flex-end | center | baseline | stretch;`
	align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
		![align-self](./img/align-self.png)