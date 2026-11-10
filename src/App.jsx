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
    const updatedTodos = todoList.map((todo) => 
      (todo.id === id)
        ? { ...todo, isCompleted: true}
        : todo
    );

    setTodoList(updatedTodos);
  }

  function UpdateTodo(editedTodo) {
    const updatedTodos = todoList.map((todo) =>
      todo.id === editedTodo.id
        ? { ...editedTodo }
        : todo
    );

    setTodoList(updatedTodos);
  }

  return (
    <div>
      <h1>My Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} 
      onCompleteTodo={completeTodo}
      onUpdateTodo={UpdateTodo}
      />
    </div>
  );
}

export default App;
