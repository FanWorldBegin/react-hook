# Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## 1.创建组件的方式

1.无状态组件 - 无法使用生命周期
2. class
* Hook 是一些可以让你在函数组件里钩入 react state及生命周期等特性的函数。 
* Hook 不能在class 组件中使用。
```javascript
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
```


useState 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 this.setState,可以在一个组件中创建多个hook

```javascript
  const [count, setCount] = useState(0);
  第一个参数是变量(默认值为0)，第二个参数是function
  setCount 内容如下 
  const setCount = (number) => {
    this.setState({
      count: number,
    })
  }
```

## 2. 随机表情实践
