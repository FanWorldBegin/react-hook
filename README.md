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
![image](https://github.com/FanWorldBegin/react-hook/blob/master/images/1.png)


## 3. 创建自定义的Hook

onChange功能和resetValue， 回车清空输入框功能都会多次使用，所以抽离出来
### 1.自定义hook,快速创建input使用
```javascript
//写自定义的hook  initialValue 初始化 
//将value和 onchange抽离出来达到可复用
const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: e => setValue(e.target.value),
    resetValue: () => setValue(''),  //回车清空输入框
  }
}

```

### 2. 使用包装好方法
提交form 时候，调用传入的onSubmit方法，回车调用， 取出包装好的方法传入input
```javascript
const TodoForm =  ({onSubmit}) => {
  const {resetValue, ...text } = useInputValue("")
  return (
    <form onSubmit={ e => {
      e.preventDefault();
      onSubmit(text.value);
      resetValue();
    } }>
      <h3>text</h3>
      <input type="text" { ...text } />
    </form>
  )
}
```

### 3.App 中调用
```javascript
const App = () => {
  const [todos, setTodos] = useState([]);
 
  //点击单条数据设置已完成
  const toggleComplete = (i) => {
    setTodos(
      todos.map((todo, k) => k === i ? {
        ...todo,
        complete: !todo.complete
      } : todo)
    )
  }
  return (
    <div>
      <h2>实现 TodoList - 写自定义的 Hook</h2>
      <TodoForm onSubmit={ text => {
        setTodos([
          {text, complete:false}, 
          ...todos
        ])
      }}/>
      <div>
        {
          todos.map(({text, complete}, i)=> (
            <div key={text} 
            onClick={() => toggleComplete(i)}
            style={{ textDecoration : complete ? "line-through" : '' }}
            > {text} </div>
          ))
        }
      </div>
      {/* 置空 */}
      <button onClick={()=> setTodos([])}>reset</button>
    </div>
  );
}

```
