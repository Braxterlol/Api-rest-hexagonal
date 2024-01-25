import express from "express";
import { UsuarioController } from "./controllers/usuarioController";
import { UsuarioService } from "../domain/user/usuarioService";
import { UsuarioRepositoryImpl } from "../infrastructure/usuario/usuarioRepositoryImpl";
import { TareaController } from "./controllers/tareaController";
import { TareaService } from "../domain/task/tareaService";
import { TareaRepositoryImpl } from "../infrastructure/tarea/tareaRepositoryImpl";

const router = express.Router();

// Configuración para usuarios
const usuarioRepository = new UsuarioRepositoryImpl();
const usuarioService = new UsuarioService(usuarioRepository);
const usuarioController = new UsuarioController(usuarioService);

router.post("/usuarios", (req, res) => usuarioController.registrarUsuario(req, res));
router.get("/usuarios/:id", (req, res) => usuarioController.obtenerUsuarioPorId(req, res));

// Configuración para tareas
const tareaRepository = new TareaRepositoryImpl();
const tareaService = new TareaService(tareaRepository);
const tareaController = new TareaController(tareaService);

router.get("/tareas/usuario/:usuarioId", (req, res) => tareaController.obtenerTareasPorUsuario(req, res));
router.post("/tareas", (req, res) => tareaController.crearTarea(req, res));
router.delete("/tareas/:id", (req, res) => tareaController.eliminarTarea(req, res));

export default router;
