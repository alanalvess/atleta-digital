import {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner } from 'flowbite-react';
import TextInputField from '../../components/form/TextInputField';
import { ResponsavelLegalService } from '../../services/ResponsavelLegalService';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { ResponsavelLegal } from '../../models/ResponsavelLegal';
import type { Atleta } from '../../models/Atleta';
import { FaUserShield } from 'react-icons/fa';

export default function GerenciarResponsavel({ isOpen, onClose, atleta }: { isOpen: boolean, onClose: () => void, atleta: Atleta }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [responsavelId, setResponsavelId] = useState<number | null>(null);

  const [formData, setFormData] = useState<ResponsavelLegal>({
    id: 0,
    atletaId: 0,
    nome: '',
    parentesco: '',
    cpf: '',
    telefone: '',
    email: ''
  });

  useEffect(() => {
    if (isOpen && atleta) {
      setFormData(prev => ({ ...prev, atletaId: atleta.id }));
      carregarExistente();
    }
  }, [isOpen, atleta]);

  async function carregarExistente() {
    try {
      setIsFetching(true);
      const existente = await ResponsavelLegalService.buscarPorAtleta(atleta.id);
      if (existente) {
        setResponsavelId(existente.id);
        setFormData({
          id: 0,
          atletaId: existente.atletaId,
          nome: existente.nome,
          parentesco: existente.parentesco,
          cpf: existente.cpf,
          telefone: existente.telefone,
          email: existente.email || ''
        });
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setResponsavelId(null);
        setFormData({
          id: 0,
          atletaId: atleta.id,
          nome: '',
          parentesco: '',
          cpf: '',
          telefone: '',
          email: ''
        });
      }
    } finally { setIsFetching(false); }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await ResponsavelLegalService.cadastrar(formData);
      ToastAlerta('Responsável salvo!', Toast.Success);
      onClose();
    } catch { ToastAlerta('Erro ao salvar responsável', Toast.Error); }
    finally { setIsLoading(false); }
  }

  return (
    <Modal dismissible show={isOpen} onClose={onClose} size="2xl" popup>
      <ModalHeader />
      <ModalBody>
        <Card className="mb-4 bg-gray-100 shadow-sm text-center">
          <h2 className="text-xl font-semibold"><FaUserShield className="inline mr-2 text-blue-600"/> Responsável Legal</h2>
          <p className="text-sm text-gray-600">Atleta: <strong>{atleta?.nomeCompleto}</strong></p>
        </Card>
        {isFetching ? <div className="flex justify-center"><Spinner size="xl" /></div> : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInputField label="Nome Completo *" name="nome" value={formData.nome} onChange={handleChange} required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInputField label="Parentesco *" name="parentesco" value={formData.parentesco} onChange={handleChange} placeholder="Ex: Pai, Mãe, Avó" required />
              <TextInputField label="CPF *" name="cpf" value={formData.cpf} onChange={handleChange} required />
              <TextInputField label="Telefone *" name="telefone" value={formData.telefone} onChange={handleChange} required />
              <TextInputField label="E-mail" name="email" type="email" value={formData.email || ''} onChange={handleChange} />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button color="gray" onClick={onClose} disabled={isLoading}>Cancelar</Button>
              <Button type="submit" color="green" disabled={isLoading}>{isLoading ? <Spinner size="sm"/> : (responsavelId ? 'Atualizar' : 'Salvar')}</Button>
            </div>
          </form>
        )}
      </ModalBody>
    </Modal>
  );
}