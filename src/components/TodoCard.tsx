import { useState } from 'react';
import type { Todo } from '../types/todo';

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}

export function TodoCard({ todo, onToggle, onEdit, onDelete }: TodoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 3;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple-effect');
    button.appendChild(circle);
    circle.addEventListener('animationend', () => circle.remove());
  };

  return (
    <div
      data-testid="todo-card"
      className="h-[68px] relative w-[668px] transition-transform duration-200 hover:scale-[1.01]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 rounded-[20px] bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)]" />
      <div className="absolute h-[16px] left-[28px] top-[26px] flex items-center gap-[12px] w-[552px]">
        {/* Checkbox */}
        <button
          role="checkbox"
          aria-checked={todo.completed}
          onClick={() => onToggle(todo.id)}
          className="relative rounded-[6px] shrink-0 size-[20px] cursor-pointer flex items-center justify-center"
        >
          {todo.completed ? (
            <div className="absolute inset-0 rounded-[6px] bg-[#0d6fff]" />
          ) : (
            <div className="absolute inset-0 rounded-[6px] bg-white border-2 border-[#d1d5db]" />
          )}
          {todo.completed && (
            <div className="h-[8.93px] relative shrink-0 w-[9.31px] z-10">
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 9.31 8.93"
              >
                <path
                  d="M3.67605 8.93C4.04565 8.93 4.32535 8.78984 4.51515 8.49952L9.11022 1.46164C9.25007 1.24139 9.31 1.05118 9.31 0.860964C9.31 0.360404 8.93041 0 8.41097 0C8.06134 0 7.85157 0.130146 7.6318 0.460516L3.64608 6.77759L1.60827 4.22473C1.40849 3.98446 1.19871 3.87434 0.899034 3.87434C0.379592 3.87434 0 4.24475 0 4.75532C0 4.97557 0.0699249 5.1758 0.259721 5.39604L2.83695 8.53956C3.05672 8.80986 3.31644 8.93 3.66606 8.93H3.67605Z"
                  fill="white"
                />
              </svg>
            </div>
          )}
        </button>

        {/* Title (& Edit mode Input) */}
        {isEditing ? (
          <input
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (editValue.trim()) onEdit(todo.id, editValue);
                setIsEditing(false);
              }
              if (e.key === 'Escape') {
                setIsEditing(false);
              }
            }}
            onBlur={() => {
              if (editValue.trim()) onEdit(todo.id, editValue);
              setIsEditing(false);
            }}
            className="flex-1 text-[13px] 'text-[#1a1a1a] outline-none bg-transparent"
          />
        ) : (
          <span
            data-testid={todo.title}
            className={`flex-1 text-[13px] ${todo.completed ? 'text-[#8e8e93] line-through' : 'text-[#1a1a1a]'}`}
          >
            {todo.title}
          </span>
        )}
      </div>

      {/* onHover */}
      {isHovered && (
        <>
          <button
            aria-label={`${todo.title} 수정`}
            onClick={(e) => {
              setIsEditing(true);
              setEditValue(todo.title);
              handleRipple(e);
            }}
            className="absolute top-1/2 -translate-y-1/2 left-[580px] text-[#0d6fff] text-[14px] font-bold cursor-pointer"
          >
            수정
          </button>
          <button
            aria-label={`${todo.title} 삭제`}
            onClick={() => onDelete(todo.id)}
            className="absolute left-[630px] top-[20px] size-[28px] flex items-center justify-center cursor-pointer"
          >
            <svg viewBox="0 0 14.5 14.5" className="size-[18px]" fill="none">
              <path
                d="M13.25 1.25L1.25 13.25M1.25 1.25L13.25 13.25"
                stroke="#FF383C"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
