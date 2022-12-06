import React, { useState, useEffect, useRef } from "react";
import Add from "./components/Add";
import List from "./components/List";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [totalChecked, setTotalChecked] = useState(0);
  const [sortTodoList, setSortTodoList] = useState(false);
  const sortBtn = useRef(null);
  const sortBigBtn = useRef(null);
  const listRef = useRef(null);
  //更新todoList資料
  function addTodo(data) {
    setTodoList([...todoList, data]);
    //自動跳到最新的todo
    setTimeout(() => {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }, 0);
  }
  //刪除todo
  function deleteTodo(id) {
    let newTodoList = todoList.filter((todo) => {
      return todo.id !== id;
    });
    setTodoList(newTodoList);
  }
  //更改todo的complete狀態
  function checkedTodo(id) {
    let newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodoList(newTodoList);
  }
  //TodoList排序方式切換
  function sortChecked() {
    setSortTodoList(!sortTodoList);
    if (!sortTodoList) {
      sortBtn.current.style = "margin-left:20px;background-color:white";
      sortBigBtn.current.style = "background-color:rgb(122, 158, 197);";
      let trueTodo = todoList.filter((todo) => {
        return todo.isCompleted === true;
      });
      let falseTodo = todoList.filter((todo) => {
        return todo.isCompleted !== true;
      });
      setTodoList([...falseTodo, ...trueTodo]);
    } else {
      sortBtn.current.style = "margin-left:1px";
      sortBigBtn.current.style = "background-color:white";
      setTodoList(todoList.sort((a, b) => a.time - b.time));
    }
  }

  //TodoList完成度
  useEffect(() => {
    let total = todoList.reduce((total, todo) => {
      return total + (todo.isCompleted ? 1 : 0);
    }, 0);
    setTotalChecked(
      total > 0 ? Math.floor((total / todoList.length) * 100) : 0
    );
  }, [todoList]);

  return (
    <div className="App">
      <div className="container">
        <div className="wrap">
          <h1>Todo List</h1>
          <h3>Add things to do</h3>
          <h2 className="progress">
            {totalChecked}%
            <progress min="0" max="100" value={totalChecked}></progress>
          </h2>
          <List
            todoList={todoList}
            deleteTodo={deleteTodo}
            checkedTodo={checkedTodo}
            listRef={listRef}
          ></List>
          <h2 className="sort">
            Move done things to end?
            <div className="big-btn" ref={sortBigBtn}>
              <div
                className="small-btn"
                ref={sortBtn}
                onClick={sortChecked}
              ></div>
            </div>
          </h2>
          <Add addTodo={addTodo}></Add>
        </div>
      </div>
    </div>
  );
}

export default App;
