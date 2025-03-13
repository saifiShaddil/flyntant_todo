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
        const response = await fetch(`http://localhost:5000/api/todos/${todo._id}`, { method: 'DELETE' });
        console.log(response)
        if (response.ok) {
          onDelete(todo._id);
          setDescription('')
        } else {
          console.error('Failed to delete todo');
        }
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
    <div className="rounded p-4 lg:p-4 h-full bg-white">
      {/* Title and Delete Icon */}
      <div className="flex justify-between items-center w-full mb-6">
        <h2 className="lg:text-4xl text-lg leading-[19px] tracking-wide font-semibold">{'New Additions'}</h2>
        <img
          src="/assets/delete.svg"
          alt="Delete"
          className="w-4 h-4 cursor-pointer hover:opacity-80"
          onClick={handleDelete}  
          
        />
      </div>

      {/* Rich Text Editor Icons (Styled) */}
      <div className="flex gap-4 mb-2 text-sm text-black bg-white border-b border-b-gray-700 border-gray-300 pb-2">
        <img className='h-[10px] w-2' src='/assets/b.svg' />
        <img className='h-[10px] w-2' src='/assets/i.svg' />
        <img className='h-[10px] w-2' src='/assets/u.svg' />
        <img className='h-[12px] w-16' src='/assets/line.svg' />
        <img className='h-[12px] w-12' src='/assets/list.svg' />
        <img className='h-[10px] w-2' src='/assets/fill.svg' />
        <img className='h-[10px] w-2' src='/assets/text.svg' />
      </div>

      {/* Description Input */}
      <div
        className="w-full px-0 py-3 text-black text-[15px] leading-3.5  font-normal lg:text-[16px] lg:leading-4.5 focus:outline-none resize-none mb-2"
        
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
