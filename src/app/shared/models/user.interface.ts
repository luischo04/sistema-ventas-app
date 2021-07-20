export interface User {
    usuario: string;
    password: string;
}

export interface UserResponse {
    message: string;
    token: string;
    cveUsuario: string;
    usuario: string;
    cveRol: number;
    rol: string;
}