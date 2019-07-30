/**
 * 资源和部署的一些优化
 */

/**
 * DNS 预解析dns-prefetch
 * 请求这个域名下的文件时就不需要等待DNS查询了
 * 也就是说在浏览器请求资源时，DNS查询就已经准备好了
 * 该技术对使用第三方资源特别有用，比如jquery等
 */
```
<link rel="dns-prefetch"href="//example.com">
```
/**
 * 预连接 Preconnect
 * 与 DNS 的预解析类似，preconnect不仅完成 DNS 预解析
 * 同时还将进行 TCP 握手和建立传输协议
 * FireFox 39+ / Chrome 46+
 */
```
<link rel="preconnect" href="http://example.com">
```

/**
 * 预获取 Prefetching
 * 提前加载资源（未用到）
 * 首先要确定这个资源一定会在未来用到，然后提前加载，放入浏览器缓存中
 * 
 * 适用于优化webfonts的性能，但预获取还依赖于一些条件
 * 某些预获取可能会被浏览器忽略，例如从一个非常缓慢的网络中获取一个庞大的字体文件。
 * 并且，Firefox 只会在浏览器闲置时进行资源预获取。
 */
```
<link rel="prefetch" href="image.png">
```

/**
 * 优先级Subresource（chrome已经移除了该属性）
 * 指定的预获取资源具有最高的优先级，在所有 prefetch 项之前进行
 */
```
<link rel="subsource" href="styles.css">
```

/**
 * 预渲染 Prerender
 * 预先加载的资源文件，可以让浏览器提前加载指定页面的所有资源
 */
```
<link rel="prerender" href="http://example.com/index.html">
```

/**
 * 未来 Preload
 * Preload 建议允许始终预加载某些资源，不像prefetch有可能被浏览器忽略
 * 浏览器必须请求preload标记的资源
 */
```
<link rel="preload" href="http://example.com/image.png">
```