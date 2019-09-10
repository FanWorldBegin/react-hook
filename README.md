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

## 4.通过跳过 React Hook Effect 来优化性能
可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。

* 两个按钮第一个修改count,第二个没有修改，所以在点击第二个按钮时候不更新UI, useEffect中传入count
* 有条件的执行useEffect，传入空数组 []则一只在didMount执行一次。
```javascript
//过跳过 React Hook Effect 来优化性能
import React, { useState, useEffect } from 'react';

const App = (props) => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("rails365")

  useEffect(() => {
    console.log(`render ${count}`);
    //修改当前标签页标题
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
      当点击第二个按钮设置title的时候不改变count,并不需要执行第一个计算count的操作，所以跳过相关操作 
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        count改变
      </button>
      <div>
        <button onClick={() => setName("")}>
          不操作count
        </button>
      </div>
    </div>
  );
}

export default App;
```

 相当于在componentDidUpdata判断state状态是否改变
 ```javascript
 componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
 ```
 修改标签标题
 ![image](https://github.com/FanWorldBegin/react-hook/blob/master/images/2.png)

 ## 5.使用 React Hooks useEffect 发送 ajax 请求获取数据全攻略
fetch 是浏览器提供的发送ajax 请求的方法, 发送请求，当count发生改变时候刷新。

```javascript
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
```

App组件中调用, 当点击按钮修改count时候触发。
```javascript

const App = (props) => {
  const [count, setCount] = useState(0);
  const { data, loading } = useFetch("https://randomuser.me/api/", count);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        获取名字
      </button>
      { loading ? <div>...loading...</div> : <div>{ data.results[0].name.first }</div> }
    </div>
  );
}

```

## 6. React Hooks useEffect 中的 componentWillUnmount - 实例
组件要被卸载了如何使用, 点击change Project按钮切换组件，进行卸载

在MyAPI中定义定时器方法，每秒count + 1,  清除定时器方法， 重制方法.
```javascript

const MyAPI = {
  count: 0,
  subscribe(cb) {
    this.intervalId = setInterval(() => {
      this.count += 1;
      cb(this.count);
    }, 1000);
  },
  unsubscribe() {
    clearInterval(this.intervalId);
    this.reset();
  },
  reset() {
    this.count = 0;
  },
};

```


在project变化时候执行， return为 willUnmount阶段
```javascript
const UseEffectComponent = (props) => {
  const { project } = props;
  const [timeOnProject, setTimeOnProject] = useState(0);

  useEffect(() => {
    MyAPI.subscribe(timeOnProject => {
      setTimeOnProject(timeOnProject);
    });
    // return 返回的是 componentWillUnmount
    return () => {
      MyAPI.unsubscribe();
      setTimeOnProject(0);
    }
  }, [project])

  return (
    <div>
      <h1>Project: {project}</h1>
      <h2>
        Time on project: <br />
        {timeOnProject}
      </h2>
    </div>
  );
}
```
点击按钮切换project
```javascript
export default class UseEffectDemo extends Component {
  state = {
    project: 'Foo',
  };

  render() {
    const { project } = this.state;

    return (
      <div>
        <button
          onClick={() =>
            this.setState({
              project: project === 'Foo' ? 'Bar' : 'Foo',
            })
          }
        >
          Change Project
        </button>
        <br />
        {/* <UseEffectComponent project={project} /> */}
        {
          project === 'Foo' ? <UseEffectComponent project={project} /> : 'Bar'
        }
      </div>
    );
  }
}

```