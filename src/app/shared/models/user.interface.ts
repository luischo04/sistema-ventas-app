export interface User {
    username: string;
    password: string;
}

export interface UserResponse {
    message: string;
    token: string;
    cveUsuario: string;
    username: string;
    cveRol: number;
    rol: string;
}