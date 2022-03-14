import React, { useEffect, useState } from "react";
import Todo from "./Todo";

export default function TodoManager({getAll}) {
  const [getTodos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:8080/", {
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin':'*'
          }
        });
        if (!res.ok) return;
        const todos = await res.json();
        setTodos(todos);
      } catch (err) { setTodos([]); }
    }
    load();
  }, [getAll]);

  const add = async () => {
    await fetch("http://localhost:8080/", {
      method: 'POST',
      mode: 'cors',
      headers: { 'Access-Control-Allow-Origin':'*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, name: todoName, completed: false })
    });

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