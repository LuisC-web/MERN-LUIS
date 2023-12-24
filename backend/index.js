import express from "express";
import conectarBD from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
conectarBD();
app.use(express.json());
//Routing
app.use("/api/usuarios", usuarioRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
