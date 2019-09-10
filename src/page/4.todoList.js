
//编写todoList
import React, { useState } from 'react';


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

export default App;