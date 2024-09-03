export async function onNewTodo({ text }: { text: string }) {
  console.log('Received new todo', { text });
}
