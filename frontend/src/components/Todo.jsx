import React from "react";

export default function Todo({name, completed}) {
  return (
    <div>
      {name} {completed}
    </div>
  );
}