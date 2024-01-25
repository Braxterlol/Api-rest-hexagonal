import { Request, Response } from "express";
import { TareaService } from "../../domain/task/tareaService";
import { TareaEntity } from "../../domain/task/tareaEntity";

export class TareaController {
  constructor(private tareaService: TareaService) {}

  async obtenerTareasPorUsuario(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = parseInt(req.params.usuarioId, 10);
      const tareas = await this.tareaService.obtenerTareasPorUsuario(usuarioId);
      res.status(200).json(tareas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Se produjo un error inesperado" });
    }
  }

  async crearTarea(req: Request, res: Response): Promise<void> {
    try {
      const { descripcion, completada, usuarioId } = req.body;
      const nuevaTarea = new TareaEntity(0, descripcion, completada, usuarioId);

      const tareaCreada = await this.tareaService.crearTarea(nuevaTarea);

      res.status(201).json(tareaCreada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Se produjo un error inesperado" });
    }
  }

  async eliminarTarea(req: Request, res: Response): Promise<void> {
    try {
      const tareaId = parseInt(req.params.id, 10);
      await this.tareaService.eliminarTarea(tareaId);
      res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Se produjo un error inesperado" });
    }
  }
}
