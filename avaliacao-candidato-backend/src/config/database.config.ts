import { Sequelize } from "sequelize-typescript";
import { config as dotEnv } from "dotenv";

dotEnv();

const env = process.env.NODE_ENV;
const dialect = env === "test" ? "sqlite" : "postgres";

const sequelize = new Sequelize({
    username: process.env.DB_USER || "postgres_user",
    password: process.env.DB_PASS || "postgres_password",
    database: process.env.DB_NAME || "comigo",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT!) || 5432,
    dialect,
});

export default sequelize;
