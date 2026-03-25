import type { Todos } from '../types/todo';
import { TodoCard } from './TodoCard';

interface TodoListProps {
  todos: Todos;
  onToggle: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onEdit, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16 text-[#9ca3af] text-[15px]">
        <p>No tasks</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-[12px] w-[668px]">
      {todos.map((todo) => (
        <div key={todo.id}>
          <TodoCard todo={todo} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
