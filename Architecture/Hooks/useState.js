// 通过数组维护变量
let memoizedState  = [];
let currentCursor = 0;

/**
 * 
 * @param {*} initVal 
 */
const useState = (initVal) => {
  memoizedState[currentCursor] = memoizedState[currentCursor] || initVal;
  function setVal(newVal) {
    memoizedState[currentCursor] = newVal;
    render(); 
  }
  // 返回state 然后 currentCursor+1
  return [memoizedState[currentCursor++], setVal]; 
}

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <span>{count}</span>
      <button onClick = {() => {setCount(count + 1)}}>增加</button>
    </div>
  );
}

// 新增方法
function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}
render()