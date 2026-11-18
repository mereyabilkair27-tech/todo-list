import TodoListItem from "./TodoListItem";

function TodoList({ todoList, onCompleteTodo, onUpdateTodo }) {
  return (
    <ul>
      {todoList
      .filter((todo) => !todo.isCompleted)
      .map((todo) => (
        <TodoListItem
        key={todo.id}
        todo={todo}
        onCompleteTodo={onCompleteTodo}
        onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
