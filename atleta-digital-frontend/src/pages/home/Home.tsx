import {useAuth} from "../../contexts/UseAuth.ts";
import HomePublica from "./HomePublica.tsx";
import {Role} from "../../enums/Role.ts";
import HomeAtleta from "./HomeAtleta.tsx";
import {Navigate} from "react-router-dom";
import {Card} from "flowbite-react";

export default function Home() {
  const {usuario, isHydrated} = useAuth();

  if (!isHydrated) return null;

  if (usuario?.roles?.includes(Role.ADMIN)) {
    return <Navigate to="/usuarios" replace />;
  }

  if (usuario?.roles?.includes(Role.COORDENADOR_TECNICO) || usuario?.roles?.includes(Role.TECNICO)) {
    return <Navigate to="/dashboard" replace />;
  }

  if (usuario?.roles?.includes(Role.TREINADOR) || usuario?.roles?.includes(Role.PREPARADOR_FISICO)) {
    return <Navigate to="/equipes/minhas" replace />;
  }

  if (usuario?.roles?.includes(Role.RESPONSAVEL) || usuario?.roles?.includes(Role.ATLETA)) {
    return <Navigate to="/meu-perfil" replace />;
  }

  return (
    <div className="pt-32 px-10 pb-10 max-w-4xl mx-auto">
      <Card className="text-center p-10 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Bem-vindo ao Atleta Digital
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Olá, {usuario?.nome}! Utilize o menu lateral para acessar as funcionalidades do seu perfil.
        </p>
      </Card>
    </div>
  );
}