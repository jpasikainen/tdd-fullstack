import React, { useState } from "react";
import Todo from "./Todo";

export default function AddTodo() {
  const [getTodos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");

  const add = () => {
    setTodos([...getTodos, {name: todoName, completed: false}]);
    setTodoName("");
  }


  return (
    <div>
      <div>
        <input type="text"/>
        <button onClick={add}>Add</button>
      </div>
      {getTodos.map((todo, i) => {
        return <Todo name={todo.name} completed={todo.completed} key={i} />
      })}
    </div>
  );
}