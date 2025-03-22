import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import { AppDataSource } from './config/database';
import productRoutes from './routes/productRoutes'


const port = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use(express.json());

AppDataSource.initialize()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database connection error:', err));

app.use('/api', productRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
