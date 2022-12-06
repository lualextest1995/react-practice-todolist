import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Add = ({ addTodo }) => {
  const [todo, setTodo] = useState("");
  //取得搜尋欄輸入的值
  function inputValue(e) {
    setTodo(e.target.value);
  }
  //滑鼠點擊傳送todo
  function sendTodo() {
    if (todo.trim() === "") {
      alert("輸入代辦事項不可以空白");
      return;
    }
    addTodo({
      id: uuidv4(),
      title: todo,
      isCompleted: false,
      time: Date.now(),
    });
    setTodo("");
  }
  //鍵盤點擊傳送todo
  function sendTodo_Key(event) {
    if (event.key === "Enter") {
      sendTodo();
    }
  }

  return (
    <div className="add">
      <h2>Add to list</h2>
      <div className="box">
        <input
          type="text"
          autoFocus
          value={todo}
          onChange={inputValue}
          onKeyDown={sendTodo_Key}
        />
        <button onClick={sendTodo}>+</button>
      </div>
    </div>
  );
};

export default Add;
