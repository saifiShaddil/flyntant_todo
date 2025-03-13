// Import necessary modules
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import todoRouter from './routes/todoRoute';
import cors from 'cors';


// Load environment variables
dotenv.config();

// Create an Express app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

// Middleware
app.use(express.json());

app.use(cors({ origin: 'http://localhost:3000' }));

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));




  // Routes
app.use('/api', todoRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
