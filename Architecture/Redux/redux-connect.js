/**
 * connect是一个高阶函数，首先传入mapStateToProps、mapDispatchToProps
 * 然后返回一个生产Component的函数(wrapWithConnect)
 * 然后再将真正的Component作为参数传入wrapWithConnect，这样就生产出一个经过包裹的Connect组件，该组件具有如下特点:
    通过props.store获取祖先Component的store
    props包括stateProps、dispatchProps、parentProps,合并在一起得到nextState，作为props传给真正的Component
    componentDidMount时，添加事件this.store.subscribe(this.handleChange)，实现页面交互
    shouldComponentUpdate时判断是否有避免进行渲染，提升页面性能，并得到nextState
    componentWillUnmount时移除注册的事件this.handleChange
    由于connect的源码过长，我们只看主要逻辑：
 * @param {*} mapStateToProps 
 * @param {*} mapDispatchToProps 
 * @param {*} mergeProps 
 * @param {*} options 
 */
export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
  return function wrapWithConnect(WrappedComponent) {
    class Connect extends Component {
      constructor(props, context) {
        // 从祖先Component处获得store
        this.store = props.store || context.store
        this.stateProps = computeStateProps(this.store, props)
        this.dispatchProps = computeDispatchProps(this.store, props)
        this.state = {
          storeState: null
        }
        // 对stateProps、dispatchProps、parentProps进行合并
        this.updateState()
      }
      shouldComponentUpdate(nextProps, nextState) {
        // 进行判断，当数据发生改变时，Component重新渲染
        if (propsChanged || mapStateProducedChange || dispatchPropsChanged) {
          this.updateState(nextProps)
          return true
        }
      }
      componentDidMount() {
        // 改变Component的state
        this.store.subscribe(() => {
          this.setState({
            storeState: this.store.getState()
          })
        })
      }
      render() {
        // 生成包裹组件Connect
        return ( <
          WrappedComponent {
            ...this.nextState
          }
          />
        )
      }
    }
    Connect.contextTypes = {
      store: storeShape
    }
    return Connect;
  }
}