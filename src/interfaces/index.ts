export interface ITodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export interface IDict<T> {
  [key: string]: T;
}
