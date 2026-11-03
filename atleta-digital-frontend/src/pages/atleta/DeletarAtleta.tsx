import {useState} from 'react'
import {ToastAlerta} from '../../utils/ToastAlerta.ts'

import {Button, Card, Modal, ModalBody, ModalHeader, Spinner} from 'flowbite-react';
import DeleteImg from "../../assets/images/delete.png";
import {useAuth} from "../../contexts/UseAuth.ts";
import {Role} from "../../enums/Role.ts";
import {Toast} from "../../enums/Toast.ts";
import type {Atleta} from "../../models/Atleta.ts";
import {AtletaService} from "../../services/AtletaService.ts";

interface DeletarAtletaProps {
  isOpen: boolean;
  onClose: () => void;
  atletaSelecionado: Atleta;
  aoDeletar: (id: number) => void;
}

export default function DeletarAtleta({
                                         isOpen,
                                         onClose,
                                         atletaSelecionado,
                                         aoDeletar
                                       }: DeletarAtletaProps) {

  const {usuario} = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  const podeDeletar =
    usuario?.email === adminEmail ||
    usuario?.roles.includes(Role.ADMIN) ||
    usuario?.id === atletaSelecionado.id;

  async function deletarAtleta() {
    if (!atletaSelecionado || !atletaSelecionado.id) return;

    if (!podeDeletar) {
      ToastAlerta('Você não tem permissão para deletar este atleta', Toast.Error);
      return;
    }
    if (atletaSelecionado.email === adminEmail) {
      ToastAlerta('O administrador padrão não pode ser excluído', Toast.Error);
      return;
    }

    try {
      setIsLoading(true);
      await AtletaService.deletar(atletaSelecionado.id);
      ToastAlerta('Atleta excluído com sucesso', Toast.Success);
      aoDeletar(atletaSelecionado.id);
      onClose();
    } catch (error: any) {
      const menssagem = error.response?.data?.message || "Erro ao excluir o atleta"
      ToastAlerta(menssagem, Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!atletaSelecionado) return null;

  return (
    <Modal show={isOpen} onClose={onClose} popup>
      <ModalHeader/>
      <ModalBody>
        <Card className="max-w-sm mx-auto lg:gap-10" imgSrc={DeleteImg} horizontal>
          <div className="text-center lg:text-left">
            <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Deletar Atleta?
            </h5>

            <p className="font-normal text-gray-700 dark:text-gray-500">
              <p className="mb-4 text-lg italic text-gray-700 dark:text-gray-300">
                {atletaSelecionado.nomeCompleto}
              </p>
              <p className="mb-2">
                <span className="font-bold">E-Mail: </span>
                <span className="italic">{atletaSelecionado.email}</span>
              </p>
            </p>

            {!podeDeletar ? (
              <p className="text-red-500 font-semibold">
                Você não tem permissão para deletar este atleta.
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
                  onClick={deletarAtleta}
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