import express from "express";
import {
  autentificar,
  registrar,
  confirmar,
  olvidePassword,
  comprobarToken,
  cambiarPassword,
  perfil,
} from "../controllers/usuarioControllers.js";
import verificarAuth from "../middleware/verificarAuth.js";
const router = express.Router();

router.post("/", registrar);
router.post("/login", autentificar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", cambiarPassword);
router.get("/perfil", verificarAuth, perfil);
export default router;
