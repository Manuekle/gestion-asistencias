import { createPool } from "mysql2/promise";

const pool = createPool({
  host: process.env.BD_HOSTNAME,
  port: process.env.BD_PORT,
  user: process.env.BD_USER,
  database: process.env.BD_NAME,
  password: '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export { pool };
