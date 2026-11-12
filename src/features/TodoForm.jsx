import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../utils/todoValidation";

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  const todoTitleRef = useRef(null);

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle("");
  };

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle" 
        labelText="Todo"
        ref={todoTitleRef}
        value={workingTodoTitle}
        onChange={(event) => 
          setWorkingTodoTitle(event.target.value)
        }
      />

      <button 
        type="submit"
        disabled={!isValidTodoTitle(workingTodoTitle)}
      >
        Add Todo
      </button>
    </form>
  );
}
export default TodoForm;
