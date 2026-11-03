import {useState} from 'react'
import {ToastAlerta} from '../../utils/ToastAlerta.ts'

import {Button, Card, Modal, ModalBody, ModalHeader, Spinner} from 'flowbite-react';
import DeleteImg from "../../assets/images/delete.png";
import {Toast} from "../../enums/Toast.ts";
import type {Equipe} from "../../models/Equipe.ts";
import {EquipeService} from "../../services/EquipeService.ts";

interface DeletarEquipeProps {
  isOpen: boolean;
  onClose: () => void;
  equipeSelecionada: Equipe;
  aoDeletar: () => void;
}

export default function DeletarEquipe({
                                        isOpen,
                                        onClose,
                                        equipeSelecionada,
                                        aoDeletar
                                      }: DeletarEquipeProps) {

  const [isLoading, setIsLoading] = useState(false);

  async function deletarEquipe() {
    try {
      setIsLoading(true);
      await EquipeService.inativar(equipeSelecionada.id);
      ToastAlerta('Equipe inativada com sucesso!', Toast.Success);
      aoDeletar();
      onClose();
    } catch (error: any) {
      const mensagem = error.response?.data?.message || 'Erro ao inativar equipe.';
      ToastAlerta(mensagem, Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal dismissible show={isOpen} onClose={onClose} popup size="md">
      <ModalHeader/>
      <ModalBody>
        <Card className="text-center shadow-none border-0">
          <img src={DeleteImg} alt="Inativar" className="mx-auto mb-4 h-16 w-16"/>
          <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
            Inativar Equipe
          </h3>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Tem certeza de que deseja inativar a equipe da categoria{' '}
            <strong className="text-gray-900 dark:text-white">
              {equipeSelecionada.categoria?.replace('_', ' ')}
            </strong>{' '}
            referente à temporada{' '}
            <strong className="text-gray-900 dark:text-white">
              {equipeSelecionada.temporada}
            </strong>?
          </p>

          <div className="flex justify-center gap-3">
            <Button color="gray" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button color="failure" onClick={deletarEquipe} disabled={isLoading}>
              {isLoading ? <Spinner size="sm" className="mr-2"/> : null}
              Sim, inativar
            </Button>
          </div>
        </Card>
      </ModalBody>
    </Modal>
  );
}