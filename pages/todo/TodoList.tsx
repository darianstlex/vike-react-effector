import React, { useState } from 'react';

import { Input } from '@components/Input';

import { onNewTodo } from './TodoList.telefunc';

export function TodoList({ initialTodoItems }: { initialTodoItems: { text: string }[] }) {
  const [todoItems, setTodoItems] = useState(initialTodoItems);
  const [newTodo, setNewTodo] = useState('');
  return (
    <>
      <ul>
        {todoItems.map((todoItem) => (
          <li key={todoItem.text}>{todoItem.text}</li>
        ))}
      </ul>
      <div>
        <form
          onSubmit={async (ev) => {
            ev.preventDefault();

            // Optimistic UI update
            setTodoItems((prev) => [...prev, { text: newTodo }]);
            try {
              await onNewTodo({ text: newTodo });
              setNewTodo('');
            } catch (e) {
              console.error(e);
              // rollback
              setTodoItems((prev) => prev.slice(0, -1));
            }
          }}
        >
          <Input label="Todo title" name="name" type="text" onChange={(val) => setNewTodo(val)} value={newTodo} />{' '}
          <button type="submit">Add to-do</button>
        </form>
      </div>
    </>
  );
}
