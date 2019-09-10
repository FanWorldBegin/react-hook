//过跳过 React Hook Effect 来优化性能
import React, { useState, useEffect } from 'react';

const App = (props) => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("rails365")

  useEffect(() => {
    console.log(`render ${count}`);
    document.title = `You clicked ${count} times`;
  }, [count]) //当count 变化时候才执行
  //当传入空数组则无效

  useEffect(() => {
    console.log("render name");
  })

  // componentWillUnmount
  // componentDidMount() {
  //   document.title = `You clicked ${this.state.count} times`;
  // }
  //
  // componentDidUpdate() {
  //   document.title = `You clicked ${this.state.count} times`;
  // }

  return (
    <div>
      当点击第二个按钮的时候并不需要执行第一个计算count的操作，所以跳过 设置title的useEffect
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <div>
        <button onClick={() => setName("")}>
          Click me
        </button>
      </div>
    </div>
  );
}

export default App;