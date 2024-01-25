import { TareaEntity } from "../../domain/task/tareaEntity";
import { TareaRepository } from "../../domain/task/tareaRepository";
import { pool } from "../database";

export class TareaRepositoryImpl implements TareaRepository {
    
  
      async getByUsuarioId(id_usuario: number): Promise<TareaEntity[]> {
        const [rows] = await pool.query("SELECT * FROM tareas WHERE id_usuario = ?", [id_usuario]);
      
        if (Array.isArray(rows)) {
          return rows.map((row: any) => this.mapRowToTarea(row));
        }
      
        return [];
      }
      
      async create(tarea: TareaEntity): Promise<TareaEntity> {
        const [result] = await pool.query("INSERT INTO tareas SET ?", tarea);
      
        if ('insertId' in result) {
          tarea.id = result.insertId;
        }
      
        return tarea;
      }
      
      
  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM tareas WHERE id = ?", [id]);
  }

  private mapRowToTarea(row: any): TareaEntity {
    return new TareaEntity(row.id, row.descripcion, row.completada, row.id_usuario);
  }
}
