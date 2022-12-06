import React from "react";
import Item from "./Item";

const List = ({ todoList, deleteTodo, checkedTodo, listRef }) => {
  return (
    <div className="list" ref={listRef}>
      {todoList.map((todo) => {
        return (
          <Item
            todo={todo}
            key={todo.id}
            deleteTodo={deleteTodo}
            checkedTodo={checkedTodo}
          ></Item>
        );
      })}
    </div>
  );
};

export default List;
