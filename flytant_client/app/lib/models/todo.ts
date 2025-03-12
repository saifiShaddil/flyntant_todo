import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// If the model exists, use that, otherwise create a new one.
const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);

export default Todo;
