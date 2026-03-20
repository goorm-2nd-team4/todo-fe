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
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center">
      {/* spacer */}
      <div className="h-[25vh]" />

      {/* Title & Task Count */}
      <div className="text-center">
        <h1 className="font-bold text-[72px] text-[#1a1a1a] tracking-tight">TODO APP</h1>
        <p className="text-[16px] text-[#6e7781]">
          {todos.filter((t) => t.completed).length} of {todos.length} tasks completed
        </p>
      </div>

      {/* spacer */}
      <div className="h-[1vh]" />

      {/* TodoList Component */}
      <TodoList todos={todos} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
