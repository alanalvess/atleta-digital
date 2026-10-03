import {createContext} from 'react'
import type {UsuarioLogin} from "../models/UsuarioLogin.ts";

export interface AuthContextProps {
    usuario: UsuarioLogin;
    isAuthenticated: boolean;
    isLoading: boolean;
    isHydrated: boolean;

    handleLogin(usuario: UsuarioLogin): Promise<void>;
    handleLogout(): void;
}

export const AuthContext = createContext(
    {} as AuthContextProps
)