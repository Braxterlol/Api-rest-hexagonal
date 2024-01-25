import { UsuarioEntity } from "../../domain/user/usuarioEntity";
import { UsuarioRepository } from "../../domain/user/usuarioRepository";
import { pool } from "../database";

export class UsuarioRepositoryImpl implements UsuarioRepository {
  async getById(id: number): Promise<UsuarioEntity | null> {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id]);
    
    if (Array.isArray(rows) && rows.length > 0) {
      return this.mapRowToUsuario(rows[0]);
    }

    return null;
  }

  async getByCorreo(correo: string): Promise<UsuarioEntity | null> {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE correo = ?", [correo]);
    
    if (Array.isArray(rows) && rows.length > 0) {
      return this.mapRowToUsuario(rows[0]);
    }

    return null;
  }

  async create(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    const [result] = await pool.query("INSERT INTO usuarios SET ?", usuario);
    
    if ('insertId' in result) {
      usuario.id_usuario = result.insertId;
    }

    return usuario;
  }

  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
  }

  private mapRowToUsuario(row: any): UsuarioEntity {
    return new UsuarioEntity(row.id, row.nombre, row.correo, row.contraseña);
  }
}
