import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TodoCard } from './TodoCard';

const TODO = {
  id: 'mongo-object-id',
  title: '할 일',
  completed: false,
};

describe('TodoCard', () => {
  /**
   * Rendering Test
   */
  it('타이틀이 렌더링된다.', () => {
    render(<TodoCard todo={TODO} onToggle={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByTestId('할 일')).toBeInTheDocument();
  });

  it('미완료 상태일 때 체크박스가 해제되어 있다.', () => {
    render(<TodoCard todo={TODO} onToggle={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('완료 상태일 때 체크박스가 체크되어 있다.', () => {
    render(
      <TodoCard
        todo={{ ...TODO, completed: true }}
        onToggle={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('완료 상태일 때 타이틀에 취소선이 그어져 있다.', () => {
    render(
      <TodoCard
        todo={{ ...TODO, completed: true }}
        onToggle={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText('할 일')).toHaveClass('line-through');
  });

  async function enterEdit() {
    await userEvent.hover(screen.getByTestId('todo-card'));
    await userEvent.click(screen.getByRole('button', { name: /수정/ }));
  }

  it('Edit 버튼 클릭 시 input이 표시된다.', async () => {
    render(<TodoCard todo={TODO} onToggle={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);

    await enterEdit();

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('Edit 진입 시 기존 타이틀이 input에 채워진다.', async () => {
    render(<TodoCard todo={TODO} onToggle={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);

    await enterEdit();

    expect(screen.getByRole('textbox')).toHaveValue('할 일');
  });

  it('ESC 입력 시에 편집이 취소된다.', async () => {
    render(<TodoCard todo={TODO} onToggle={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);

    await enterEdit();
    await userEvent.clear(screen.getByRole('textbox'));
    await userEvent.type(screen.getByRole('textbox'), '수정된 할 일{Escape}');

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByText('할 일')).toBeInTheDocument();
  });

  /**
   * Mouse Hover Test
   */
  it('초기 상태에서 수정/삭제 버튼이 표시되지 않는다.', () => {
    render(<TodoCard todo={TODO} onToggle={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.queryByRole('button', { name: /수정/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /삭제/ })).not.toBeInTheDocument();
  });

  it('마우스 호버 시 수정/삭제 버튼이 표시된다.', async () => {
    render(<TodoCard todo={TODO} onToggle={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);

    await userEvent.hover(screen.getByTestId('todo-card'));

    expect(screen.getByRole('button', { name: /수정/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /삭제/ })).toBeInTheDocument();
  });

  it('마우스 호버 해제 시 다시 수정/삭제 버튼이 사라진다.', async () => {
    render(<TodoCard todo={TODO} onToggle={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);

    await userEvent.hover(screen.getByTestId('todo-card'));
    await userEvent.unhover(screen.getByTestId('todo-card'));

    expect(screen.queryByRole('button', { name: /수정/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /삭제/ })).not.toBeInTheDocument();
  });

  /**
   * Handler Test
   */
  it('체크박스 클릭 시 onToggle이 호출된다.', async () => {
    const onToggle = vi.fn();
    render(<TodoCard todo={TODO} onToggle={onToggle} onEdit={vi.fn()} onDelete={vi.fn()} />);

    await userEvent.click(screen.getByRole('checkbox'));

    expect(onToggle).toHaveBeenCalledOnce();
    expect(onToggle).toHaveBeenCalledWith('mongo-object-id');
  });

  it('삭제버튼 클릭 시 onDelete가 호출된다.', async () => {
    const onDelete = vi.fn();
    render(<TodoCard todo={TODO} onToggle={vi.fn()} onEdit={vi.fn()} onDelete={onDelete} />);

    await userEvent.hover(screen.getByTestId('todo-card'));
    await userEvent.click(screen.getByRole('button', { name: /삭제/ }));

    expect(onDelete).toHaveBeenCalledOnce();
    expect(onDelete).toHaveBeenCalledWith('mongo-object-id');
  });

  it('Enter 키 입력 시 onEdit이 호출된다.', async () => {
    const onEdit = vi.fn();
    render(<TodoCard todo={TODO} onToggle={vi.fn()} onEdit={onEdit} onDelete={vi.fn()} />);

    await enterEdit();
    await userEvent.clear(screen.getByRole('textbox'));
    await userEvent.type(screen.getByRole('textbox'), '수정된 할 일{Enter}');

    expect(onEdit).toHaveBeenCalledOnce();
    expect(onEdit).toHaveBeenCalledWith('mongo-object-id', '수정된 할 일');
  });

  it('input의 포커스를 잃게되면 onEdit이 호출된다.', async () => {
    const onEdit = vi.fn();
    render(<TodoCard todo={TODO} onToggle={vi.fn()} onEdit={onEdit} onDelete={vi.fn()} />);

    await enterEdit();
    await userEvent.clear(screen.getByRole('textbox'));
    await userEvent.type(screen.getByRole('textbox'), '수정된 할 일');
    await userEvent.tab();

    expect(onEdit).toHaveBeenCalledWith('mongo-object-id', '수정된 할 일');
  });

  it('input이 비어있을 땐 onEdit이 호출되지 않는다.', async () => {
    const onEdit = vi.fn();
    render(<TodoCard todo={TODO} onToggle={vi.fn()} onEdit={onEdit} onDelete={vi.fn()} />);

    await enterEdit();
    await userEvent.clear(screen.getByRole('textbox'));
    await userEvent.type(screen.getByRole('textbox'), '{Enter}');

    expect(onEdit).not.toHaveBeenCalled();
  });
});
