import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/UseAuth';
import { ToastAlerta } from '../utils/ToastAlerta';
import { Toast } from '../enums/Toast';

export function PrivateRoute() {
  const { isAuthenticated, isHydrated } = useAuth();

  if (!isHydrated) return null; // Aguarda a hidratação do contexto

  if (!isAuthenticated) {
    ToastAlerta("Você precisa estar autenticado para acessar esta página", Toast.Info);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}