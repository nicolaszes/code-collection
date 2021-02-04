function useFetchHook(config, watch) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(0);
  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const result = await axios(config);
          setData(result.data);
          setStatus(1);
        } catch (err) {
          setStatus(2);
        }
      };

      fetchData();
    },
    watch ? [...watch] : []
  );
  return {
    data,
    status
  };
}
