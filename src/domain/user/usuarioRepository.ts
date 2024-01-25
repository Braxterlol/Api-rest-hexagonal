import { UsuarioEntity } from "./usuarioEntity";

export interface UsuarioRepository {
  getById(id: number): Promise<UsuarioEntity | null>;
  getByCorreo(correo: string): Promise<UsuarioEntity | null>;
  create(usuario: UsuarioEntity): Promise<UsuarioEntity>;
  delete(id: number): Promise<void>;
}
