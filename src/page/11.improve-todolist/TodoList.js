import React, { useState, useCallback } from 'react';
import TodoForm from './TodoForm';

const App = () => {
  const [todos, setTodos] = useState([]);

  const toggleComplete = (i) => setTodos(todos.map((todo, k) => k === i ? {
    ...todo,
    complete: !todo.complete
  } : todo))

  const onSubmit = useCallback(
    text => setTodos([{ text, complete: false }, ...todos]),
    [todos]
  )

  return (
    <div>
      <TodoForm onSubmit={ onSubmit } />
      <div>
        {
          todos.map(({ text, complete }, i) => (
            <div
              key={ `${text}-${i}` }
              onClick={ () => toggleComplete(i)  }
              style={{ textDecoration: complete ? "line-through" : "" }}
            >
              { text }
            </div>
          ))
        }
      </div>
      <button onClick={ () => setTodos([]) }>reset</button>
    </div>
  );
}

export default App;