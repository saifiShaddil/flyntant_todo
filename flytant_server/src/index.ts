// Import necessary modules
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import todoRouter from './routes/todoRoute';


// Load environment variables
dotenv.config();

// Create an Express app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


  // Routes
app.use('/api', todoRouter);


// Define a test route
app.get('/', (req, res) => {
  res.send('Express + TypeScript + MongoDB Server');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
