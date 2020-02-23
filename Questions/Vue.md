# VUE

### 生命周期

<img src="https://cn.vuejs.org/images/lifecycle.png" alt="Vue 实例生命周期" style="zoom:40%;" />

##### 组件进来请求接口时你是放在哪个生命周期？为什么？

一般在created 因为在这个生命周期我们常用到的都已经初始化好了
如果涉及dom 那就mounted

##### 第一次加载页面时会触发哪几个钩子？

beforeCreate, created, beforeMount, mounted

##### vue生命周期总共有几个阶段？请描述下vue的生命周期是什么？

- `beforeCreate`：在 `new `一个 vue 实例后，只有一些默认的生命周期钩子和默认事件，其他的东西都还没创建。
- `created`：`data` 和 `methods` 都已经被初始化好了。（如果要调用 methods 中的方法，或者操作 data 中的数据，最早可以在这个阶段中操作）
- `beforeMount`：在内存中已经`编译好了模板`了，但是还`没有挂载`到页面中，此时，页面还是旧的。
- `mounted`：`Vue 实例已经初始化`完成了。此时组件脱离了创建阶段，进入到了运行阶段。 （如果我们想要通过插件操作页面上的 `DOM` 节点，最早可以在和这个阶段中进行）
- `beforeUpdate`：页面中的显示的数据还是旧的，`data` 中的数据是更新后的， 页面还没有和最新的数据保持同步。
- `updated`：页面显示的数据和 `data` 中的数据已经保持`同步`了，都是最新的。
- `activated`：keep-alive 组件激活时调用。
- `deactivated`：keep-alive 组件停用时调用。
- `beforeDestroy`：Vue 实例从运行阶段`进入到了销毁阶段`，这个时候上所有的 data 和 methods ， 指令， 过滤器 ……都是处于可用状态。还没有真正被销毁。
- `destroyed`：这个时候上所有的 data 和 methods ， 指令， 过滤器 ……都是处于不可用状态。组件`已经被销毁`了。

vue生命周期的作用是什么？

##### vue在created和mounted这两个生命周期中请求数据有什么区别呢？

看实际情况，一般在 created（或beforeRouter） 里面就可以，如果涉及到需要页面加载完成之后的话就用 mounted。

在created的时候，视图中的html并没有渲染出来，所以此时如果直接去操作html的dom节点，一定找不到相关的元素
而在mounted中，由于此时html已经渲染出来了，所以可以直接操作dom节点，（此时document.getelementById 即可生效了）。



跟keep-alive有关的生命周期是哪些？描述下这些生命周期

vue实例挂载的过程是什么？

DOM渲染在哪个周期中就已经完成了？

### 属性

##### 在vue项目中如果methods的方法用箭头函数定义结果会怎么样？

因为箭头函数默绑定父级作用域的上下文，所以不会绑定vue实例，所以 this 是undefind

### API

#### observable

作为最小化的跨组件状态存储器。

```jsx
// store.js
import Vue from 'vue';

export let store = Vue.observable({ count: 0, name: '张三' });
export let mutations = {
  setCount(count){
    store.count = count;
  },
  setName(name){
  	store.name = name;
  }
}
```

#### extend

说说你对vue的extend（构造器）的理解，它主要是用来做什么的？

#### component

这些组件是**全局注册的**。也就是说它们在注册之后可以用在任何新创建的 Vue 根实例 (`new Vue`) 的模板中。比如：

```vue
Vue.component('component-a', { /* ... */ })
Vue.component('component-b', { /* ... */ })
Vue.component('component-c', { /* ... */ })

new Vue({ el: '#app' })
```

```vue
<div id="app">
  <component-a></component-a>
  <component-b></component-b>
  <component-c></component-c>
</div>
```

在所有子组件中也是如此，也就是说这三个组件*在各自内部*也都可以相互使用。

#### filter

当全局过滤器和局部过滤器重名时，会采用局部过滤器。

```vue
const filterMoney = val => {
  return `￥${val}.00`;
};

Vue.filter("money", filterMoney);
```

```vue
new Vue({
  filters:{
    money(val){
      return `￥${val}.00`
    },
    // 过滤器的名称
    dataFmt: function(input){
    	return 'yyyy-mm-dd'
    }
  }
})
```

#### nextTick

##### $nextTick有什么作用？

处理数据动态变化后，dom还未及时更新的问题。nexttick就可以获取到数据更新后最新的dom变化

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

```vue
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})

// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick()
  .then(function () {
    // DOM 更新了
  })
```

##### 你知道nextTick的原理吗？

微任务与宏任务吧 ，完了根据浏览器的支持情况 promise setImmediate setTimeout 做退化

#### directive

说下你对指令的理解？

手写一个自定义指令及写出如何调用

写出你常用的指令有哪些？

说说你对v-clock和v-pre指令的理解

你有写过自定义指令吗？自定义指令的生命周期（钩子函数）有哪些？

#### delete

删除数组用delete和Vue.delete有什么区别？

#### mixin

说说你对vue的mixin的理解，有什么应用场景？

```vue
Vue.mixin({
  mounted: function() {
    console.log("myOption");
    var myOption = this.$options.myOption;
    if (myOption) {
      console.log(myOption);
    }
  }
});
```

#### version

提供字符串形式的 Vue 安装版本号。这对社区的插件和组件来说非常有用，你可以根据不同的版本号采取不同的策略。

```vue
var version = Number(Vue.version.split('.')[0])

if (version === 2) {
  // Vue v2.x.x
} else if (version === 1) {
  // Vue v1.x.x
} else {
  // Unsupported versions of Vue
}
```

### 数据

分别说说vue能监听到数组或对象变化的场景，还有哪些场景是监听不到的？无法监听时有什么解决方案？

说说你对Object.defineProperty的理解

什么是双向绑定？原理是什么？

vue组件之间的通信都有哪些？

vue父子组件双向绑定的方法有哪些？

说说你对单向数据流和双向数据流的理解

vue能监听到数组变化的方法有哪些？为什么这些方法能监听到呢？

#### data

##### vue中data的属性可以和methods中的方法同名吗？为什么？

不能同名 因为不管是计算属性还是data还是props 都会被挂载在vm实例上，因此 这三个都不能同名

##### vue中怎么重置data？

```js
Object.assign(this.$data, { msg: 123 })

// Avoid replacing instance root $data. Use nested data properties instead.
this.$data = {
  ...this.$options.data(),
  msg: '123'
}
```

##### 动态给vue的data添加一个新的属性时会发生什么？怎样解决？

```this.$set(this.data,”key”,value')```

##### 为什么data属性必须声明为返回一个初始数据对应的函数呢？

**一个组件的 `data` 选项必须是一个函数**，因此每个实例可以维护一份被返回对象的独立的拷贝：

```js
data: function () {
  return {
    count: 0
  }
}
```

####props

##### prop验证的type类型有哪几种？

`type`: 可以是下列原生构造函数中的一种：`String`、`Number`、`Boolean`、`Array`、`Object`、`Date`、`Function`、`Symbol`、任何自定义构造函数、或上述内容组成的数组。会检查一个 prop 是否是给定的类型，否则抛出警告。Prop 类型的[更多信息在此](https://cn.vuejs.org/v2/guide/components-props.html#Prop-类型)。

##### prop是怎么做验证的？可以设置默认值吗？

```vue
// 简单语法
Vue.component('props-demo-simple', {
  props: ['size', 'myMessage']
})

// 对象语法，提供验证
Vue.component('props-demo-advanced', {
  props: {
    // 检测类型
    height: Number,
    // 检测类型 + 其他验证
    age: {
      type: Number,
      default: 0,
      required: true,
      validator: function (value) {
        return value >= 0
      }
    }
  }
})
```

#### computed

##### 在使用计算属性的时，函数名和data数据源中的数据可以同名吗？

不能同名 因为不管是计算属性还是data还是props 都会被挂载在vm实例上，因此 这三个都不能同名

#### methods

#### watch

#####watch和计算属性有什么区别？

* 一个是侦听属性，一个是计算属性
* 一个是为了应对复杂的逻辑计算，一个是对数据的变化作出反应
* 一个是只有当缓存改变时才执行，一个是只要从新渲染就会执行
* 一个有缓存，一个没有缓存

```js
watch: {
  msg: {
    handler(newValue, oldValue) {
      console.log(newValue, oldValue);
    },
		deep: true, // 深度监听对象变化
    immediate: true // 监听开始之后立即被调用
  }
},
```

##### watch的属性用箭头函数定义结果会怎么样？

this 为 undefined

### DOM

#### el

#### template

##### 说说你对vue的template编译的理解？

组件化开发 复用性

##### vue怎么改变插入模板的分隔符？

delimiters: ['${', '}'] 

<template></template>有什么用？

#### render / renderError

##### 你有使用过render函数吗？有什么好处？

`render 函数` 跟 `template` 一样都是创建 html 模板的，但是有些场景中用 `template` 实现起来代码冗长繁琐而且有大量重复，这时候就可以用 `render 函数`。

```jsx
new Vue({
  render (h) {
    throw new Error('oops')
  },
  renderError (h, err) {
    return h('pre', { style: { color: 'red' }}, err.stack)
  }
}).$mount('#app')
```

### 指令

#### v-model

- v-bind:绑定响应式数据
- 触发 input 事件 并传递数据 (核心和重点)

#### v-on

v-on可以绑定多个方法吗？

```vue
<input type="text" :value="name" @input="onInput" @focus="onFocus" @blur="onBlur" />
```



在子组件中怎么访问到父组件的实例？



vue变量名如果以_、$开头的属性会发生什么问题？怎么访问到它们的值？

开头的属性会发生什么问题？怎么访问到它们的值？

vue的属性名称与method的方法名称一样时会发生什么问题？

##### vue2.0不再支持v-html中使用过滤器了怎么办？

在method中定义方法

```
htmlFilter(htmlString){
return htmlString.replace(/+s/g,'')
}
```

在vue中 `v-html="htmlFilter(htmlString)"`即可

#### v-show/if

##### v-show和v-if有什么区别？使用场景分别是什么？

* 手段：v-if是动态的向DOM树内添加或者删除DOM元素；v-show是通过设置DOM元素的display样式属性控制显隐；
* 编译过程：v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show只是简单的基于css切换；
* 编译条件：v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译（编译被缓存？编译被缓存后，然后再切换的时候进行局部卸载); v-show是在任何条件下（首次条件是否为真）都被编译，然后被缓存，而且DOM元素保留；
* 性能消耗：v-if有更高的切换消耗；v-show有更高的初始渲染消耗；

##### v-if 和 v-for的优先级是什么？如果这两个同时出现时，那应该怎么优化才能得到更好的性能？

注意我们**不**推荐在同一元素上使用 `v-if` 和 `v-for`。更多细节可查阅[风格指南](https://cn.vuejs.org/v2/style-guide/#避免-v-if-和-v-for-用在一起-必要)。

当它们处于同一节点，`v-for` 的优先级比 `v-if` 更高，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中。当你只想为*部分*项渲染节点时，这种优先级的机制会十分有用，如下：

```vue
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

上面的代码将只渲染未完成的 todo。

而如果你的目的是有条件地跳过循环的执行，那么可以将 `v-if` 置于外层元素 (或 [`](https://cn.vuejs.org/v2/guide/conditional.html#在-lt-template-gt-中配合-v-if-条件渲染一整组))上。如：

```vue
<ul v-if="todos.length">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
<p v-else>No todos left!</p>
```

#### v-once

v-once的使用场景有哪些？

只渲染元素和组件**一次**。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

```jsx
<!-- 单个元素 -->
<span v-once>This will never change: {{msg}}</span>
<!-- 有子元素 -->
<div v-once>
  <h1>comment</h1>
  <p>{{msg}}</p>
</div>
<!-- 组件 -->
<my-component v-once :comment="msg"></my-component>
<!-- `v-for` 指令-->
<ul>
  <li v-for="i in list" v-once>{{i}}</li>
</ul>
```

### Function

##### 怎么给vue定义全局的方法？

1. 通过prototype，这个非常方便。Vue.prototype[method]=method;

2. 通过插件Vue.use(plugin)；

3. 通过mixin，Vue.mixin(mixins);

4. ```js
   // 创建全局方法
   this.$root.$on('test', function(){
       console.log('test');
   })
   
   // 销毁全局方法
   this.$root.$off('test');
   
   // 调用全局方法
   this.$root.$emit('test');
   ```

### 组件

##### 怎么访问到子组件的实例或者子元素？

`this.$children/this.$refs.xxx`

vue在组件中引入插件的方法有哪些？

组件和插件有什么区别？

说说组件的命名规范

说说你对选项el,template,render的理解

写出多种定义组件模板的方法

为什么vue使用异步更新组件？

怎么缓存当前的组件？缓存后怎么更新？

vue怎么实现强制刷新组件？

如何在子组件中访问父组件的实例？

vue组件里的定时器要怎么销毁？

vue组件会在什么时候下被销毁？

说下你的vue项目的目录结构，如果是大型项目你该怎么划分结构和划分组件呢？

你有使用过动态组件吗？说说你对它的理解

说说你对vue组件的设计原则的理解

组件中写name选项有什么作用？

你有写过自定义组件吗？

vue为什么要求组件模板只能有一个根元素？

在组件中怎么访问到根实例？

vue如果想扩展某个现有的组件时，怎么做呢？

vue中什么是递归组件？举个例子说明下？

#### keep-alive

##### 怎么缓存当前打开的路由组件，缓存后想更新当前组件怎么办呢？

可以在路由meta中加入参数, 对打开的路由进行keep-alive的判断, 通过钩子active等

##### 说说你对keep-alive的理解是什么？

keep-alive是Vue提供的一个抽象组件，用来对组件进行缓存，从而节省性能，由于是一个抽象组件，所以在页面渲染完毕后不会被渲染成一个DOM元素

####函数式组件

#### HOC

你了解什么是高阶组件吗？可否举个例子说明下？

#### Slot

说说你对slot的理解有多少？slot使用场景有哪些？

怎么在vue中使用插件？

### 架构

你知道vue的模板语法用的是哪个web模板引擎的吗？说说你对这模板引擎的理解

#### SPA

SPA单页面的实现方式有哪些？

说说你对SPA单页面的理解，它的优缺点分别是什么？

#### Diff

你了解vue的diff算法吗？

#### VDOM

什么是虚拟DOM？

如何实现一个虚拟DOM？说说你的思路

#### Error

- errorHandler

```js
Vue.config.errorHandler = function(err, vm, info) {
  console.log(`Error: ${err.toString()}\nInfo: ${info}`);
}
```

- warnHandler

```js
Vue.config.warnHandler = function(msg, vm, trace) {
  console.log(`Warn: ${msg}\nTrace: ${trace}`);
}
```

- renderError

```js
const app = new Vue({
  el:'#app',
  renderError (h, err) {
    return h('pre', { style: { color: 'red' }}, err.stack)
  }
})
```

- errorCaptured

```js
Vue.component('cat', {
  template:`
    <div>
			<h1>Cat: </h1>
      <slot></slot>
    </div>
	`,
  props:{
    name:{
      required:true,
      type:String
    }
  },
  errorCaptured(err,vm,info) {
    console.log(`cat EC: ${err.toString()}\ninfo: ${info}`); 
    return false;
  }
});

Vue.component('kitten', {
  template: '<div><h1>Kitten: {{ dontexist() }}</h1></div>',
  props:{
    name:{
      required: true,
      type: String
    }
  }
});
```

- window.onerror (不仅仅针对Vue)

```js
window.onerror = function(message, source, line, column, error) {}
```



怎么捕获组件vue的错误信息？

vue边界情况有哪些？

说说你对vue的错误处理的了解？

#### is

有的时候，在不同组件之间进行动态切换是非常有用的，比如在一个多标签的界面里

```vue
<component
    v-bind:is="currentTabComponent"
    class="tab"
></component>
```

解决dom结构中对放入html的元素有限制的问题

有些 HTML 元素，诸如 ``、``、`` 和 ``，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 ``、 和 ``，只能出现在其它某些特定的元素内部。

这会导致我们使用这些有约束条件的元素时遇到一些问题。例如：

```vue
<table>
  <blog-post-row></blog-post-row>
</table>
```

这个自定义组件 `` 会被作为无效的内容提升到外部，并导致最终渲染结果出错。幸好这个特殊的 `is` 特性给了我们一个变通的办法：

```vue
<table>
  <tr is="blog-post-row"></tr>
</table>
```

需要注意的是**如果我们从以下来源使用模板的话，这条限制是\*不存在\*的**：

- 字符串 (例如：`template: '...'`)
- [单文件组件 (`.vue`)](https://cn.vuejs.org/v2/guide/single-file-components.html)
- [``](https://cn.vuejs.org/v2/guide/components-edge-cases.html#X-Templates)

vue的is这个特性你有用过吗？主要用在哪些方面？

#### Key

diff时更快更准确找到变化的位置。

### Event

vue给组件绑定自定义事件无效怎么解决？

vue如何监听键盘事件？

vue中是如何使用event对象的？

在vue事件中传入 `$event，使用e.target和e.currentTarget有什么区别？`

vue自定义事件中父组件怎么接收子组件的多个参数？

说下$attrs和$listeners的使用场景

vue组件里写的原生addEventListeners监听事件，要手动去销毁吗？为什么？

#### EventBus

##### 你有用过事件总线(EventBus)吗？说说你的理解

下面的例子中你和出租者担任的就是两个跨级的组件，而房产中介就是这个中央事件总线 bus

主要传递方式大概就是下面这几步：

* 通过  Bus.$emit('on-message',this.abc)  的方式进行发布消息，他有两个参数，一个是消息声明，第二个是传递的值，key和value的关系
* 另一个组件接收通过  Bus.$on('on-message', msg => { }）的方式，第一个参数是传递过来的消息声明，第二个参数可以是个函数，msg就是做为传递过来的参数
* 这里有个坑，在发布者进行发布消息的时候，要在destroyed（）{}生命周期中，进行销毁，并且在接收的时候$on要在created生命周期中进行获取，mounted是获取不到的，这样写，在旧组件销毁的时候新的组件拿到旧组件传来的值，然后在挂载的时候更新页面里的数据。否则传过来的值是不更新的
* 我们可以在bus.js中使用data，methods等选项，都是公共信息，bus.js中的data数据可以说类似于vuex中state中的数据。如果实际项目中需要存值。
* 当然复杂项目建议还是使用vuex。

![img](https://img-blog.csdnimg.cn/20190718152650480.png)

##### EventBus注册在全局上时，路由切换时会重复触发事件，如何解决呢？

建议在created里注册，在beforeDestory移出

### 多语言

你有使用过vue开发多语言项目吗？说说你的做法？

### 开发

vue要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？

vue在开发过程中要同时跟N个不同的后端人员联调接口（请求的url不一样）时你该怎么办？

vue开发过程中你有使用什么辅助工具吗？

在vue项目中如何配置favicon？

开发过程中有使用过devtools吗？

说说你觉得认为的vue开发规范有哪些？

#### 版本

你知道vue2.0兼容IE哪个版本以上吗？

你是从vue哪个版本开始用的？你知道1.x和2.x有什么区别吗？

#### for

vue使用v-for遍历对象时，是按什么顺序遍历的？如何保证顺序？

#### jsx

你有使用过JSX吗？说说你对JSX的理解

#### Form

写出你知道的表单修饰符和事件修饰符

#### Axios

axios是什么？怎样使用它？怎么解决跨域的问题？

你有封装过axios吗？主要是封装哪方面的？

如何中断axios的请求？

你了解axios的原理吗？有看过它的源码吗？

为何官方推荐使用axios而不用vue-resource？

ajax、fetch、axios这三都有什么区别？

如果将axios异步请求同步化处理？

#### proxy

说说你对proxy的理解

#### API

使用vue开发过程你是怎么做接口管理的？

#### SEO

使用vue后怎么针对搜索引擎做SEO优化？

你有使用过babel-polyfill模块吗？主要是用来做什么的？

#### First Paint

SPA首屏加载速度慢的怎么解决？

vue如何优化首页的加载速度？

vue首页白屏是什么问题引起的？如何解决呢？

#### UI

你有自己用vue写过UI组件库吗？

移动端ui你用的是哪个ui库？有遇到过什么问题吗？

#### CSS

用vue怎么实现一个换肤的功能？

如何引入scss？引入后如何使用？

你知道style加scoped属性的用途和原理吗？

在.vue文件中style是必须的吗？那script是必须的吗？为什么？

怎么使css样式只在当前组件中生效？

#### Animation

vue过渡动画实现的方式有哪些？

#### HTML

vue怎么获取DOM节点？

#### Echarts

有在vue中使用过echarts吗？踩过哪些坑？如何解决的？

#### Test

vue项目有做过单元测试吗？

#### APP

你有使用做过vue与原生app交互吗？说说vue与app交互的方法

#### SSR

SSR解决了什么问题？有做过SSR吗？你是怎么做的？

### 打包

##### 怎么配置使vue2.0+支持TypeScript写法？

- 配置ts-loader，tsconfig
- 增加类型扩展，让ts识别vue文件
- vue文件中script里面换成ts写法， 需要增加几个ts扩展的package， 比如vue-property-decorator

##### 在vue项目中如何引入第三方库（比如jQuery）？有哪些方法可以做到？

* 1、绝对路径直接引入
  在index.html中用script引入
  ``
  然后在webpack中配置external
  `externals: { 'jquery': 'jQuery' }`
  在组件中使用时import
  `import $ from 'jquery'
* 2 、在webpack中配置alias
  `resolve: { extensions: ['.js', '.vue', '.json'], alias: { '@': resolve('src'), 'jquery': resolve('static/jquery-1.12.4.js') } }`
  然后在组件中import
* 3、在webpack中配置plugins
  `plugins: [ new webpack.ProvidePlugin({ $: 'jquery' }) ]`
  全局使用，但在使用eslint情况下会报错，需要在使用了 $ 的代码前添加 /* eslint-disable*/ 来去掉 ESLint 的检查。

##### 为什么我们写组件的时候可以写在.vue里呢？可以是别的文件名后缀吗？

配合相应的loader 想咋写就咋写 [手动滑稽.gif]

##### vue项目有使用过npm run build --report吗？

给 process.env 对象添加了一个属性 npm_config_report: "true"，表示开启编译完成后的报告。

##### 怎么修改vue打包后生成文件路径？

```
webpack：output.path
vue-cli3: outputDir
```

##### vue-loader是什么？它有什么作用？

解析和转换 .vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，再分别把它们交给对应的 Loader 去处理。

#####webpack打包vue速度太慢怎么办？

* 多进程
* 缓存

##### vue部署上线前需要做哪些准备工作？

router 是不是hash 是否需要配置nginx , publicPath , 是不是要配置cdn

##### 如何解决vue打包vendor过大的问题？

1、在webpack.base.conf.js新增externals配置，表示不需要打包的文件，然后在index.html中通过CDN引入

```
externals: {
    "vue": "Vue",
    "vue-router": "VueRouter",
    "vuex": "Vuex",
    "element-ui": "ELEMENT",
    "BMap": "BMap"
  }
```

2、使用路由懒加载 [官网](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)

vue打包成最终的文件有哪些？

vue渲染模板时怎么保留模板中的HTML注释呢？

##### 怎么解决vue打包后静态资源图片失效的问题？

设置assetsPublicPath将 assetsPublicPath: '/' 改为 assetsPublicPath: './'

##### 怎么解决vue动态设置img的src不生效的问题？

```<img :src="require('../../../assets/images/xxx.png')" />```

##### 分析下vue项目本地开发完成后部署到服务器后报404是什么原因呢？

​	1. 检查nginx配置，是否正确设置了资源映射条件；

​	2. 检查vue.config.js中是否配置了publicPath，若有则检查是否和项目资源文件在服务器摆放位置一致。

### 优化

vue性能的优化的方法有哪些？

使用vue渲染大量数据时应该怎么优化？说下你的思路！

### 开放性

说说你对vue的表单修饰符.lazy的理解

vue的:class和:style有几种表示方式？

说说你对provide和inject的理解

如果让你教一个2-3年经验前端经验的同事使用vue，你该怎么教？

vue常用的修饰符有哪些？列举并说明

说说你对MVC、MVP、MVVM模式的理解

在vue中使用this应该注意哪些问题？

你有看过vue的源码吗？如果有那就说说看

说说vue的优缺点

有使用过vue吗？说说你对vue的理解

你认为vue的核心是什么？

说说你使用vue过程中遇到的问题（坑）有哪些，你是怎么解决的？

说说你都用vue做过哪些类型的项目？

说说vue的优缺点分别是什么？

实际工作中，你总结的vue最佳实践有哪些？

对于即将到来的vue3.0特性你有什么了解的吗？

你们项目为什么会选vue而不选择其它的框架呢？

在移动端使用vue，你觉得最佳实践有哪些？

你有看过vue推荐的风格指南吗？列举出你知道的几条

使用vue开发一个todo小应用，谈下你的思路

使用vue写一个tab切换

你期待vue3.0有什么功能或者改进的地方？

#### 框架对比

vue和react有什么不同？使用场景是什么？

vue和angular有什么区别呢？

vue和微信小程序写法上有什么区别？

如果现在让你从vue/react/angularjs三个中选择一个，你会选哪个？说说你的理由



### Vue-cli

####HMR

在使用vue-cli开发vue项目时，自动刷新页面的原理你了解吗？

vue-cli提供了的哪几种脚手架模板？

vue-cli工程中常用的npm命令有哪些？

vue-cli3插件有写过吗？怎么写一个代码生成插件？

vue-cli生成的项目可以使用es6、es7的语法吗？为什么？

vue-cli怎么解决跨域的问题？

vue-cli中你经常的加载器有哪些？

你知道什么是脚手架吗？

说下你了解的vue-cli原理？你可以自己实现个类vue-cli吗？

怎么使用vue-cli3创建一个项目？

vue-cli3你有使用过吗？它和2.x版本有什么区别？

vue-cli默认是单页面的，那要弄成多页面该怎么办呢？

不用vue-cli，你自己有搭建过vue的开发环境吗？流程是什么？

###Vue-router

vue-router怎么重定向页面？

vue-router怎么配置404页面？

切换路由时，需要保存草稿的功能，怎么实现呢？

vue-router路由有几种模式？说说它们的区别？

vue-router有哪几种导航钩子（ 导航守卫 ）？

说说你对router-link的了解

vue-router如何响应路由参数的变化？

你有看过vue-router的源码吗？说说看

切换到新路由时，页面要滚动到顶部或保持原先的滚动位置怎么做呢？

在什么场景下会用到嵌套路由？

如何获取路由传过来的参数？

说说active-class是哪个组件的属性？

在vue组件中怎么获取到当前的路由信息？

vur-router怎么重定向？

怎样动态加载路由？

怎么实现路由懒加载呢？

如果让你从零开始写一个vue路由，说说你的思路

说说vue-router完整的导航解析流程是什么？

路由之间是怎么跳转的？有哪些方式？

如果vue-router使用history模式，部署时要注意什么？

route和router有什么区别？

vue-router钩子函数有哪些？都有哪些参数？

vue-router是用来做什么的？它有哪些组件？

###Vuex

你有写过vuex中store的插件吗？

你有使用过vuex的module吗？主要是在什么场景下使用？

vuex中actions和mutations有什么区别？

vuex使用actions时不支持多参数传递怎么办？

你觉得vuex有什么缺点？

你觉得要是不用vuex的话会带来哪些问题？

vuex怎么知道state是通过mutation修改还是外部直接修改的？

请求数据是写在组件的methods中还是在vuex的action中？

怎么监听vuex数据的变化？

vuex的action和mutation的特性是什么？有什么区别？

页面刷新后vuex的state数据丢失怎么解决？

vuex的state、getter、mutation、action、module特性分别是什么？

vuex的store有几个属性值？分别讲讲它们的作用是什么？

你理解的vuex是什么呢？哪些场景会用到？不用会有问题吗？有哪些特性？

使用vuex的优势是什么？

有用过vuex吗？它主要解决的是什么问题？推荐在哪些场景用？

###ElementUI

ElementUI是怎么做表单验证的？在循环里对每个input验证怎么做呢？

你有二次封装过ElementUI组件吗？

ElementUI怎么修改组件的默认样式？

ElementUI的穿梭组件如果数据量大会变卡怎么解决不卡的问题呢？

ElementUI表格组件如何实现动态表头？

ElementUI使用表格组件时有遇到过问题吗？

有阅读过ElementUI的源码吗？

项目中有使用过ElementUI吗？有遇到过哪些问题？它的使用场景主要是哪些？

有用过哪些vue的ui？说说它们的优缺点？

###mint-ui

mint-ui使用过程中有没有遇到什么坑？怎么解决的？

说出几个mint-ui常用的组件

mint-ui是什么？你有使用过吗？