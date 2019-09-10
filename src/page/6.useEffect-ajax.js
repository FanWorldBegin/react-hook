//使用 React Hooks useEffect 发送 ajax 请求获取数据全攻略

import React, { useState, useEffect } from 'react';

//
const useFetch = (url, count) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, [count]) //传入空数组只在componentDidMount 执行一次

  return { data, loading }

}

const App = (props) => {
  const [count, setCount] = useState(0);
  const { data, loading } = useFetch("https://randomuser.me/api/", count);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      { loading ? <div>...loading...</div> : <div>{ data.results[0].name.first }</div> }
    </div>
  );
}

export default App;
