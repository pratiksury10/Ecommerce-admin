import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postjere12",
  database: process.env.DB_NAME || "ecommerce",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: ["src/subscribers/*.ts"]
});

// Initialize Database
AppDataSource.initialize()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Error connecting to database:", err));
