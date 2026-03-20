import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { DUMMY_TODOS } from './mocks/todos';
import type { Todo } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>(DUMMY_TODOS);

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const handleEdit = (id: string, newTitle: string) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo)));
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-center">TODO APP</h1>
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
