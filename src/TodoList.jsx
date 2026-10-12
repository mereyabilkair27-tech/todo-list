function TodoList() {
  const todoList = [
    { id: 1, title: "Eat breakfast" },
    { id: 2, title: "Go to the gym" },
    { id: 3, title: "Work on my assignments" },
  ];

  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
export default TodoList;
