import { useEffect, useState } from 'react';
import { getTodos, updateTodo, createTodo, deleteTodo } from '../api/todos';
import type { Todo } from '../types/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  /** 컴포넌트 마운트 시 Todo 목록을 불러옴 */
  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  /**
   * 새로운 Todo 추가
   * @param title - 추가할 Todo의 내용
   */
  const handleAdd = async (title: string) => {
    const newTodo = await createTodo(title);
    setTodos((prev) => [...prev, newTodo]);
  };

  /**
   * Todo의 완료 여부 수정
   * @param id - 수정할 Todo의 id
   */
  const handleToggle = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updated = await updateTodo(id, { title: todo.title, completed: !todo.completed });
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  /**
   * Todo의 내용 수정
   * @param id - 수정할 Todo의 id
   * @param newTitle - 수정할 Todo의 내용
   */
  const handleEdit = async (id: string, newTitle: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updated = await updateTodo(id, { title: newTitle, completed: todo.completed });
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  /**
   * Todo 삭제
   * @param id - 삭제할 Todo의 id
   */
  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return { todos, handleAdd, handleEdit, handleToggle, handleDelete };
}
