
import { TareaEntity } from "./tareaEntity";

export interface TareaRepository {
  getByUsuarioId(id_usuario: number): Promise<TareaEntity[]>;
  create(tarea: TareaEntity): Promise<TareaEntity>;
  delete(id: number): Promise<void>;
}
