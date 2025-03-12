'use client';

import React, { useState } from 'react';
import { TodoDetail } from './TodoDetail';
import { Todo } from '../page';

export function TodoList({ serverTodos }: { serverTodos: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(serverTodos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectTodo = (todo: Todo) => setSelectedTodo(todo);

  const createTodo = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'New Additions',
          description: 'To stay representative of framework & new example apps.',
        }),
      });
      if (!res.ok) throw new Error('Failed to create todo');
      const newTodo: Todo = await res.json();
      setTodos((prev) => [newTodo, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onDelete = async (id: string) => {
    try {
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleBack = () => setSelectedTodo(null);

  return (
    <div className="flex flex-col lg:flex-row w-[90vw] lg:w-[80vw] h-full">
      {/* LEFT SIDEBAR */}
      <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col gap-3 bg-gray-100 p-2 lg:p-4">
        <div className="flex items-center justify-between px-2">
          <button
            onClick={createTodo}
            className="bg-black cursor-pointer rounded-lg text-[14px] text-white px-4 py-3 flex items-center gap-2"
          >
            <img src="/assets/add.svg" alt="Add" className="w-4 h-4" />
            TODO
          </button>

          <button
            onClick={() => setShowSearch(!showSearch)}
            className="bg-white p-[12px] gap-[16px] cursor-pointer rounded-[10px] shadow-md hover:bg-gray-100"
          >
            <img src="/assets/search.svg" alt="Search" className="w-5 h-5" />
          </button>
        </div>

        {showSearch && (
          <div className="relative p-4 border-gray-400 animate-fade-in">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border rounded pl-8 pr-2 py-2 text-sm focus:outline-none"
            />
            <svg
              className="w-5 h-5 absolute top-5 left-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z"
              />
            </svg>
          </div>
        )}

        <ul className="flex-1 overflow-y-auto space-y-2 p-2">
          {filteredTodos.map((todo) => (
            <li
              key={todo._id}
              onClick={() => handleSelectTodo(todo)}
              className={`cursor-pointer p-4 bg-white shadow-md rounded-[8px] flex flex-col gap-1 transition hover:shadow-lg ${selectedTodo?._id === todo._id ? 'border-gray-800 border-2' : ''}`}
            >
              <div className="text-black text-[18px] font-bold text-base">{todo.title}</div>
              <div className="flex justify-between items-center gap-2">
                <div className="text-sm leading-[19px] font-normal text-gray-700">{todo.description}</div>
                <div className="text-xs leading-[19px] text-gray-400 self-end">
                  {new Date(todo.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT PANEL: Detail or Placeholder */}
      <div className="hidden lg:flex lg:w-1/2 flex-1 bg-white px-[35px] py-[25px]">
          <TodoDetail onDelete={onDelete} todo={selectedTodo} setTodo={setSelectedTodo} />
      </div>
    </div>
  );
}