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
    const res = await fetch("http://localhost:8080/", {
      method: 'POST',
      mode: 'cors',
      headers: { 'Access-Control-Allow-Origin':'*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, name: todoName, completed: false })
    });
    const latestId = await res.json().id;

    setTodos([...getTodos, {id: id, name: todoName, completed: false}]);
    setId(latestId + 1);
    setTodoName("");
  }

  const change = (e) => {
    setTodoName(e.target.value);
  }

  const update = async (id, e) => {
    let c = false;
    const updatedTodos = getTodos.map(todo => {
      if (todo.id === id) {
        c = todo.completed;
        return {...todo, name: e.target.value}
      }
      return todo;
    })
    setTodos(updatedTodos);
    await fetch("http://localhost:8080/", {
      method: 'PUT',
      mode: 'cors',
      headers: { 'Access-Control-Allow-Origin':'*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, name: e.target.value, completed: c })
    });
  }

  const toggle = async (id) => {
    let c = false;
    let n = "";
    const updatedTodos = getTodos.map(todo => {
      if (todo.id === id) {
        c = !todo.completed;
        n = todo.name;
        return {...todo, completed: !todo.completed}
      }
      return todo;
    })
    setTodos(updatedTodos);
    await fetch("http://localhost:8080/", {
      method: 'PUT',
      mode: 'cors',
      headers: { 'Access-Control-Allow-Origin':'*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, name: n, completed: c })
    });
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