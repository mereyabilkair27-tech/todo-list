import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList/TodoList";

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [isTodoListLoading, setIsTodoListLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsTodoListLoading(false);
      return;
    }

    async function fetchTodos() {
      setIsTodoListLoading(true);
      setError("");

      try {
        const response = await fetch("/api/tasks?page=0&limit=99", {
          method: "GET",
          credentials: "include",
          headers: {
            "X-CSRF-TOKEN": token,
          },
        });

        if (response.status === 401) {
          throw new Error("Unauthorized. Please log in again.");
        }

        if (!response.ok) {
          throw new Error("Could not load your todos.");
        }

        const data = await response.json();
        setTodoList(data.tasks || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsTodoListLoading(false);
      }
    }

    fetchTodos();
  }, [token]);

  async function addTodo(todoTitle) {
    const temporaryTodo = {
      id: `temp-${Date.now()}`,
      title: todoTitle,
      isCompleted: false,
    };

    setTodoList((previous) => [temporaryTodo, ...previous]);
    setError("");

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify({
          title: todoTitle,
          isCompleted: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not add the todo.");
      }

      const data = await response.json();
      const savedTodo = data.task || data;

      setTodoList((previous) =>
        previous.map((todo) =>
          todo.id === temporaryTodo.id ? savedTodo : todo,
        ),
      );
    } catch (error) {
      setTodoList((previous) =>
        previous.filter((todo) => todo.id !== temporaryTodo.id),
      );
      setError(error.message);
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);

    if (!originalTodo) return;

    setTodoList((previous) =>
      previous.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo,
      ),
    );
    setError("");

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify({
          isCompleted: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not complete the todo.");
      }
    } catch (error) {
      setTodoList((previous) =>
        previous.map((todo) => (todo.id === id ? originalTodo : todo)),
      );
      setError(error.message);
    }
  }

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    if (!originalTodo) return;

    setTodoList((previous) =>
      previous.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo)),
    );
    setError("");

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not update the todo.");
      }
    } catch (error) {
      setTodoList((previous) =>
        previous.map((todo) =>
          todo.id === editedTodo.id ? originalTodo : todo,
        ),
      );
      setError(error.message);
    }
  }

  return (
    <main>
            <h1>My Todo List</h1>
            
      {error && (
        <div role="alert">
                    <p>{error}</p>
                    
          <button type="button" onClick={() => setError("")}>
                        Clear Error           
          </button>
                  
        </div>
      )}
            
      {isTodoListLoading ? (
        <p>Loading todos...</p>
      ) : (
        <>
                    
          <TodoForm onAddTodo={addTodo} />
                    
          <TodoList
            todoList={todoList}
            onCompleteTodo={completeTodo}
            onUpdateTodo={updateTodo}
          />
                  
        </>
      )}
          
    </main>
  );
}

export default TodosPage;
