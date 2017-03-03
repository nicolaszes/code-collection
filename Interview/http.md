#HTTP
####1.HTTP method
+ 要与 HTTP1.1兼容，为资源实现 GET 和 HEAD 方法即可
+ GET：请求服务器发送某种资源
+ HEAD：与*GET*相似，但是响应中只返回首部，不返回主体内容
+ PUT：让服务器用请求的*主体部分*来创建一个由所请求的*URL*命名的*新文档*
+ POST：起初是用来向服务器输入数据，通常用来支持 HTML表单
+ TRACE：在目的的服务器端发起一个回环诊断，最后一个服务器会弹会一个 TRACE 响应，并在响应主体中携带它收到的原始请求报文，然后由服务器将其发送到要去的地方
+ OPTIONS：请求 Web 服务器告知其支持的各种功能
+ DELETE：请求服务器删除请求 URL 指定的资源

####2.从浏览器地址栏到显示页面的步骤（HTTP为例）
1. 浏览器地址栏输入 URL
2. 浏览器查看缓存，
```
if (未缓存) {
	发起新请求
} else {
	if(足够新鲜) {
		直接提供给客户端
	} else {
		与服务器进行验证
	}
}
```
+ 检验新鲜：
	- Expire：HTTP1.0 提供，值为一个绝对时间表示缓存新鲜日期
	- Cache-Control：HTTP1.1 新增，max-age，值为以秒为单位的最大新鲜时间
3. 浏览器解析 Url 获取协议，主机，端口，path
4. 浏览器组装一个 HTTP（GET）请求报文
5. 浏览器获取主机 IP 地址：
	- 浏览器查看缓存
	- 本机缓存
	- hosts 文件
	- 路由器缓存
	- ISP DNS 缓存
	- DNS 递归查询（可能存在负载均衡导致每次 IP 不一样）
6. 打开一个 socket 与目标 IP 地址，端口建立 *TCP* 连接，三次握手：
	- 客户端 => 服务器：*SYN=1，Seq=X* 的包
	- 服务器 => 客户端：*SYN=1，ACK=X+1，Seq=Y* 的响应包
	- 客户端 => 服务端：*ACK=Y+1*
7. TCP 链接建立后发送*HTTP请求*
8. 服务器接收请求并解析，将请求转发到服务程序，如虚拟主机使用 HTTP Host头部判断请求的服务程序
9. 服务器检查 HTTP 请求是否包含缓存验证信息，`if(新鲜) { 返回 304 等对应状态码}`
10. 读取完整请求并准备 HTTP 响应，可能需要查询数据库等操作
11. 服务器 => 浏览器：TCP链接的响应报文
12. 关闭 TCP 的四次握手：
	- 主动方：Fin=1，Ack=Z，Seq=X
	- 被动方：Ack=X+1，Seq=Z
	- 被动方：Fin=1，Ack=X，Seq=Y
	- 主动方：Ack=Y；Seq=X
13. 浏览器检查响应状态码：1XX，3XX，4XX，5XX，与 2XX处理不同
14. `if(资源可缓存) {进行缓存}`
15. 对响应进行解码（例如Gzip压缩）
16. 根据资源类型决定如何处理：
	+ 解析 HTML 文档
	+ 构建 DOM树：
		- Tokenizing：根据HTML规范将字符流解析为标记
		- Lexing：词法分析，标记 => 对象，并定义属性和规则
		- DOM construction：HTML标记 => 对象，将对象组成DOM树
	+ 下载：图片，样式，js文件
	+ 构建 CSSOM树：
		- Tokenizing：字符流 => 标记流
		- Node：根据标记创建节点
		- CSSOM：节点创建 CSSOM树
	+ 根据 DOM树和 CSSOM树构建渲染树
		- 从 DOM树的根节点遍历所有可见节点：
			* 不可见节点：script，meta
			* css隐藏节点：`display：none；`
		- 对每个可见节点，找到恰当的 CSSOM规则并应用
		- 发布可视节点的内容和计算样式
	+ js 解析：
		- 浏览器创建 Document对象并解析 HTML，将解析到的元素和文本节点添加到文档中，document.readystate 为loading
		- HTML解析器 
		```
		if(!async || defer) {
			遇到script => 添加到文档，执行行内或外部脚本
			同步执行，脚本下载和执行时解析器会暂停
		}
		```
		用document.write()把文本插入到输入流中
		- 同步脚本：
			* 简单定义函数 和 注册事件处理程序
			* 遍历和操作 script和他们之前的文档内容
		- 异步脚本：禁止使用 document.write()
		```
		if(async) {
			下载脚本，并继续解析文档
		}
		```
		- 文档解析完成，document.readState 变成 interactive
		- defer 脚本会按照文档出现的顺序执行，延迟脚本能访问完整的文档树，禁止使用 document.write()
		- 浏览器在 Document对象上触发 DocumentContentLoaded 事件
		- ```
		if(文档完全解析完成 && 图片完成载入 && 异步脚本完成载入和执行) {
			document.readState => compelete;
			window 触发 load 事件
		}
		```
17. 根据 HTML解析过程会逐渐显示页面

####3.HTTP request 报文结构
+ 首行：Request-Line { 请求方法，请求URI，协议版本，CRLF } //回车换行
+ 若干请求头：{ general-header, request-header/entity-header, 每一行以 CRLF结束}
+ 请求头和消息实体之间有一个 CRLF分割
+ 根据实际请求需要，包含一个消息实体
```
GET /projects.html HTTP/1.1
Host: www.nicolaszs.com
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Referer: http://www.nicolaszs.com/
Accept-Encoding: gzip, deflate, sdch
Accept-Language: zh-CN,zh;q=0.8,en;q=0.6
AlexaToolbar-ALX_NS_PH: AlexaToolbar/alx-4.0.1
If-None-Match: "a01faa-21c2-53b4be74978a6"
If-Modified-Since: Tue, 30 Aug 2016 15:47:52 GMT

name=qiu&age=25
```

####4.HTTP response 报文结构
+ 首行：HTTP版本，状态码，状态描述，CRLF
+ 若干行响应头：通用头部，响应头部，实体头部
+ 响应头部和响应实体之间用一个空的 CRLF空行分割
+ 可能的消息实体
```
Accept-Ranges: bytes
Content-Encoding: gzip
Content-Length: 3433
Content-Type: text/css
Date: Sun, 05 Feb 2017 03:32:39 GMT
ETag: "a01fab-379c-53b4be7555b27"
Last-Modified: Tue, 30 Aug 2016 15:47:53 GMT
Server: Apache
Vary: Accept-Encoding,User-Agent

{"name": "qiu", "age": 25}
```