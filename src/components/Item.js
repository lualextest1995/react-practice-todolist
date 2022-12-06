import React from "react";

const Item = ({ todo, deleteTodo, checkedTodo }) => {
  function handleDelete(id) {
    deleteTodo(id);
  }
  function handleChecked(id) {
    checkedTodo(id);
  }
  return (
    <div className="item">
      <div className="itemHeader"></div>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => {
          handleChecked(todo.id);
        }}
      />
      <p style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}>
        {todo.title}
      </p>
      <p
        className="btn-delete"
        onClick={() => {
          handleDelete(todo.id);
        }}
      >
        x
      </p>
    </div>
  );
};

export default Item;
