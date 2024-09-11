import { todos } from '@/database/todoItems';

export async function onNewTodo({ text }: { text: string }) {
  console.log('Received new todo', { text });
  todos.todo.push({ text });
}
