// 타입 정의

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

// Todos는 Todo 배열로 취급한다.
export type Todos = Todo[];
