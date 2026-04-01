import React from 'react';

interface TodoFormProps {
  value: string;
  setValue: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const TodoForm = ({ value, setValue, handleSubmit }: TodoFormProps) => {
  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center bg-white p-2 pl-6 rounded-[32px] shadow-xl border border-gray-100 focus-within:ring-4 focus-within:ring-blue-100 transition-all duration-500"
    >
      <input
        type="text"
        className="flex-1 py-4 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 text-xl font-medium"
        placeholder="할 일을 입력하세요..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      
      <button
        type="submit"
        style={{ backgroundColor: '#007AFF' }} // 테일윈드 대신 스타일로 강제 파란색 지정
        className="w-14 h-14 flex items-center justify-center text-white rounded-full shadow-lg shadow-blue-200 transition-all active:scale-90 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed group"
        disabled={!value.trim()}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="group-hover:rotate-90 transition-transform duration-300"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </form>
  );
};

export default TodoForm;