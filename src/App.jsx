import { useState } from "react";
import TodoList from "./TodoList.jsx";
import TodoForm from "./TodoForm.jsx";
import "./App.css";

const todos = [
  { id: 1, title: "Eat breakfast" },
  { id: 2, title: "Go to the gym" },
  { id: 3, title: "Work on my assignments" },
];

function App() {
  const [todoList, setTodoList] = useState(todos);

  return (
    <div>
      <h1>My Todo List</h1>
      <TodoForm />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
