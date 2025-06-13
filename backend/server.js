import express from 'express';
import cors from 'cors';
import {connectDB} from './config/db.js';
import dotenv from 'dotenv';
import foodRoutes from './routes/foodRoutes.js';

// app config
const app = express();
const port = process.env.PORT || 4000;
dotenv.config();

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use('/api/foods', foodRoutes);
app.use('/images', express.static('uploads'));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});