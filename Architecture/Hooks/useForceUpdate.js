const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue((val = value) => ++val);
}

const useForceUpdate = () => useReducer(v => v + 1, 0)[1];

function useForceUpdate() {
  const [, forceUpdateDispatch] = useReducer(v => v + 1, 0)
  useEffect(() => {
    const unSubscribeFn = store.subscribe(() => {
      forceUpdateDispatch();
    })
    return unSubscribeFn;
  }, [store])
  return store;
}