import { createContext } from 'react';
import type { UsuarioLogin } from "../models/UsuarioLogin";

export interface AuthContextProps {
    usuario: UsuarioLogin | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isHydrated: boolean;
    handleLogin(usuarioLogin: Partial<UsuarioLogin>): Promise<void>;
    handleLogout(): void;
}

export const AuthContext = createContext({} as AuthContextProps);

