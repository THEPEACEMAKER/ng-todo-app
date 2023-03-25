export interface Todo {
  id: number,
  todo: string,
  completed: boolean,
  favorite?: boolean,
  userId: number
}
