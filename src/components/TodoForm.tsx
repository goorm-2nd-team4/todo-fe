import React from 'react';

interface TodoFormProps {
  value: string;
  setValue: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const TodoForm = ({ value, setValue, handleSubmit }: TodoFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        className="flex-1 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 transition"
      >
        추가
      </button>
    </form>
  );
};

export default TodoForm;
