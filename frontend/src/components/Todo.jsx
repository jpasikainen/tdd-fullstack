import React, { useState } from "react";

export default function Todo({name, completed}) {
  const [isCompleted, setCompleted] = useState(completed);

  const toggle = () => {
    setCompleted(!isCompleted);
  } 

  return (
    <div className={isCompleted ? 'completed' : ''}>
      {name}
      <button onClick={toggle}>Complete</button>
    </div>
  );
}