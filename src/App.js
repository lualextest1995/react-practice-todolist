import React, { useState, useEffect, useRef } from "react";
import Add from "./components/Add";
import List from "./components/List";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [totalChecked, setTotalChecked] = useState(0);
  const [sortTodoList, setSortTodoList] = useState(false);
  const listRef = useRef(null);
  //更新todoList資料
  function addTodo(data) {
    setTodoList([...todoList, data]);
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
      let trueTodo = todoList.filter((todo) => {
        return todo.isCompleted === true;
      });
      let falseTodo = todoList.filter((todo) => {
        return todo.isCompleted !== true;
      });
      setTodoList([...falseTodo, ...trueTodo]);
    } else {
      setTodoList(todoList.sort((a, b) => a.time - b.time));
    }
  }
  //todolist資料更新自動跳到最新的todo
  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [todoList]);

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
            <div className={sortTodoList ? "sort-big-btn" : "big-btn"}>
              <div
                className={sortTodoList ? "sort-small-btn" : "small-btn"}
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
