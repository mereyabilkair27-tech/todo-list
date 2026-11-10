import { useState } from "react";
import TodoList from "./features/TodoList/TodoList";
import TodoForm from "./features/TodoForm";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  
  function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    setTodoList((previous) => [newTodo, ...previous]);
  }
  function completeTodo(id) {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true};
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  }
  return (
    <div>
      <h1>My Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} 
      onCompleteTodo={completeTodo}
      />
    </div>
  );
}

export default App;
