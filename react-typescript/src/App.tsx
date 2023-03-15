import React, { useState } from 'react';

import TodoModel from './todo.model';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';


const App: React.FunctionComponent = () => {

  const [todos, setTodos] = useState<TodoModel[]>([])



  const todoAddHandler = (text: string) => {
    //prevToodos = solicita todos los todos previos y a continuación setea el estado con la nueva entrada
    setTodos(prevTodos => [...prevTodos, { id: Math.random().toString(), text: text }])
  }

  const todoDeleteHandler = (todoId: string) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== todoId) //Filter elimina todo lo que de como resultado false.
    })
  }

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler}  />
      <TodoList items={ todos} onDeleteTodo={todoDeleteHandler }/>
    </div>
  );
}

export default App;
