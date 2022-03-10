import React, { useState } from "react";
import Todo from "./Todo";

export default function AddTodo() {
  const [getTodos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [id, setId] = useState(0);

  const add = () => {
    setTodos([...getTodos, {id: id, name: todoName, completed: false}]);
    setId(id + 1);
    setTodoName("");
  }

  const change = (e) => {
    setTodoName(e.target.value);
  }

  const update = (id, e) => {
    const updatedTodos = getTodos.map(todo => {
      if (todo.id === id) return {...todo, name: e.target.value}
      return todo;
    })
    setTodos(updatedTodos);
  }

  const toggle = (id) => {
    const updatedTodos = getTodos.map(todo => {
      if (todo.id === id) return {...todo, completed: !todo.completed}
      return todo;
    })
    setTodos(updatedTodos);
  }

  const archive = () => {
    const updatedTodos = getTodos.filter(todo => todo.completed === false);
    setTodos(updatedTodos);
  }

  return (
    <div>
      <div>
        <input type="text" onChange={e => change(e)} value={todoName} />
        <button onClick={add}>Add</button>
        <button onClick={archive}>Archive</button>
      </div>
      {getTodos.map((todo, i) => {
        return (
        <Todo
          id={todo.id}
          name={todo.name}
          completed={todo.completed}
          toggleCallback={toggle}
          updateCallback={update}
          key={i}
        />
        )
      })}
    </div>
  );
}