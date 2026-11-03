import { useState } from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner } from 'flowbite-react';
import DeleteImg from '../../assets/images/delete.png';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { SessaoTreino } from '../../models/SessaoTreino';
import { SessaoTreinoService } from '../../services/SessaoTreinoService';

interface DeletarSessaoTreinoProps {
  isOpen: boolean;
  onClose: () => void;
  sessao: SessaoTreino;
  aoDeletar: () => void;
}

export default function DeletarSessaoTreino({ isOpen, onClose, sessao, aoDeletar }: DeletarSessaoTreinoProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function confirmarExclusao() {
    try {
      setIsLoading(true);
      await SessaoTreinoService.inativar(sessao.id);
      ToastAlerta('Sessão inativada com sucesso!', Toast.Success);
      aoDeletar();
      onClose();
    } catch (error) {
      ToastAlerta('Erro ao inativar sessão.', Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal dismissible show={isOpen} onClose={onClose} popup size="md">
      <ModalHeader />
      <ModalBody>
        <Card className="text-center shadow-none border-0">
          <img src={DeleteImg} alt="Deletar" className="mx-auto h-32 w-32" />
          <h3 className="mb-2 text-lg font-semibold text-gray-800">Cancelar Treino</h3>
          <p className="mb-6 text-sm text-gray-500">
            Deseja cancelar a sessão de treino focada em <strong>{sessao.focoTreino}</strong> da categoria <strong>{sessao.categoria?.replace('_', ' ')}</strong>?
          </p>
          <div className="flex justify-center gap-3">
            <Button color="gray" onClick={onClose} disabled={isLoading}>Voltar</Button>
            <Button color="red" onClick={confirmarExclusao} disabled={isLoading}>
              {isLoading ? <Spinner size="sm" className="mr-2" /> : null} Sim, cancelar
            </Button>
          </div>
        </Card>
      </ModalBody>
    </Modal>
  );
}