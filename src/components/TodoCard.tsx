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

  return (
    <div
      data-testid="todo-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Checkbox */}
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />

      {/* Title (& Edit mode Input) */}
      {isEditing ? (
        <input
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
        />
      ) : (
        <span data-testid={todo.title} className={todo.completed ? 'line-through' : ''}>
          {todo.title}
        </span>
      )}

      {/* onHover */}
      {isHovered && (
        <>
          <button
            aria-label={`${todo.title} 수정`}
            onClick={() => {
              setIsEditing(true);
              setEditValue(todo.title);
            }}
          >
            수정
          </button>
          <button aria-label={`${todo.title} 삭제`} onClick={() => onDelete(todo.id)}>
            삭제
          </button>
        </>
      )}
    </div>
  );
}
