import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Spinner} from 'flowbite-react';
import {useAuth} from "../../contexts/UseAuth.ts";
import UserImg from "../../assets/images/user-1.png"
import {ToastAlerta} from "../../utils/ToastAlerta.ts";
import type {Usuario} from "../../models/Usuario.ts";
import EditarPerfil from "./EditarPerfil.tsx";
import AlterarSenha from "./alterarSenha.tsx";
import {FaKey, FaUserEdit} from "react-icons/fa";
import {Toast} from "../../enums/Toast.ts";
import {UsuarioService} from "../../services/UsuarioService.ts";

export default function Perfil() {

  const {usuario} = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);

  const [openEditar, setOpenEditar] = useState(false);
  const [openSenha, setOpenSenha] = useState(false);


  useEffect(() => {
    if (usuario?.id) {
      buscarUsuario().then();
    }
  }, [usuario]);

  async function buscarUsuario() {
    try {
      setIsLoading(true);
      const dados = await UsuarioService.buscarPorId(usuario!.id);
      setUsuarioSelecionado(dados);
    } catch (error: any) {
      ToastAlerta("Erro ao buscar usuário", Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  const userToDisplay = usuarioSelecionado ?? usuario;

  if (isLoading && !usuarioSelecionado) {
    return (
      <div className="flex justify-center pt-32 pb-10">
        <Spinner size="xl"/>
      </div>
    );
  }

  return (
    <>
      <div className="pt-32 md:pl-80 md:pr-20 pb-10 px-10">
        <Card className="mb-10 p-6 bg-gray-100 dark:bg-gray-800 text-center shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Meu Perfil
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Gerencie seus dados pessoais e altere sua senha de acesso.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center w-full">
            <Button
              color="light"
              onClick={() => setOpenEditar(true)}
              className="cursor-pointer focus:outline-none focus:ring-0 w-full sm:w-auto"
            >
              <FaUserEdit className="mr-2 mt-0.5" size={18}/> Editar Dados
            </Button>
            <Button
              color="light"
              onClick={() => setOpenSenha(true)}
              className="cursor-pointer focus:outline-none focus:ring-0 w-full sm:w-auto"
            >
              <FaKey className="mr-2 mt-0.5" size={16}/> Alterar Senha
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-md flex flex-col items-center text-center">
          <Avatar img={UserImg} alt="Foto do usuário" size="xl" bordered/>
          <h2 className="text-2xl font-semibold mt-4 text-gray-900 dark:text-white">
            {userToDisplay?.nome}
          </h2>
          <p className="text-md text-gray-500 dark:text-gray-400 mt-1">
            {userToDisplay?.email}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {userToDisplay?.roles?.map((role) => (
              <span
                key={role}
                className="px-3 py-1 text-xs font-bold bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300 rounded-full"
              >
              {role.replace('_', ' ')}
            </span>
            ))}
          </div>
        </Card>

        {usuarioSelecionado && (
          <EditarPerfil
            isOpen={openEditar}
            onClose={() => setOpenEditar(false)}
            onSaved={() => buscarUsuario()}
            usuarioSelecionado={usuarioSelecionado}
          />
        )}

        {usuarioSelecionado && (
          <AlterarSenha
            isOpen={openSenha}
            onClose={() => setOpenSenha(false)}
          />
        )}
      </div>
    </>
  )
}
