// 这就是 Redux
let memoizedState  = [];
let currentCursor = 0;

/**
 * 
 * @param {*} reducer 
 * @param {*} initialState 
 */
function useReducer(reducer, initialState){
  memoizedState[currentCursor] = memoizedState[currentCursor] || initialState
  function dispatch(action){
    memoizedState[currentCursor] = reducer(memoizedState[currentCursor], action)
    render()
  }
  return [memoizedState[currentCursor++], dispatch]
}

// 一个 Action
function useTodos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: "add", text });
  }

  return [todos, { handleAddClick }];
}

// 绑定 Todos 的 UI
function TodosUI() {
  const [todos, actions] = useTodos();
  return (
    <>
      {todos.map((todo, index) => (
        <div>{todo.text}</div>
      ))}
      <button onClick={actions.handleAddClick}>Add Todo</button>
    </>
  );
}