import express from "express";
import routes from "./routes/routes";
import db from "./config/database.config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

db.sync({ logging: () => console.log("Banco de dados conectado: article") });

app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));
