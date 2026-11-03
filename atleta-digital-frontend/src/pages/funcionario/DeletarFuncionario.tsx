import { useState } from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner } from 'flowbite-react';
import DeleteImg from '../../assets/images/delete.png';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { Funcionario } from '../../models/Funcionario';
import { FuncionarioService } from '../../services/FuncionarioService';

interface DeletarFuncionarioProps {
  isOpen: boolean;
  onClose: () => void;
  funcionario: Funcionario;
  aoDeletar: () => void;
}

export default function DeletarFuncionario({ isOpen, onClose, funcionario, aoDeletar }: DeletarFuncionarioProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function confirmarInativacao() {
    try {
      setIsLoading(true);
      await FuncionarioService.inativar(funcionario.id);
      ToastAlerta('Profissional inativado com sucesso!', Toast.Success);
      aoDeletar();
      onClose();
    } catch (error: any) {
      const mensagem = error.response?.data?.message || 'Erro ao inativar profissional.';
      ToastAlerta(mensagem, Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal dismissible show={isOpen} onClose={onClose} popup size="md">
      <ModalHeader />
      <ModalBody>
        <Card className="text-center shadow-none border-0">
          <img src={DeleteImg} alt="Inativar" className="mx-auto mb-4 h-16 w-16" />
          <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
            Inativar Profissional
          </h3>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Tem certeza de que deseja inativar o(a) profissional{' '}
            <strong className="text-gray-900 dark:text-white">
              {funcionario.nomeCompleto}
            </strong>{' '}
            (Cargo: {funcionario.cargo.replace(/_/g, ' ')})? O histórico será preservado no sistema[cite: 1, 3].
          </p>

          <div className="flex justify-center gap-3">
            <Button color="gray" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button color="failure" onClick={confirmarInativacao} disabled={isLoading}>
              {isLoading ? <Spinner size="sm" className="mr-2" /> : null}
              Sim, inativar
            </Button>
          </div>
        </Card>
      </ModalBody>
    </Modal>
  );
}