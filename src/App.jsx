import "./App.css";
function App() {
  const todoList = [
    { id: 1, title: "Eat breakfast" },
    { id: 2, title: "Go to the gym" },
    { id: 3, title: "Work on my assignments" },
  ];

  return (
    <div>
      <h1>My Todo List</h1>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
