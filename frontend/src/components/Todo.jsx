import React, { useState } from "react";

export default function Todo({id, name, completed, updateCallback, toggleCallback}) {
  return (
    <div className={completed ? 'completed' : ''}>
      <input type='text' onChange={e => updateCallback(id, e)} value={name} />
      <button onClick={() => toggleCallback(id)}>Complete</button>
    </div>
  );
}