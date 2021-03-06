#HTML
####1.浏览器的内核分别有哪些?
- IE：trident 内核；
- Firefox：gecko 内核；
- Safari：webkit 内核；
- Opera：以前是 presto 内核，现在是 Blink 内核；
- chrome：Blink（基于webkit，Google 和 Opera 共同开发）；

####2.!doctype 的作用
* <!DOCTYPE> 位于文档最前面的位置，处于 <html> 之前，此标签可告知浏览器文档使用哪种 HTML／XHTML 规范
* 重点：告诉浏览器以何种规范解析页面

####3.div + css 的布局较 table 布局有什么优点？
+ 改版的时候更方便，只需要 css 文件；
+ 页面加载速度更快，结构化清晰，页面显示简洁；
+ 表现与结构相分离；
+ 易于优化（SEO）搜索引擎更友好，排名更为靠前；

####4.img 的 alt 与 title 有什么区别？
+ alt：为不能显示图像，窗体或 applets 的用户代理（UA），alt 属性用来指定替换文字。替换文字的语言由lang 属性指定。(在IE浏览器下会在没有title时把alt当成 tool tip显示)
+ title（tool tip）：为设置该属性的元素提供建议性的信息。

####5.strong 和 em 的区别
+ strong：粗体强调标签，强调，表示内容的重要性
+ em：斜体强调标签，更强烈强调，表示内容的强调点

####6.优雅降级和渐进增强
+ 渐进增强 progressive enhancement：针对低版本浏览器进行构建页面，保证最基本功能，然后再针对高级浏览器进行效果，交互等改进和追加功能达到更好的用户体验
+ 优雅降级 graceful degradation：一开始就构建完整的功能，然后在针对低版本浏览器进行兼容
+ 区别：
	- 优雅降级（功能衰减）：从复杂的现状开始，并试图减少用户体验的供给。
	- 渐进增强（功能递增）：从一个非常基础，能够起作用的版本开始，并不断扩充，以适应未来环境的需要。

+ 渐进增强的观点：
	- 内容是我们建立网站的诱因
	- 更为“合理”的设计范例
+ 优雅降级的观点：
	- 针对那些最高级，最完善的浏览器来设计网站
	- 被认为“过时”或有功能缺失的浏览器下的测试工作安排在开发的最后阶段
	- 并把测试对象限定为主流浏览器如（IE、Mozilla 等）的前一个版本

####7.网页标准和标准制定机构重要性的理解
+ 让 web 发展的更健康，开发者遵循统一的标准，降低开发难度，开发成本，SEO 也更好做
+ 不会因为滥用代码导致各种 bug，安全问题，提高网站易用性

####8.Cookie，sessionStorage 和 LocalStorage
+ Cookie：
	- 大小受限
	- 每次请求新页面的时候，Cookie都会被发送出去，浪费了宽带
	- 需要指定作用域，不可跨域调用
	- cookie需要前端开发者自己封装setCookie，getCookie
	- 与服务器进行交互，作为HTTP规范的一部分而存在
+ webStorage：	
	+ sessionStorage：
		- 仅仅是会话级别的存储，本地存储一个会话（session）中的数据
		- 数据只有在同一个会话的页面才能访问，并且会话结束后数据也随之销毁
	+ LocalStorage：
		- 持久化的本地存储
		- 除非主动删除，否则永远不会过期
	+ 概念和cookie相似，区别是它是为了更大容量存储设计的
	+ Web Storage拥有setItem,getItem,removeItem,clear等方法

####9.简述 src 和 href 的区别
+ src（source）：
	- 替换当前元素
	- source 的缩写，指向外部资源的位置，请求 src 资源时会将其指向资源下载并应用到文档内，例如js脚本，img图片和frame等元素
	- `<script src ="js.js"></script>`,当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载，编译，执行完毕，图片和框架元素也是如此。类似于将所指向资源嵌入当前标签内。这也是为什么将js脚本放在底部而不是顶部

+ href（Hypertext Reference）：
	- 当前文档和引用资源之间的联系
	- 指向网络资源所在的位置，建立当前元素（锚点）或当前文档（链接）之间的链接
	- `<link href="common.css" rel="stylesheet"/>`，浏览器会识别该文档为 css 文件，就会*并行*下载资源，并且不会停止对当前文档的处理。这就是为什么建议使用 link 方法来加载 css，而不是使用 @import

####10.网络制作会用到的图片格式
* png-8，png-24，jpeg，gif，svg
* 最想听到的：
	+ Webp：
		- 谷歌开发的，旨在加快图片加载速度的图片格式
		- 图片压缩体积约只有 Jpeg 的2/3，在质量相同的情况下，WebP格式图像的体积要比JPEG格式图像小40%
		- 节省大量的服务器带宽资源 和 数据空间

	+ Apng（Animated Portable Network Graphics）：
		- png 的位图动画扩展，实现 png 格式的动态图片效果

####11.什么是微格式？
* 微格式：
	+ 机器可读的语义化 XHTML 词汇的
	集合
	+ 机构化数据的开放标准
	+ 优点：智能数据添加到网络上，让网站内容在搜索引擎结果界面可以显示额外的提示

####12.css／js代码上线后，经常会优化性能，从用户刷新网页开始，1次 js 请求一般情况下会有哪些地方会有缓存处理？
+ dns 缓存
+ cdn 缓存
+ 浏览器缓存
+ 服务器缓存

####14.一个页面上有大量的图片（大型电商网站），加载很慢，你有哪些方法优化这些图片的加载，给用户更好的体验。
+ 图片懒加载：在页面未可视区域添加滚动条事件
+ 图片预加载技术：幻灯片，相册等，优先加载前一张和后一张
+ CSSsprite，SVGsprite，Iconfont，base64：图片为 Css 图片时可用
+ 缩略图：图片过大，可采用特殊编码的图片，加载时会先加载一张压缩的特别厉害的缩略图，以提高用户体验。
+ 服务端图片压缩：图片展示区域小于真实的图片大小

####15.HTML 结构的语义化
+ 去掉或者样式丢失时，页面呈现清晰的结构
+ 屏幕阅读器（如果访客有视力障碍）会完全根据你的标记来“读”你的网页
+ PAD，手机设备无法像普通电脑的浏览器一样来渲染网页（通常是因为这些设备对 css 的支持较弱）
+ 搜索引擎的爬虫也依赖于标记来确定上下文和各个关键字的权重
+ 利于爬虫理解，因为其很大程度上会忽略用于表现的标记，而只注重语义标记
+ 便于团队开发和维护

####16.HTML 全局属性有哪些？
+ `lang`：元素内容的语言
+ `class`：为元素设置类标识，多个类用空格分开
+ `id`：元素 id ，文档内唯一
+ `contenteditable`：指定元素的内容是否可编辑
+ `spellcheck`：拼写和语法检查
+ `style`：内联 css 样式
+ `data-*`：为元素增加自定义内容
+ `title`：元素相关的建议信息
+ `translate`：元素和子节点的内容是否需要本地化
+ `contextmenu`：自定义鼠标右键弹出菜单内容
+ `accesskey`：设置快捷键
+ `dir`：设置元素文本方向
+ `draggable`：设置元素是否可拖拽
+ `dropzone`：设置元素拖放类型，copy，move，link
+ `hidden`：文档元素是否显示，但仍然占据文档流
+ `tabindex`：设置获得元素的焦点，使用 tab

####17.常用的块级元素／内联元素／内联块状元素
+ 块级元素(display: block)
	- <div>, <p>, <h1 ··· h6>, <ol>, <ul>, <table>, <dl>, <address>, <form>
+ 内联元素(display: inline)
	- <a>, <span>, <br>, <i>, <em>, <strong>, <label>, <q>, <code>
+ 内联块状元素(display: inline-block)
	- <img>, <input>
