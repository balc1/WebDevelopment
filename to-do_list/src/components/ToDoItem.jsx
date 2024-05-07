import React from "react";

function ToDoItem(props) {
  const [fareUzerinde, setFareUzerinde] = React.useState(false);
  return (
    <div
      onClick={() => {
        props.onChecked(props.id);
      }}
      onMouseOver={() => setFareUzerinde(true)}
      onMouseLeave={() => setFareUzerinde(false)}
    >
      <li className={fareUzerinde ? 'on-Mouse' : ''}>{props.text}</li>
    </div>
  );
}

export default ToDoItem;
