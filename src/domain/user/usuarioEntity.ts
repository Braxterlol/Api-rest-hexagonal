export class UsuarioEntity {
    constructor(
      public id_usuario: number,
      public nombre: string,
      public correo: string,
      public contraseña: string
    ) {}
  }
  