function useInterval(callback, delay = 300) {
  const intervalFn = useRef(); // 1
  useEffect(() => {
    intervalFn.current = callback; // 2
  })
  useEffect(() => {
    if (delay) {
      const timer = setInterval(() => {
        intervalFn.current()
      }, delay)
      return () => { clearInterval(timer) }
    }
  }, [delay]) // 3
}