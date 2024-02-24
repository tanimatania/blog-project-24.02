import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
});

export default pool;
