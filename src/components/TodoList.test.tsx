import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TodoList } from './TodoList';

const TODOS = [
  { id: '1', title: '할 일 1', completed: false },
  { id: '2', title: '할 일 2', completed: true },
];

describe('TodoList', () => {
  /**
   * Rendering Test
   */
  it('todos가 비어있을 때 빈 상태 메시지가 표시된다.', () => {
    render(<TodoList todos={[]} onToggle={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('할 일 목록이 비어있습니다.')).toBeInTheDocument();
  });

  it('todo의 개수만큼 카드가 렌더링된다.', () => {
    render(<TodoList todos={TODOS} onToggle={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getAllByTestId('todo-card')).toHaveLength(TODOS.length);
  });

  it('각 todo의 타이틀이 표시된다.', () => {
    render(<TodoList todos={TODOS} onToggle={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('할 일 1')).toBeInTheDocument();
    expect(screen.getByText('할 일 2')).toBeInTheDocument();
  });
});
