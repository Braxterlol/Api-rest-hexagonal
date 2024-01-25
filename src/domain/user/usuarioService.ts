import { UsuarioEntity } from "./usuarioEntity";
import { UsuarioRepository } from "./usuarioRepository";

export class UsuarioService {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async registrarUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    const existingUsuario = await this.usuarioRepository.getByCorreo(usuario.correo);

    if (existingUsuario) {
      throw new Error("El correo electrónico ya está registrado.");
    }
    usuario.contraseña = await this.encriptarContraseña(usuario.contraseña);

    return this.usuarioRepository.create(usuario);
  }

  async obtenerUsuarioPorId(id: number): Promise<UsuarioEntity | null> {
    return this.usuarioRepository.getById(id);
  }

  private async encriptarContraseña(contraseña: string): Promise<string> {
    return Promise.resolve(`hashed_${contraseña}`);
  }
}
