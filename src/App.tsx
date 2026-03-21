import React, { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todoData, setTodoData] = useState<TodoItem[]>([]);
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;

    const newTodo: TodoItem = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    setTodoData((prev) => [...prev, newTodo]);
    setValue('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">TODO APP</h1>

        <TodoForm value={value} setValue={setValue} handleSubmit={handleSubmit} />

        <div className="mt-8 border-t border-gray-100 pt-4">
          <ul className="space-y-3">
            {todoData.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium"
              >
                {todo.title}
              </li>
            ))}
          </ul>
          {todoData.length === 0 && (
            <p className="text-center text-gray-400 text-sm mt-4">등록된 할 일이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
