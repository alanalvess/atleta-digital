import {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner } from 'flowbite-react';
import TextInputField from '../../components/form/TextInputField';
import SelectField from '../../components/form/SelectField';
import { FuncionarioService } from '../../services/FuncionarioService';
import { Cargo } from '../../enums/Cargo';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { Funcionario } from '../../models/Funcionario';

export default function CadastrarFuncionario({ isOpen, onClose, onSaved }: { isOpen: boolean, onClose: () => void, onSaved: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Funcionario>({
    id: 0,
    nomeCompleto: '',
    cpf: '',
    telefone: '',
    cargo: '' as Cargo,
    registroProfissional: '',
    dataContratacao: '',
    usuarioId: undefined
  });

  useEffect(() => {
    if (isOpen) setFormData({
      id: 0,
      nomeCompleto: '',
      cpf: '',
      telefone: '',
      cargo: '' as Cargo,
      registroProfissional: '',
      dataContratacao: '',
      usuarioId: undefined
    });
  }, [isOpen]);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'usuarioId' ? Number(value) || undefined : value }));
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await FuncionarioService.cadastrar(formData);
      ToastAlerta('Profissional cadastrado!', Toast.Success);
      onSaved();
      onClose();
    } catch (error: any) {
      ToastAlerta(error.response?.data?.message || 'Erro ao cadastrar', Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  const cargoOptions = Object.values(Cargo).map(c => ({ value: c, label: c.replace(/_/g, ' ') })); //[cite: 1]

  return (
    <Modal dismissible show={isOpen} onClose={onClose} popup>
      <ModalHeader />
      <ModalBody>
        <Card className="mb-4 text-center bg-gray-100 dark:bg-gray-800 shadow-sm"><h2 className="text-xl font-semibold">Novo Profissional</h2></Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInputField label="Nome Completo *" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required />
          <div className="grid grid-cols-2 gap-4">
            <TextInputField label="CPF *" name="cpf" value={formData.cpf} onChange={handleChange} required />
            <TextInputField label="Telefone" name="telefone" value={formData.telefone || ''} onChange={handleChange} />
            <SelectField label="Cargo *" name="cargo" value={formData.cargo} options={cargoOptions} onChange={handleChange} required />
            <TextInputField label="Registro (CREF/CRM)" name="registroProfissional" value={formData.registroProfissional || ''} onChange={handleChange} />
            <TextInputField label="Data Contratação" name="dataContratacao" type="date" value={formData.dataContratacao || ''} onChange={handleChange} />
            <TextInputField label="ID Conta de Acesso" name="usuarioId" type="number" value={formData.usuarioId?.toString() || ''} onChange={handleChange} />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button color="gray" onClick={onClose} disabled={isLoading}>Cancelar</Button>
            <Button type="submit" color="green" disabled={isLoading}>{isLoading ? <Spinner size="sm"/> : 'Salvar'}</Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}