import React, { useEffect, useState } from "react";
import Todo from "./Todo";

export default function TodoManager({getAll, create, put, deleteAll}) {
  const [getTodos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");

  useEffect(() => {
    (async () => {
      let res = await getAll();
      setTodos(res);
    })();
  }, [getAll]);

  const add = async () => {
    const json = await create(todoName);
    setTodos([...getTodos, {id: json.id, name: todoName, completed: false}]);
    console.log([...getTodos, {id: json.id, name: todoName, completed: false}])
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
    await put(id, e.target.value, c);
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
    await put(id, n, c);
  }

  const archive = async () => {
    const updatedTodos = getTodos.filter(todo => todo.completed === false);
    setTodos(updatedTodos);

    const deleteTodos = getTodos.filter(todo => todo.completed === true);
    const deleteIds = [];
    for (const todo in deleteTodos) {
      deleteIds.push(deleteTodos[todo].id);
    }

    await deleteAll();
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