import { TareaEntity } from "./tareaEntity";
import { TareaRepository } from "./tareaRepository";

export class TareaService {
  constructor(private tareaRepository: TareaRepository) {}

  async obtenerTareasPorUsuario(id_usuario: number): Promise<TareaEntity[]> {
    return this.tareaRepository.getByUsuarioId(id_usuario);
  }

  async crearTarea(tarea: TareaEntity): Promise<TareaEntity> {
    return this.tareaRepository.create(tarea);
  }

  async eliminarTarea(id: number): Promise<void> {
    return this.tareaRepository.delete(id);
  }
}
