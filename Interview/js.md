###二. JavaScript
####1.优化代码，提高可读性
Promise优化回调函数
```
var promise = new Promise(function(resolve, reject) {
  function async_add (m, n) {   
    resolve(setTimeout(m+n, 500));
  }
});

promise.then(function(1, 2) {
  console.log(res);
});
```

####2.优化代码，达到预期输出
```
for (var i = 1; i <= 10; i++) {
    setTimeout((() => console.log(i))(i))
}
```
####3.请给出运行结果，并解释为什么
```
class Animal {
  constructor(pos) {
    this.pos = pos;
  }
}

class Whale extends Animal {
  constructor(pos) {
    super(pos + 1);
  }
  swim() {
    this.pos <<= 1;
    setTimeout(function timer() {
      this.pos <<= 1;
      this.pos < 8 && setTimeout(timer, 0);
      console.log(this.pos);
    }, 0);
    console.log(this.pos);
  }
}

var pos = 1;
const whale = new Whale(pos);
whale.swim();
```

1）显示结果4 ，2、4、8；
2）
    class方法定义了一个Animal，默认this.pos = pos;
    class方法定义了一个Whale，通过extends实现继承Animal的所有属性;
    const方法创建了一个whale()构造函数，使其继承了Whale的属性;

    传入全局变量pos = 1;
    调用whale.swim()方法，就相当于调用了Whale的swim()方法，
    super(pos + 1)方法使得pos = pos + 1 = 2，
    swim()方法里this.pos 向上查找Animal里有，于是this.pos = pos;
    this.pos << 1;即this.pos * 2^1 = 4;

    先调用执行console.log(this.pos) = 4;

    setTimeout()延迟一段时间，再进行内部操作: 

    setTimeout()里调用函数timer(), 函数timer()里设置了定时器setTimeout();
    而在第一层定时器里面this.pos = pos = 1; this.pos <<= 1;即this.pos = this.pos * 2^1 = 2,输出console.log(this.pos);判断this.pos < 8 && setTimeout(timer, 0)，符合条件，循环继续;
    循环this <<= 1;即this.pos = this.pos * 2^1 = 4;输出console.log(this.pos) = 4,判断this.pos < 8 && setTimeout(timer, 0)，符合条件，循环继续;
    循环this <<= 1;即this.pos = this.pos * 2^1 = 8;输出console.log(this.pos) = 8,判断this.pos < 8 && setTimeout(timer, 0)，符合条件，循环停止;
    函数停止;
###三. 开放性问题
###1.HTTPS 是安全的，那么
####1）保证了谁的安全？
超文本传输安全协议(HTTPS)是超文本传输协议和SSL/TLS的组合，保证了信息数据传递过程中的安全。
####2）适用哪些场景？
https应该用于任何场景！
针对：
（1）钓鱼网站？网站背后的公司是否可信？DNS劫持？DNS污染？
（2）运营商如果耍流氓搞http劫持你能怎么办？嵌入广告，或者整个拦截掉，甚至A公司的产品给你重定向到B公司页面。
####3）是否天衣无缝？如果不是，请提供一个场景和前提条件来攻破HTTPS。
#####中间人攻击
开发中难免遇到http抓包的需求，有时遇到https的请求，一般抓包方式就没法正确截获数据了。不过通过伪造证书，https的包也是可以抓的，参见iOS抓包利器Charles 。难道https如此脆弱？既然https能轻易被抓包，还要来干啥？
先看下原理，首先charles伪装成服务端和客户端通信，并同时伪装成客户端与服务器通信，充当中间角色，从而截获数据，如图：

![https](https.png)

这种方式起效的前提是代码关闭了证书验证：AFNetWorking中的allowInvalidCertificates，所以release时记得打开证书验证，这样伪造的证书就不被接受了。

好了，看起来安全了？等等，allowInvalidCertificates只是实现了拒绝不受信任的证书，注意，重点是信任，如果证书是受到信任的呢？虽然可能性有点小，不过假设有一个攻击者手上拥有一个受信任的证书，首先iPhone信任的证书包括一些预装的证书iOS 8 中可用的受信任根证书的列表，和用户自己安装的证书。那么即使开启了证书allowInvalidCertificates，中间人攻击依然能够发生。这时候就需要开启SSL Ping Mode了

AFNetWorking里通过AFURLConnectionOperationSSLPinningMode设置
原理是把证书打包或者公钥打包在APP中，在NSURLConnectionDelegate协议中的connection:willSendRequestForAuthenticationChallenge:中检测证书是否没被篡改。
到此为止，用户的信息基本能保证安全了，但是还是不提倡对接口做签名算法等处理，加大攻击者对接口的攻击难度，下面继续聊。

浏览器访问的安全
好，以上方法加工做的APP在公共WIFI下传输足够保证用户数据传输的安全了，那么非APP呢，例如浏览器会如何？
其实浏览器和APP差不多，也有类似的证书验证功能，例如我们访问 https://www.12306.com
会发现如图提示：

![https](https-2.png)

同样访问百度会是这样：

注意地址栏的锁头的颜色，这个很关键！关键！关键！重要的话说三遍，哈哈

和iOS一样，如果wifi要进行https中间人攻击（截获数据），就得伪造证书，然后浏览器就会产生提醒，所以为了安全起见，公用wifi下面请勿访问证书有问题的网站。特别是金钱敏感网站，例如支付宝，银行等。

你又会问，为啥我在家访问 https://www.12306.com 也是红色的？这就得说下证书的问题了，因为12306使用的CA证书是一个叫SRCA的，这个CA浏览器不信任。
具体又得说到浏览器验证网站证书有效性的过程了

引用知乎另一问题的答案：
第一步：Trusted CA向vendor厂商提供CA根证书。
第二步：Trusted CA给site提供站证书。
第三步：vendor厂商的浏览器在用https访问的时候会检查站证书的合法性。

chrome不信任SRCA，所以就锁就红了，

![https](https-3.png)

一句话总结是，绿色的基本可以安全访问，红色的建议留点心。

###2.你最喜欢的框架／语言
####1）是什么？为什么？
（1）React.js
（2）
######React速度很快
与其它框架相比，React采取了一种特立独行的操作DOM的方式。
它并不直接对DOM进行操作。
它引入了一个叫做虚拟DOM的概念，安插在JavaScript逻辑和实际的DOM之间。
这一概念提高了Web性能。在UI渲染过程中，React通过在虚拟DOM中的微操作来实对现实际DOM的局部更新。
######跨浏览器兼容
虚拟DOM帮助我们解决了跨浏览器问题，它为我们提供了标准化的API，甚至在IE8中都是没问题的。
######模块化
为你程序编写独立的模块化UI组件，这样当某个或某些组件出现问题是，可以方便地进行隔离。
每个组件都可以进行独立的开发和测试，并且它们可以引入其它组件。这等同于提高了代码的可维护性。
######结构清晰
因为 react 本身就是组件化的，所以整个页面按结构被分为几个组件，每个组件自己管理自己的展示和行为，最后通过容器组合起来，结构非常清晰。
组件的状态都是通过 state 或者 props 来控制，而我认为大多数组件只需要 props 就行了，只在顶层组件上控制 state，这样可以更加清晰的管理 state。
######易于维护
因为结构清晰，所以可以预想到，这样是易于维护的。比如头部要改结构和样式，那就只改 Hearker.js 和对应 _Header.scss 就行了，或者要改逻辑，那只要修改 Hearker.js 中和 props 或者 state 相关的代码就行了，不用像以前那样在整个页面的逻辑里面去找这块的代码。
######省去了模版引擎
因为 react 可以说是自带了模版引擎，类似的 jade 或者 ejs 之类的模版引擎也就不需要了，类似这样拿到数据直接渲染就行了。
######单向数据流让事情一目了然
Flux是一个用于在JavaScript应用中创建单向数据层的架构，它随着React视图库的开发而被Facebook概念化。它只是一个概念，而非特定工具的实现。它可以被其它框架吸纳。例如，Alex Rattray有一个很好的Flux实例，在React中使用了Backbone的集合和模型。
######纯粹的JavaScript
现代Web应用程序与传统的Web应用有着不同的工作方式。
例如，视图层的更新需要通过用户交互而不需要请求服务器。因此视图和控制器非常依赖彼此。
许多框架使用Handlebars或Mustache等模板引擎来处理视图层。但React相信视图和控制器应该相互依存在一起而不是使用第三方模板引擎，而且，最重要的是，它是纯粹的JavaScript程序。
######同构的JavaScript
单页面JS应用程序的最大缺陷在于对搜索引擎的索引有很大限制。React对此有了解决方案。
React可以在服务器上预渲染应用再发送到客户端。它可以从预渲染的静态内容中恢复一样的记录到动态应用程序中。
因为搜索引擎的爬虫程序依赖的是服务端响应而不是JavaScript的执行，预渲染你的应用有助于搜索引擎优化。
######React与其它框架/库兼容性好
比如使用RequireJS来加载和打包，而Browserify和Webpack适用于构建大型应用。它们使得那些艰难的任务不再让人望而生畏。
####2）如果允许你为它添加一项特性，你希望是什么？为什么？
（1）
（2）并不是一个完整的框架，基本都需要加上ReactRouter和Redux才能写大型应用；
####3）如果允许你从中删除一项特性，你希望是什么？为什么？
（1）
（2）

####3.你做过的最酷炫或倾注最多心血的项目是什么？向我们介绍一下
自己的个人网站nicolaszs.com
这是我自己的个人网站：
（1）涵盖了我学习前端过程中的一些项目，一些我个人在校学习期间做的课程设计、旅行照片以及我个人收集的一些网站；
（2）它是我前端学习的试验田，可以让我了解整个网站架设的粗略流程：从产品原型——>UI设计——>静态页面——>页面交互——>前后端数据交互——>网站性能优化等...；
（3）我可以一点一点的慢慢实现网站设计以及细节交互设计；

###4.你拥有怎样的性格？喜欢什么业余活动？期望加入怎样的团队？
####1）性格方面：
（1）做事踏实负责任，
（2）善于沟通交流；
（3）乐于接受和学习新事物；
（4）易于相处，可以逗逼，可以闷骚；
（5）喜欢整理东西
####2）业余活动
（1）读书（钟爱小说）；
（2）聊球，看球（各类球类运动都可以看），会打篮球；
（3）看电影（豆瓣观影800部，钟爱科幻片）；
（4）徒步闲逛（四处溜达）；
（5）整理东西
####3）期望加入的团队
（1）因为是前端新人，希望最好能找到一个人带；
（2）团队组成完善；
（3）UI设计师做出的东西至少不比我自己做的差；
（4）可以团队内转换角色；
（5）最好定期有技术交流和培训；
（6）五险一金是必须的
###5.有什么想对我们说的？
（1）感谢贵公司给我这次机会;
（2）希望贵公司能够指出我题目答案的不足之处（js题目最好能给出最优答案，谢谢）;
（3）希望贵公司能够介绍目前团队的构成;
（4）