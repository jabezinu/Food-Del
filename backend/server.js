import express from 'express';
import cors from 'cors';
import {connectDB} from './config/db.js';
import 'dotenv/config';
import foodRoutes from './routes/foodRoutes.js';
import userRoutes from './routes/userRoutes.js';

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use('/api/foods', foodRoutes);
app.use('/images', express.static('uploads'));
app.use('/api/users', userRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});