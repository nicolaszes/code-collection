import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

// 初始状态
const context = {
  count: 0,
  color: "red"
};
// 颜色值表
const colorArr = [
  "blue",
  "#23af78",
  "red",
  "pink",
  "gray",
  "yellow",
  "green",
  "bluish",
  "orange"
];
// 获取随机数
function getRandom() {
  console.log(Math.floor(Math.random() * 9));
  return Math.floor(Math.random() * 9);
}
// 创建 Context
const AppContext = React.createContext();
const AppReducer = (state, action) => {
  switch (action.type) {
    case "count.add":
      return { ...state, count: state.count + 1 };
    case "count.reduce":
      return { ...state, count: state.count - 1 };
    case "color":
      return { ...state, color: colorArr[getRandom()] };
    default:
      return state;
  }
};
// 创建Provider
const AppProvider = props => {
  let [state, dispatch] = useReducer(AppReducer, context);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};
function Demo() {
  const { state, dispatch } = useContext(AppContext);
  console.log("demo");
  return (
    <div className="demo">
      <p>demo</p>
      <p style={{ color: state.color }}>{`当前的颜色`}</p>
      <button onClick={() => {dispatch({ type: "color" })}}>改变颜色</button>
    </div>
  );
}
function Demo1() {
  const { state, dispatch } = useContext(AppContext);
  console.log("demo1");
  return (
    <div className="demo">
      <p>demo1</p>
      <p>{`当前的count：${state.count}`}</p>
      <button onClick={() => { dispatch({ type: "count.add" })}}>+</button>
      <button onClick={() => { dispatch({ type: "count.reduce" })}}>-</button>
    </div>
  );
}

function Demo3() {
  const { state, dispatch } = useContext(AppContext);
  return (
    <div
      className="demo"
      style={{ backgroundColor: state.color }}
      onClick={() => {
        dispatch({ type: "count.add" });
        dispatch({ type: "color" });
      }}
    >
      <div className="font">{state.count}</div>
    </div>
  );
}

function App() {
  const { state, dispatch } = useContext(AppContext);
  return (
    <div className="App">
      <div>
        <button onClick={() => {dispatch({ type: "count.add" })}}>+</button>
        <span>{state.count}</span>
        <button onClick={() => {dispatch({ type: "count.reduce" })}}>-</button>
      </div>
      <div>
        <button
          style={{ color: state.color }}
          onClick={() => {
            dispatch({ type: "color" });
          }}
        >
          随机改变颜色
        </button>
      </div>
      <Demo />
      <Demo1 />
      <Demo3 />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  rootElement
);
