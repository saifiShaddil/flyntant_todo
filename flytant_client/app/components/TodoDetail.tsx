'use client';

import React, { useEffect, useState } from 'react';
import { Todo } from '../page';

type Props = {
  todo: Todo | null;
  setTodo: (updated: Todo) => void;
  onDelete: (id: string) => void;
};

export function TodoDetail({ todo, setTodo, onDelete }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


   // Handle delete API call
   const handleDelete = async () => {
    if (todo && todo._id) {
      try {
        // const response = await fetch(`/api/todos/${todo._id}`, { method: 'DELETE' });
        onDelete(todo._id);
        // if (response.ok) {
        // } else {
        //   console.error('Failed to delete todo');
        // }
        setDescription('')
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  };

  // Update local state when the `todo` prop changes.
  useEffect(() => {
    if (todo === null) {
      setTitle('');
      setDescription('');
      return;
    }
    setTitle(todo.title);
    setDescription(todo.description);
  }, [todo]);

  return (
    <div className="rounded p-4 h-full bg-white">
      {/* Title and Delete Icon */}
      <div className="flex justify-between items-center w-full mb-4">
        <h2 className="text-4xl leading-[19px] tracking-wide font-semibold">{'New Additions'}</h2>
        <img
          src="/assets/delete.svg"
          alt="Delete"
          className="w-4 h-4 cursor-pointer hover:opacity-80"
          onClick={handleDelete}  
          
        />
      </div>

      {/* Rich Text Editor Icons (Styled) */}
      <div className="flex gap-4 mb-2 text-sm text-black bg-white border-b border-gray-300 pb-2">
        <span className="cursor-pointer text-lg font-bold">B</span>
        <span className="cursor-pointer text-lg italic">I</span>
        <span className="cursor-pointer text-lg underline">U</span>
        <span className="cursor-pointer text-lg">≡</span>
        <span className="cursor-pointer text-lg">≣</span>
        <span className="cursor-pointer text-lg">●</span>
        <span className="cursor-pointer text-lg">1.</span>
        <span className="cursor-pointer text-lg">A</span>
      </div>

      {/* Description Input */}
      <div
        className="w-full p-2 text-black text-lg leading-4.5 focus:outline-none resize-none mb-2"
        
      >{description}</div>

      {/* Display the date */}
      {/* <p className="text-gray-500 text-sm mt-2">
        {!todo &&
          new Date().toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
            day: 'numeric',
          })}
        {todo &&
          new Date(todo.date).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
            day: 'numeric',
          })}
      </p> */}
    </div>
  );
}
