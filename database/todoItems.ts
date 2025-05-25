interface TodoItem {
  text: string;
}

const todos = {
  todo: [{ text: 'Buy milk' }, { text: 'Buy strawberries' }] as TodoItem[],
};

export { todos };
export type { TodoItem };
