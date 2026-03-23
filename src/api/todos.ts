import type { Todo } from '../types/todo';

/** .env를 통한 API 기본 URL import */
const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

/**
 * 전체 Todo 목록 조회
 * @returns Todo[]
 */
export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}api/todos`);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

/**
 * 새로운 Todo 생성
 * @param title - 생성할 Todo 내용
 * @returns 생성된 Todo
 */
export async function createTodo(title: string): Promise<Todo> {
  const res = await fetch(`${BASE_URL}api/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('Failed to create todo');
  return res.json();
}

/**
 * 기존 Todo 수정
 * @param id - 수정할 Todo의 id
 * @param data - 수정할 Todo의 title 및 completed 값
 * @returns 수정된 Todo
 */
export async function updateTodo(
  id: string,
  data: { title: string; completed: boolean },
): Promise<Todo> {
  const res = await fetch(`${BASE_URL}api/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
}

/**
 * Todo 삭제
 * @param id - 삭제할 Todo의 id
 */
export async function deleteTodo(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}api/todos/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete todo');
}
