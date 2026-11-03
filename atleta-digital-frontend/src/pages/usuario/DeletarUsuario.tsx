import {useState} from 'react'
import {ToastAlerta} from '../../utils/ToastAlerta.ts'

import {Button, Card, Modal, ModalBody, ModalHeader, Spinner} from 'flowbite-react';
import DeleteImg from "../../assets/images/delete.png";
import type {Usuario} from "../../models/Usuario.ts";
import {useAuth} from "../../contexts/UseAuth.ts";
import {Role} from "../../enums/Role.ts";
import {Toast} from "../../enums/Toast.ts";
import {UsuarioService} from "../../services/UsuarioService.ts";

interface DeletarUsuarioProps {
  isOpen: boolean;
  onClose: () => void;
  usuarioSelecionado: Usuario;
  aoDeletar: (id: number) => void;
}

export default function DeletarUsuario({
                                         isOpen,
                                         onClose,
                                         usuarioSelecionado,
                                         aoDeletar
                                       }: DeletarUsuarioProps) {

  const {usuario} = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  const podeDeletar =
    usuario?.email === adminEmail ||
    usuario?.roles.includes(Role.ADMIN) ||
    usuario?.id === usuarioSelecionado.id;

  async function deletarUsuario() {
    if (!usuarioSelecionado || !usuarioSelecionado.id) return;

    if (!podeDeletar) {
      ToastAlerta('Você não tem permissão para deletar este usuário', Toast.Error);
      return;
    }
    if (usuarioSelecionado.email === adminEmail) {
      ToastAlerta('O administrador padrão não pode ser excluído', Toast.Error);
      return;
    }

    try {
      setIsLoading(true);
      await UsuarioService.deletar(usuarioSelecionado.id);
      ToastAlerta('Usuário deletado com sucesso', Toast.Success);
      aoDeletar(usuarioSelecionado.id);
      onClose();
    } catch (error: any) {
      const menssagem = error.response?.data?.message || "Erro ao excluir o usuário"
      ToastAlerta(menssagem, Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!usuarioSelecionado) return null;

  return (
    <Modal show={isOpen} onClose={onClose} popup>
      <ModalHeader/>
      <ModalBody>
        <Card className="max-w-sm mx-auto lg:gap-10" imgSrc={DeleteImg} horizontal>
          <div className="text-center lg:text-left">
            <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Deletar Usuário?
            </h5>

            <p className="font-normal text-gray-700 dark:text-gray-500">
              <p className="mb-4 text-lg italic text-gray-700 dark:text-gray-300">
                {usuarioSelecionado.nome}
              </p>
              <p className="mb-2">
                <span className="font-bold">E-Mail: </span>
                <span className="italic">{usuarioSelecionado.email}</span>
              </p>
            </p>

            {!podeDeletar ? (
              <p className="text-red-500 font-semibold">
                Você não tem permissão para deletar este usuário.
              </p>
            ) : (
              <div className="flex gap-2 mt-10 justify-center">
                <Button
                  className="cursor-pointer text-white bg-gray-400 hover:bg-gray-600 w-24 dark:bg-gray-600 dark:hover:bg-gray-700"
                  onClick={onClose}
                >
                  Não
                </Button>
                <Button
                  className="cursor-pointer text-white bg-rose-600 hover:bg-rose-800 w-24 dark:bg-rose-600 dark:hover:bg-rose-700 flex justify-center"
                  onClick={deletarUsuario}
                >
                  {isLoading ? <Spinner/> : <span>Sim</span>}
                </Button>
              </div>
            )}
          </div>
        </Card>
      </ModalBody>
    </Modal>
  );
}