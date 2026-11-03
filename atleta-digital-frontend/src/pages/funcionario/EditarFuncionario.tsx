import {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner } from 'flowbite-react';
import TextInputField from '../../components/form/TextInputField';
import SelectField from '../../components/form/SelectField';
import ToggleSwitchField from '../../components/form/ToggleSwitchField';
import { FuncionarioService } from '../../services/FuncionarioService';
import { Cargo } from '../../enums/Cargo';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { Funcionario } from '../../models/Funcionario';

interface EditarFuncionarioProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  funcionario: Funcionario;
}

export default function EditarFuncionario({ isOpen, onClose, onSaved, funcionario }: EditarFuncionarioProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Funcionario & { ativo?: boolean }>({
    id:0,
    nomeCompleto: '',
    cpf: '',
    telefone: '',
    cargo: '' as Cargo,
    registroProfissional: '',
    dataContratacao: '',
    usuarioId: undefined,
    ativo: true
  });

  useEffect(() => {
    if (funcionario && isOpen) {
      setFormData({
        id: 0,
        nomeCompleto: funcionario.nomeCompleto,
        cpf: funcionario.cpf,
        telefone: funcionario.telefone || '',
        cargo: funcionario.cargo,
        registroProfissional: funcionario.registroProfissional || '',
        dataContratacao: funcionario.dataContratacao || '',
        usuarioId: funcionario.usuarioId,
        ativo: funcionario.ativo
      });
    }
  }, [funcionario, isOpen]);

  function handleChangeInput(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'usuarioId' ? (value ? Number(value) : undefined) : value,
    }));
  }

  function handleToggle(checked: boolean) {
    setFormData((prev) => ({ ...prev, ativo: checked }));
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await FuncionarioService.atualizar(funcionario.id, formData);
      ToastAlerta('Profissional atualizado com sucesso!', Toast.Success);
      onSaved();
      onClose();
    } catch (error: any) {
      const mensagem = error.response?.data?.message || 'Erro ao atualizar profissional.';
      ToastAlerta(mensagem, Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  const cargoOptions = Object.values(Cargo).map((c) => ({
    value: c,
    label: c.replace(/_/g, ' '),
  }));

  return (
    <Modal dismissible show={isOpen} onClose={onClose} popup size="md">
      <ModalHeader />
      <ModalBody>
        <Card className="mb-4 text-center bg-gray-100 dark:bg-gray-800 shadow-sm">
          <h2 className="text-xl font-semibold">Editar Profissional</h2>
        </Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInputField
            label="Nome Completo *"
            name="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={handleChangeInput}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <TextInputField
              label="CPF *"
              name="cpf"
              value={formData.cpf}
              onChange={handleChangeInput}
              required
            />
            <TextInputField
              label="Telefone"
              name="telefone"
              value={formData.telefone || ''}
              onChange={handleChangeInput}
            />
            <SelectField
              label="Cargo *"
              name="cargo"
              value={formData.cargo}
              options={cargoOptions}
              onChange={handleChangeInput}
              required
            />
            <TextInputField
              label="Registro (CREF/CRM)"
              name="registroProfissional"
              value={formData.registroProfissional || ''}
              onChange={handleChangeInput}
            />
            <TextInputField
              label="Data Contratação"
              name="dataContratacao"
              type="date"
              value={formData.dataContratacao || ''}
              onChange={handleChangeInput}
            />
            <TextInputField
              label="ID Conta de Acesso"
              name="usuarioId"
              type="number"
              value={formData.usuarioId?.toString() || ''}
              onChange={handleChangeInput}
            />
          </div>

          <div className="flex justify-center mt-2">
            <ToggleSwitchField
              label={formData.ativo ? "Profissional Ativo" : "Profissional Inativo"}
              name="ativo"
              checked={formData.ativo ?? true}
              onChange={handleToggle}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button color="gray" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" color="green" disabled={isLoading}>
              {isLoading ? <Spinner size="sm" className="mr-2" /> : null}
              Salvar Alterações
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}