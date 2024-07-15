require("dotenv").config();

module.exports = {
    username: process.env.DB_USER || "postgres_user",
    password: process.env.DB_PASS || "postgres_password",
    database: process.env.DB_NAME_DEVELOPMENT || "article",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || "postgres",
};
