import express, { Request, Response } from 'express';
import Todo from '../models/todoModel';

const router = express.Router();

// Create a Todo
router.post('/todos', async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({ title, description });
    await newTodo.save();
    return res.status(201).json(newTodo);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create todo' });
  }
});

// Get Todos with Pagination
router.get('/todos', async (req: Request, res: Response): Promise<any > => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const todos = await Todo.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return res.json(todos);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Get a Single Todo
router.get('/todos/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    return res.json(todo);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

// Update a Todo
router.put('/todos/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    return res.json(updatedTodo);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update todo' });
  }
});

export default router;
