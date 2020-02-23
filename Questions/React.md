# React

###生命周期

#### Mounted 阶段

##### getDefaultProps

定义this.props默认值，对于每个组件实例来讲，只会调用一次，设置默认的 props(properties的缩写) 值

```jsx
var Hello = React.creatClass({
    getDefaultProps: function(){
        return {
            name: 'pomy',
            git: 'dwqs'
        }
    },
    
    render: function(){
        return (
            <div>Hello,{this.props.name},git username is {this.props.dwqs}</div>
        )
    }
});

ReactDOM.render(<Hello />, document.body);
```

也可以在挂载组件的时候设置 props：

```jsx
var data = [{title: 'Hello'}];
<Hello data={data} />
```

或者调用 `setProps` （一般不需要调用）来设置其 props：

```jsx
var data = [{title: 'Hello'}];
var Hello = React.render(<Demo />, document.body);
Hello.setProps({data:data});
```

**但只能在子组件或组件树上调用 setProps。别调用 this.setProps 或者 直接修改 this.props。将其当做只读数据。**



##### getInitialState

组件的每个实例来说，这个方法的调用**有且只有一次，**用来初始化每个实例的 state，在这个方法里，可以访问组件的 props。

```jsx
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('example')
);
```



##### componentWillMount

该方法在首次渲染之前调用，也是再 render 方法调用之前修改 state 的最后一次机会。



#### Update 阶段

##### render

该方法会创建一个虚拟DOM，用来表示组件的输出。对于一个组件来讲，render方法是唯一一个必需的方法。render方法需要满足下面几点：

1. 只能通过 this.props 和 this.state 访问数据（不能修改）
2. 可以返回 null,false 或者任何React组件
3. 不能改变组件的状态
4. 不能修改DOM的输出

render方法返回的结果并不是真正的DOM元素，而是一个**VDom**，类似于一个DOM tree的结构的对象。react之所以效率高，就是这个原因。



##### render 函数中 return 如果没有使用 () 会有什么问题？

我们在使用 JSX 语法书写 react 代码时，babel 会将 JSX 语法编译成 js，同时会在每行自动添加分号（；），如果 return 后换行了，那么就会变成 return；

渲染没有返回任何内容。这通常意味着缺少 return 语句。或者，为了不渲染，返回 null。

为了代码可读性我们一般会在 return 后面添加括号这样代码可以折行书写，否则就在 return 后面紧跟着语句.

```jsx
Copyconst Nav = () => {
  return
    <nav className="c_navbar">
      { some jsx magic here }
    </nav>
}
```



##### componentDidMount

该方法不会在服务端被渲染的过程中调用。

该方法被调用时，已经渲染出真实的 DOM，可以再该方法中通过 `this.getDOMNode()` 访问到真实的 DOM（使用 `ReactDOM.findDOMNode()` [严格模式下该方法已弃用。](https://zh-hans.reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)）。

```jsx
var data = [..];
var comp = React.createClass({
    render: function(){
        return <imput .. />
    },
    componentDidMount: function(){
        $(this.getDOMNode()).autoComplete({
            src: data
        })
    }
})
```



##### componentWillReceiveProps

```jsx
componentWillReceiveProps: function(nextProps){
    if(nextProps.checked !== undefined){
        this.setState({
            checked: nextProps.checked
        })
    }
}
```



##### componentWillUpdate 可以直接修改 state 的值吗？

react 组件在每次需要重新渲染时候都会调用 componentWillUpdate(),

例如，我们调用 this.setState()时候

在这个函数中我们之所以不调用 this.setState()是因为该方法会触发另一个 componentWillUpdate(),如果我们 componentWillUpdate()中触发状态更改,我们将以无限循环.



#### Unmounted 阶段

React16废弃了哪些生命周期？为什么？



怎样在React中开启生产模式？

React中你知道creatClass的原理吗？

React16跟之前的版本生命周期有哪些变化？



shouldComponentUpdate方法是做什么的？

React的性能优化在哪个生命周期？它优化的原理是什么？

说说React的生命周期有哪些？

React中发起网络请求应该在哪个生命周期中进行？为什么？

### API

#### Refs

为什么建议不要过渡使用Refs？

什么是 React.forwardRef？它有什么作用？

使用React的memo和forwardRef包装的组件为什么提示children类型不对？

React怎么拿到组件对应的DOM元素？

React中可以在render访问refs吗？为什么？

React中refs的作用是什么？有哪些应用场景？

#### Hooks

React为什么要搞一个Hooks？

React Hooks帮我们解决了哪些问题？

React16的reconciliation和commit分别是什么？

useState和this.state的区别是什么？

请说说什么是useImperativeHandle？

请说说什么是useReducer？

请说说什么是useRef？

请说说什么是useEffect？

举例说明useState

请说说什么是useState？为什么要使用useState？

请描述下你对React的新特性Hooks的理解？它有哪些应用场景？

怎样使用 Hooks 获取服务端数据？

使用 Hooks 要遵守哪些原则？

render 方法的原理你有了解吗？它返回的数据类型是什么？

useEffect 和 useLayoutEffect 有什么区别？

### Function

React的isMounted有什么作用？

ES6的语法'...'在React中有哪些应用？



#### constructor

##### React组件的构造函数有什么作用？

在react的新的写法中，每一个组件都是一个类，这个很符合es6的语法规范，在es6中要想创建一个对象，就要调用相应的构造函数, react的组件渲染有两种情况，第一种情况是第一次渲染，第二种情况是状态更新时候重新渲染,构造函数在组件的初次渲染中只会运行一次，构造函数里进行的操作一般有三种用途：

- 1、指定this --> super(props)
- 2、设置初始化的状态 --> this.setState({});
- 3、为组件上的构造函数绑定this



#####React组件的构造函数是必须的吗？

不是必须的，对于无状态组件，只需要传 props

##### super()和super(props)有什么区别？

```jsx
class Button extends React.Component {
  constructor(props) {
    super(); // 没有传 props
    console.log(props);      // {}
    console.log(this.props); // undefined 
  }
  // ...
}
```

##### 在构造函数中调用super(props)的目的是什么？

子类是没有自己的this对象的，它只能继承父类的this对象，然后对其进行加工，而super()就是将父类中的this对象继承给子类的，没有super() 子类就得不到this对象。

如果你使用了constructor就必须写super() 这个是用来初始化this的，可以绑定事件到this上
如果你想要在constructor中使用this.props,就必须给super添加参数 super(props)

**如果没有用到constructor 是可以不写的，react会默认添加一个空的constroctor.**

#####React中除了在构造函数中绑定this,还有别的方式吗？

```js
() => {}, bind(this)
```



#### setState

```jsx
this.setState((state, props) => {
  return {counter: state.counter + props.step};
});
```

##### 调用setState会更新的生命周期有哪几个？

`componentWillRecieveProps`  -> `componentWillUpdate`  -> `shouldComponentUpdate` -> `render` -> `componentDidUpdate`

##### setState的第二个参数作用是什么呢？

`setState()` 的第二个参数为可选的回调函数，它将在 `setState` 完成合并并重新渲染组件后执行。通常，我们建议使用 `componentDidUpdate()` 来代替此方式。

#####setState是同步还是异步的呢？为什么state并不一定会同步更新？

只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout/setInterval等原生 API 中都是同步的。简单的可以理解为被 React 控制的函数里面就会表现出“异步”，反之表现为同步。

`setState()` 并不总是立即更新组件。它会批量推迟更新。

#####setState执行机制是什么？

##### setState和replaceState的区别？

replaceState()方法与setState()类似，但是方法只会保留nextState中状态，原state不在nextState中的状态都会被删除。使用语法：

setState缺点是什么呢？

state和setState有什么区别？



#### class

写出React动态改变class切换组件样式

#####React中怎么操作虚拟DOM的Class属性？

Refs

##### 为什么属性使用className而不是class呢？

class 作为 ES6 的关键字保留了下来

#### render

请说说你对React的render方法的理解

React中怎样阻止组件渲染？



### 组件

你是如何划分React组件的？

React声明组件有哪几种方法，各有什么不同？

如何更新组件的状态？

怎么定时更新一个组件？

怎样将多个组件嵌入到一个组件中？

怎样实现React组件的记忆？原理是什么？

在React中页面重新加载时怎样保留数据？

React的实例？函数式组件有没有实例？

在React中组件和元素有什么区别？

React组件更新的机制是什么？

如何封装一个React的全局公共组件？

说说你是怎么理解React的业务组件和技术组件的？

React有几种构建组件的方式？可以写出来吗？

createElement与cloneElement两者有什么区别？

解释下React中Element 和Component两者的区别是什么？

如果组件的属性没有传值，那么它的默认值是什么？

React.createClass和extends Component的区别有哪些？

在React中怎样改变组件状态，以及状态改变的过程是什么？

#### 组件命名

##### React组件命名推荐的方式是哪个？为什么不推荐使用displayName？

我们采用基于路径的组件命名方式，即根据相对于 `components` 文件目录的相对路径来命名，如果在此文件夹以外，则使用相对于 `src` 目录的路径。举个例子，组件的路径如果是 `components/User/List.jsx`，那么它就被命名为 `UserList`。

当文件位于具有相同名称的组件中时，我们不需要重复该名称。 也就是说，`components/User/Form/Form.jsx`将被命名为`UserForm`而不是`UserFormForm`。

上面的模式有一些好处，我们可以在下面看到：

* 便于在项目中搜索文件
* 避免导入重复名称

React的displayName有什么作用？

说说你对React的组件命名规范的理解

#### 自定义组件

React自定义组件你写过吗？说说看都写过哪些？

#### 有状态组件/无状态组件

React什么是有状态组件？

React中无状态组件和有状态组件的区别是什么？

在React中无状态组件有什么运用场景？

#### 受控组件/非受控组件

非受控组件 —— 值不受 value / props 控制，需要访问渲染的底层 DOM 元素

受控组件 —— state / onChange 实现数据双向绑定，控制着用户输入过程中表单发生的操作

如何给非控组件设置默认的值 —— 原生展示 `<input defaultValue="123" />`

#### 展示组件/容器组件

展示组件（UI 组件）—— 只负责接收数据，展示 UI

容器组件（智能组件）—— 负责处理逻辑，数据获取等

#### 类组件/函数式组件

纯函数 —— 不影响原数据

如何解决引用类型在pureComponent下修改值的时候，页面不渲染的问题？

解释下React中Component和pureComponent两者的区别是什么？

##### 函数式组件没有生命周期？为什么？

因为函数式组件`没有继承 React.Component`，由于生命周期函数是React.Component类的方法实现的，所以没继承这个类，自然就没法使用生命周期函数了

#### 高阶组件（HOC）

##### mixin

##### 属性代理

##### 反向继承

React的mixins有什么作用？适用于什么场景？

装饰器(Decorator)在React中有什么应用？

使用高阶组件(HOC)实现一个loading组件

举例说明什么是高阶组件(HOC)的反向继承？

举例说明什么是高阶组件(HOC)的属性代理？

高阶组件(HOC)有哪些优点和缺点？

在React使用高阶组件(HOC)有遇到过哪些问题？如何解决？

在使用React过程中什么时候用高阶组件(HOC)？给组件设置很多属性时不想一个个去设置有什么办法可以解决这问题呢？

使用ES6的class定义的组件不支持mixins了，那用什么可以替代呢？

写一个React的高阶组件(HOC)并说明你对它的理解

#### Fragment

##### 为什么建议Fragment包裹元素？它的运用场景是什么？

React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。

带 **key** 的

```jsx
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // 没有`key`，React 会发出一个关键警告
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

#####它的简写是什么？

 你可以像使用任何其他元素一样使用 `<> `，除了它不支持 key 或属性。

```jsx
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```



#### Portal

一个 portal 的典型用例是当父组件有 `overflow: hidden` 或 `z-index` 样式时，但你需要子组件能够在视觉上“跳出”其容器。

**能够拿到 Context 当前的值，DOM 跳脱出去，但逻辑没有**

```jsx
render() {
  // React 并*没有*创建一个新的 div。它只是把子元素渲染到 `domNode` 中。
  // `domNode` 是一个可以在任何位置的有效 DOM 节点。
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```

你有用过React的插槽(Portals)吗？怎么用？

请说说React中Portal是什么？

举例说明React的插槽有哪些运用场景？

### 架构

React16新特性有哪些？

React 必须使用 JSX 吗？

自定义组件时render是可选的吗？为什么？

说说你对React的渲染原理的理解

##### 渲染劫持？

首先，什么是渲染劫持：渲染劫持的概念是控制组件从另一个组件输出的能力，当然这个概念一般和 react 中的高阶组件（HOC）放在一起解释比较有明了。

高阶组件可以在 render 函数中做非常多的操作，从而控制原组件的渲染输出，只要改变了原组件的渲染，我们都将它称之为一种渲染劫持。

实际上，在高阶组件中，组合渲染和条件渲染都是渲染劫持的一种，通过反向继承，不仅可以实现以上两点，还可以增强由原组件 render 函数产生的 React 元素。

实际的操作中 通过 操作 state、props 都可以实现渲染劫持

什么是浅层渲染？

说说你对Relay的理解

说说你对“在React中，一切都是组件”的理解

经常用React，你知道React的核心思想是什么吗？

#### 中间件

React的中间件机制是怎么样的？这种机制有什么作用？

React中你用过哪些第三方的中间件？

你有写过React的中间件插件吗？

在React中怎么引用第三方插件？比如说jQuery等 

#### Diff

说说React diff的原理是什么？

#### Virtual DOM

#####Virtual DOM的工作原理

##### 为何说VDOM会提高性能?

##### React的VDOM和vue的VDOM有什么区别？

react和vue的虚拟dom都是一样的， 都是用JS对象来模拟真实DOM，然后用虚拟DOM的diff来最小化更新真实DOM。

除了极个别实现外，两者前半部分（用JS对象来模拟真实DOM）几乎是一样的。

而对于后半部分（用虚拟DOM的diff来最小化更新真实DOM）两者算法也是类似的，包括replace delete insert等

> 虽然两者对于dom的更新策略不太一样， react采用自顶向下的全量diff，vue是局部订阅的模式。 但是这其实和虚拟dom并无关系



#### Fiber

说说你对Fiber架构的理解

React Fiber它的目的是解决什么问题？

#### Loadable / Suspense

##### 它帮我们解决了什么问题？

* 代码拆分
* 条件渲染
* React.lazy

##### React.loadable —— 你有使用过loadable组件吗？

https://zhuanlan.zhihu.com/p/25874892

```jsx
const Loading = ({ pastDelay }) => {
  if (pastDelay) {
    return <Spinner />;
  }
  return null;
};
 
export const johanAsyncComponent = Loadable({
  loader: () => import(/* webpackChunkName: "johanComponent" */ './johan.component'),
  loading: Loading,
  delay: 200
});
```

#####React.Suspense —— 你有使用过suspense组件吗？

https://cloud.tencent.com/developer/article/1381296

```jsx
const johanComponent = React.lazy(() => import(/* webpackChunkName: "johanComponent" */ './myAwesome.component'));
 
export const johanAsyncComponent = props => (
  <React.Suspense fallback={<Spinner />}>
    <johanComponent {...props} />
  </React.Suspense>
);
```

#### reconciliation

说说你对React的reconciliation（一致化算法）的理解

#### key

需要把 keys 设置为全局唯一吗？

React中的key有什么作用？

React中遍历时为什么不用索引作为唯一的key值？



#### render

在React中如何避免不必要的render？

render在什么时候会被触发？



#### Error Boundaries

说说你对Error Boundaries的理解

React中在哪捕获错误？

React v15中怎么处理错误边界？

#### JSX

写个例子说明什么是 JSX 的内联条件渲染

怎么在JSX里属性可以被覆盖吗？覆盖的原则是什么？

怎么在JSX里使用自定义属性？

在JSX中如何写注释？

浏览器为什么无法直接JSX？怎么解决呢？

JSX和HTML有什么区别？

### 事件

举例说明如何在React创建一个事件

在 React 中怎么阻止事件的默认行为？

怎样将事件传递给子组件？

```html
<div onClick={handlerClick}>单击</div>和<div onClick={handlerClick(1)}>单击</div>有什么区别？
```

请描述下React的事件机制

怎样在React中创建一个事件？

React的触摸事件有哪几种？

React 的事件和普通的HTML事件有什么不同？

在React中如何判断点击元素属于哪一个组件？

在React中什么是合成事件？有什么用？

组件卸载前，加在DOM元素的监听事件和定时器要不要手动清除？为什么？

在 React 中什么时候使用箭头函数更方便呢？

请描述下事件在React中的处理方式是什么？

### 数据

在 React 中怎么将参数传递给事件？

React组件间的通信有哪些？

React非兄弟组件如何通信？

React兄弟组件如何通信？

React非父子组件如何通信？

React父子组件如何通信？

React组件间共享数据方法有哪些？

#### state

React组件的state和props两者有什么区别？

React中如何监听state的变化？

React为什么不要直接修改state？如果想修改怎么做？

constructor和getInitialState有不同？

为什么建议setState的第一个参数是callback而不是一个对象呢？

#### prop

为什么说React中的props是只读的？

React中怎么检验props？

React中验证props的目的是什么？

React中修改prop引发的生命周期有哪几个？

在React中组件的props改变时更新组件的有哪些方法？

#### immutable

immutable的原理是什么？

你对immutable有了解吗？它有什么作用？

### 国际化

React Intl是什么原理？

你有使用过React Intl吗？

怎么实现React组件的国际化呢？

### 状态管理

在React中你是怎么进行状态管理的？

#### Context

Context 主要应用场景在于*很多*不同层级的组件需要访问同样一些的数据。

##### 使用场景

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。

使用 context, 我们可以避免通过中间元素传递 props

##### 在React怎么使用Context

```jsx
import ReactDOM from "react-dom";
import React, { Component } from "react";

// 首先创建一个 context 对象这里命名为：ThemeContext
const { Provider, Consumer } = React.createContext("light");

// 创建一个祖先组件组件 内部使用Provier 这个对象创建一个组件 其中 value 属性是真实传递的属性
class App extends Component {
  render() {
    return (
      <Provider value="dark">
        <Toolbar />
      </Provider>
    );
  }
}

// 渲染 button 组件的外层包裹的属性
function Toolbar() {
  return (
    <div>
      <ThemeButton />
    </div>
  );
}
// 在 Toolbar 中渲染的button 组件 返回一个 consumer （消费者）将组件组件的 value 值跨组件传递给 // ThemeButton 组件
function ThemeButton(props) {
  return (
    <Consumer>
      {theme => (
        <button {...props} theme={theme}>
          {theme}
        </button>
      )}
    </Consumer>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```



说说你对React的Context的理解

说说Context有哪些属性？

##### 为什么React并不推荐我们优先考虑使用Context？

- Context 目前还处于实验阶段，可能会在后面的发行版本中有很大的变化，事实上这种情况已经发生了，所以为了避免给今后升级带来大的影响和麻烦，不建议在 app 中使用 context。
- 尽管不建议在 app 中使用 context，但是独有组件而言，由于影响范围小于 app，如果可以做到高内聚，不破坏组件树之间的依赖关系，可以考虑使用 context
- 对于组件之间的数据通信或者状态管理，有效使用 props 或者 state 解决，然后再考虑使用第三方的成熟库进行解决，以上的方法都不是最佳的方案的时候，在考虑 context。
- context 的更新需要通过 setState()触发，但是这并不是很可靠的，Context 支持跨组件的访问，但是如果中间的子组件通过一些方法不影响更新，比如 shouldComponentUpdate() 返回 false 那么不能保证 Context 的更新一定可以使用 Context 的子组件，因此，Context 的可靠性需要关注。



除了实例的属性可以获取Context外哪些地方还能直接获取Context呢？

childContextTypes是什么？它有什么用？

contextType是什么？它有什么用？



Consumer向上找不到Provider的时候怎么办？





#### Redux

状态管理器解决了什么问题？

什么时候用状态管理器？

状态管理器它精髓是什么？

Redux它的三个原则是什么？

什么是单一数据源？

什么是Redux？说说你对Redux的理解？有哪些运用场景？

在Redux中，什么是action？

在Redux中，什么是store？

推荐在reducer中触发Action吗？为什么？

Redux中异步action和同步action最大的区别是什么？

在Redux中，什么是reducer？它有什么作用？

举例说明怎么在Redux中定义action？

为什么Redux能做到局部渲染呢？

在Redux中怎么发起网络请求？

Redux怎样重置状态？

Redux怎样设置初始状态？

Context api可以取代Redux吗？为什么？

Redux怎么添加新的中间件？

在React中你是怎么对异步方案进行选型的？

Redux和vuex有什么区别？

Redux的中间件是什么？你有用过哪些Redux的中间件？

说说Redux的实现流程

Redux由哪些组件构成？

Redux的thunk作用是什么？

Redux的数据存储和本地储存有什么区别？

说说Redux的优缺点分别是什么？

Redux和Flux的区别是什么？

你有了解Rxjs是什么吗？它是做什么的？

#### Redux-saga

redux-saga和redux-thunk有什么本质的区别？

你知道redux-saga的原理吗？

你有使用过redux-saga中间件吗？它是干什么的？

#### Mobx

Mobx的设计思想是什么？

Mobx和Redux有什么区别？

在React项目中你是如何选择Redux和Mobx的？说说你的理解

你有在React中使用过Mobx吗？它的运用场景有哪些？

#### Flux

请说说点击按钮触发到状态更改，数据的流向？

请描述下Flux的思想

什么是Flux？说说你对Flux的理解？有哪些运用场景？

### 开发

React如何进行代码拆分？拆分的原则是什么？

在 React 中怎么使用 async/await？

在React中你有经常使用常量吗？

React的书写规范有哪些？

在React中声明组件时组件名的第一个字母必须是大写吗？为什么？

React的状态提升是什么？使用场景有哪些？

####严格模式

`StrictMode` 是一个用来突出显示应用程序中潜在问题的工具。与 `Fragment` 一样，`StrictMode` 不会渲染任何可见的 UI。它为其后代元素触发额外的检查和警告。

```jsx
import React from 'react';

function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```

- [识别不安全的生命周期](https://zh-hans.reactjs.org/docs/strict-mode.html#identifying-unsafe-lifecycles)
- [关于使用过时字符串 ref API 的警告](https://zh-hans.reactjs.org/docs/strict-mode.html#warning-about-legacy-string-ref-api-usage)
- [关于使用废弃的 findDOMNode 方法的警告](https://zh-hans.reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)
- [检测意外的副作用](https://zh-hans.reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects)
- [检测过时的 context API](https://zh-hans.reactjs.org/docs/strict-mode.html#detecting-legacy-context-api)

写React你是用es6还是es5的语法？有什么区别？

Mern和Yeoman脚手架有什么区别？

你有在项目中使用过Yeoman脚手架吗？

你有在项目中使用过Mern脚手架吗？

使用React的方式有哪几种？

有用过React的服务端渲染吗？怎么做的？

#### 版本

你用过React版本有哪些？

##### React15和16别支持IE几以上？

React15 版本不直接支持 IE8 浏览器的，官方文档中说 React16 中依赖于集合类型 Map 和 Set 因此不再支持 IE 11 以下的浏览器，如果想要支持，需要使用全局的 polyfill

从旧版本的React升级到新版本的React有做过吗？有遇到过什么坑？

#### if/else

怎样有条件地渲染组件？

React的render中可以写{if else}这样的判断吗？

#### for

写例子说明React如何在JSX中实现for循环

在React中遍历的方法有哪些？它们有什么区别呢？

props.children.map和js的map有什么区别？为什么优先选择React的？

为什么标签里的for要写成htmlFor呢？

#### dynamic import

怎样动态导入组件？

#### propType

React中你有使用过propType吗？它有什么作用？

使用PropTypes和Flow有什么区别？

可以使用TypeScript写React应用吗？怎么操作？

在React中我们怎么做静态类型检测？都有哪些方法可以做到？

说说你对React的项目结构的理解

有用过React Devtools吗？说说它的优缺点分别是什么？

在React中你有遇到过安全问题吗？怎么解决？

#### Form

你有使用过formik库吗？说说它的优缺点

你有用过哪些React的表单库吗？说说它们的优缺点

React有哪几种方法来处理表单输入？

#### UI

你有用过哪些React的UI库？它们的优缺点分别是什么？

有在项目中使用过Antd吗？说说它的好处

怎么在 React 中引入其它的UI库，例如 Bootstrap

#### CSS

举例说明在React中怎么使用样式？

在React中怎么引用sass或less？

#### Animation

创建React动画有哪些方式？

如何用React实现滚动动画？

在 React 项目中你用过哪些动画的包？

#### HTML

怎么防止HTML被转义？

怎样在React中使用innerHTML？

#### creat-react-app

不用脚手架，你会手动搭建React项目吗？

create-react-app有什么好处？

create-react-app创建新运用怎么解决卡的问题？

#### Test

你有做过React的单元测试吗？如果有，用的是哪些工具？怎么做的？

### 打包

使用 webpack 打包 React 项目，怎么减小生成的 js 大小？

在React中如果去除生产环境上的sourcemap？

在React中如何引入图片？哪种方式更好？

在React中怎么使用字体图标？

React的应用如何打包发布？它的步骤是什么？

React怎样引入svg的文件？

同时引用这三个库React.js、React-dom.js和babel.js它们都有什么作用？

React 根据不同的环境打包不同的域名？



### 优化

如何提高组件的渲染效率呢？

路由切换时同一组件无法重新渲染的有什么方法可以解决？

React怎么提高列表渲染的性能？

你知道的React性能优化有哪些方法？

React怎样跳过重新渲染？

React怎么判断什么时候重新渲染组件呢？



### 开放性

你最喜欢 React 的哪一个特性（说一个就好）？

你最不喜欢React的哪一个特性（说一个就好）？

说说你喜欢React的原因是什么？它有什么优缺点？

简单描述下你有做过哪些React项目？

你觉得React上手快不快？它有哪些限制？你是如何学习React的？

在使用React过程中你都踩过哪些坑？你是怎么填坑的？

说出几点你认为的React最佳实践

说说你对声明式编程的理解

你阅读了 React 的源码？都有哪些收获？你是怎么阅读的？

你阅读过 React 的源码吗？简要说下它的执行流程

使用React写一个todo应用，说说你的思路

React是哪个公司开发的？Facebook

React是什么？它的主要特点是什么？

简要描述下你知道的React工作原理是什么？

### React / Vue

React与angular、vue有什么区别？

### ReactNative

如何在React Native中设置环境变量？

请描述下Code Push的原理是什么？

React Native怎样查看日记？

React Native怎样测试？

React Native怎样调试？

React Native和React有什么区别？

有做过React Native项目吗？

### React-Router

React-Router怎么获取历史对象？

React-Router怎么获取URL的参数？

在history模式中push和replace有什么区别？

React-Router怎么设置重定向？

React-Router 4中`<Router>`组件有几种类型？

React-Router 3和React-Router 4有什么变化？添加了什么好的特性？

React-Router的实现原理是什么？

React-Router 4的switch有什么用？

React-Router的路由有几种模式？

React-Router 4怎样在路由变化时重新渲染同一个组件？

React-Router的`<Link>`标签和`<a>`标签有什么区别？

React的路由和普通路由有什么区别？

请你说说React的路由的优缺点？

请你说说React的路由是什么？