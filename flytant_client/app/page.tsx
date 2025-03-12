// app/page.tsx
import { Header } from './components/Headers';
import { TodoList } from './components/TodoList';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
// Define a TypeScript interface for a Todo
export interface Todo {
  _id: string;
  title: string;
  description: string;
  date: string;
}

export default async function HomePage({ searchParams }: { searchParams?: { page?: string, limit?: string } }) {
  const params = await Promise.resolve(searchParams);
  const page = params?.page || '1';
  const limit = params?.limit || '5';

  // const res: Response = await fetch(`${BASE_URL}/api/todos?page=${page}&limit=${limit}`, { cache: 'no-store' });

  // if (!res.ok) {
  //   throw new Error('Failed to fetch todos');
  // }

  // const todos: Todo[] = await res.json();

  return (
    <div className="h-screen">
      <Header />
      <main className='flex bg-[#f4f4f4] p-4 md:p-10 gap-10 h-[88vh] overflow-hidden'>
        <div className='mx-auto w-auto flex gap-6 md:w-[88vw] lg:w-[80vw] xl:w-[70vw] '>
          <TodoList serverTodos={[]} />
        </div>
      </main>
    </div>
  );
}
