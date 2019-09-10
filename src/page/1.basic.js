import React, { useState, useEffect } from 'react';

const App = (props) => {
  // const count = useState(0)[0];
  // const setCount = useState(0)[1]
  const [count, setCount] = useState(0);
  //第一个参数是变量(默认值为0)，第二个参数是function
  //setCount 内容如下 
  // const setCount = (number) => {
  //   this.setState({
  //     count: number,
  //   })
  // }

  const [Name, setName] = useState('默认名称');
  //组件挂在更新时都会执行
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  })
  return (
    <div>
      <h2>{Name}</h2>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me setCount
      </button>
      <h4>两种改变state的方式等价</h4>
      <button onClick={() => this.setState({ count: this.state.count + 1})}>
        Click me setState
      </button>

    </div>
  );
}

export default App;