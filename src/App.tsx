import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';

interface Todo {
  id: string | number;
  title: string;
  completed: boolean;
}

function App() {
  const { todos, handleEdit, handleDelete, handleToggle, handleAdd } = useTodos() as {
    todos: Todo[];
    handleEdit: (id: string | number, title: string) => void;
    handleDelete: (id: string | number) => void;
    handleToggle: (id: string | number) => void;
    handleAdd?: (title: string) => void;
  };

  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;

    if (handleAdd) {
      handleAdd(value);
    }
    
    setValue('');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center p-4">
      {/* 상단 여백 */}
      <div className="h-[15vh] md:h-[20vh]" />

      {/* 제목 섹션 */}
      <div className="text-center mb-12">
        <h1 className="font-bold text-[48px] md:text-[72px] text-[#1a1a1a] tracking-tight leading-none">TODO APP</h1>
        <p className="text-[16px] text-[#6e7781] mt-4 font-medium">
          {todos.filter((t) => t.completed).length} of {todos.length} tasks completed
        </p>
      </div>

      {/* 입력창 섹션 */}
      <div className="w-full max-w-[550px]">
        <TodoForm value={value} setValue={setValue} handleSubmit={handleSubmit} />
      </div>

      {/* 간격 벌리기  */}
      <div className="h-20" /> 

      {/* 리스트 섹션 */}
      <div className="w-full max-w-[550px]">
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