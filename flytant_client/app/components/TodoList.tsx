'use client';

import React, { useState } from 'react';
import { TodoDetail } from './TodoDetail';
import { Todo } from '../page';

export function TodoList({ serverTodos }: { serverTodos: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(serverTodos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

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
      // Remove from local state immediately
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Go back to the list on mobile
  const handleBack = () => setSelectedTodo(null);

  // -- Left Panel UI (List + Search) --
  const renderLeftPanel = () => (
    <div className="w-full overflow-auto flex flex-col gap-3 bg-gray-100 p-2 lg:p-4">
      {/* Header: Create Button + Search Button */}
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

      {/* Search Bar */}
      {showSearch && (
        <div className="relative p-4 border-gray-400 animate-fade-in">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border rounded pl-8 pr-2 py-2 text-sm focus:outline-none"
          />
          {/* Search Icon inside Input */}
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

      {/* Todo List */}
      <ul className="flex-1 overflow-y-auto space-y-2 p-2">
        {filteredTodos.map((todo) => (
          <li
            key={todo._id}
            onClick={() => handleSelectTodo(todo)}
            className={`cursor-pointer p-4 border-2 bg-white shadow-md rounded-[8px] flex flex-col gap-1 transition hover:shadow-lg ${
              selectedTodo?._id === todo._id ? 'border-gray-800' : 'border-white'
            }`}
          >
            <div className="text-black text-[14px]  lg:text-[18px] font-bold text-base">
              {todo.title}
            </div>
            <div className="flex  items-center gap-2">
              <div className="text-[12px] min-w-[200px] justify-between font-light leading-[19px] text-gray-700">
                {todo.description}
              </div>
              <div className="lg:text-xs lg:w-[120px] w-[102px] text-[10px] leading-[19px] text-gray-400 self-end">
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
  );

  // -- Right Panel UI (Detail) --
  const renderDetailPanel = () => (
    <div className="flex-1 bg-white px-[35px] py-[25px]">
      <TodoDetail
        onDelete={onDelete}
        todo={selectedTodo}
        setTodo={setSelectedTodo}
      />
    </div>
  );

  return (
    <>
      {/* MOBILE VIEW */}
      <div className="block overflow-auto md:hidden w-full h-full">
        {/* If a todo is selected, show detail; otherwise show the list */}
        {selectedTodo ? (
          <div className="relative w-full h-full  p-4">
            {/* Back Button */}
            <div>
              <button
                onClick={handleBack}
                className="text-gray-800 text-[19px] font-bold mb-4 flex items-center gap-3"
              >
                <img
                  src="/assets/back.svg"
                  alt="Back"
                  className="w-6 h-4 mr-2 rotate-180"
                />
                Back
              </button>

            </div>
            <TodoDetail
              onDelete={onDelete}
              todo={selectedTodo}
              setTodo={setSelectedTodo}
            />
          </div>
        ) : (
          renderLeftPanel()
        )}
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:flex w-[90vw] xl:w-[85vw] h-full">
        {/* Left Panel (List) */}
        <div className="w-[400px]">{renderLeftPanel()}</div>

        {/* Right Panel (Detail) */}
        {renderDetailPanel()}
      </div>
    </>
  );
}
