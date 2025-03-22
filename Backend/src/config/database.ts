import { DataSource } from 'typeorm';
import { Product } from '../entities/Product';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Product],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database connection error:', err));
