import { Request, Response } from "express";
import { UsuarioService } from "../../domain/user/usuarioService";
import { UsuarioEntity } from "../../domain/user/usuarioEntity";

export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  async registrarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, correo, contraseña } = req.body;
      const nuevoUsuario = new UsuarioEntity(0, nombre, correo, contraseña);

      const usuarioRegistrado = await this.usuarioService.registrarUsuario(nuevoUsuario);

      res.status(201).json(usuarioRegistrado);
    } catch (error) {
        console.error(error);  
        res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async obtenerUsuarioPorId(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = parseInt(req.params.id, 10);

      const usuario = await this.usuarioService.obtenerUsuarioPorId(usuarioId);

      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ error: "Usuario no encontrado" });
      }
    } catch (error) {
        console.error(error);  
        res.status(500).json({ error: "Error interno del servidor" });
    }
  }

}
