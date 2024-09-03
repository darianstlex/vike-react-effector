import type { Get, UniversalHandler } from '@universal-middleware/core';

export const createTodoHandler: Get<[], UniversalHandler> = () => async (request) => {
  // In a real case, user-provided data should ALWAYS be validated with tools like zod
  const newTodo = (await request.json()) as { text: string };

  console.log('Received new todo', newTodo);

  return new Response(JSON.stringify({ status: 'OK' }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
};
