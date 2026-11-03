import {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner } from 'flowbite-react';
import TextInputField from '../../components/form/TextInputField';
import SelectField from '../../components/form/SelectField';
import { SessaoTreinoService } from '../../services/SessaoTreinoService';
import { FuncionarioService } from '../../services/FuncionarioService';
import { Categoria } from '../../enums/Categoria';
import { Cargo } from '../../enums/Cargo';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { Funcionario } from '../../models/Funcionario';
import type {SessaoTreino} from "../../models/SessaoTreino.ts";

interface CadastrarSessaoTreinoProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  categoriaInicial: Categoria;
}

export default function CadastrarSessaoTreino({ isOpen, onClose, onSaved, categoriaInicial }: CadastrarSessaoTreinoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  const [formData, setFormData] = useState<SessaoTreino>({
    id: 0,
    dataTreino: new Date().toISOString().split('T')[0],
    categoria: categoriaInicial,
    focoTreino: '',
    observacoesTreinador: '',
    treinadorId: undefined,
  });

  useEffect(() => {
    if (isOpen) {
      carregarTreinadores();
      setFormData(prev => ({ ...prev, categoria: categoriaInicial, dataTreino: new Date().toISOString().split('T')[0] }));
    }
  }, [isOpen, categoriaInicial]);

  async function carregarTreinadores() {
    try {
      const dados = await FuncionarioService.listarTodos();
      setFuncionarios(dados.filter(f => f.cargo === Cargo.TREINADOR || f.cargo === Cargo.PREPARADOR_FISICO));
    } catch {
      ToastAlerta('Erro ao carregar treinadores', Toast.Error);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'treinadorId' ? (value ? Number(value) : undefined) : value }));
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await SessaoTreinoService.cadastrar(formData);
      ToastAlerta('Treino registrado com sucesso!', Toast.Success);
      onSaved();
      onClose();
    } catch (error: any) {
      ToastAlerta(error.response?.data?.message || 'Erro ao registrar treino', Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  const treinadorOptions = funcionarios.map(f => ({ value: f.id.toString(), label: f.nomeCompleto }));
  const categoriaOptions = Object.values(Categoria).map(cat => ({ value: cat, label: cat.replace('_', ' ') }));

  return (
    <Modal dismissible show={isOpen} onClose={onClose} popup>
      <ModalHeader />
      <ModalBody>
        <Card className="mb-4 bg-gray-100 shadow-sm text-center">
          <h2 className="text-xl font-semibold">Nova Sessão de Treino</h2>
        </Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInputField label="Data do Treino *" name="dataTreino" type="date" value={formData.dataTreino} onChange={handleChange} required />
            <SelectField label="Categoria *" name="categoria" value={formData.categoria} options={categoriaOptions} onChange={handleChange} required />
          </div>
          <SelectField label="Treinador Responsável *" name="treinadorId" value={formData.treinadorId?.toString() || ''} options={treinadorOptions} onChange={handleChange} required />
          <TextInputField label="Foco do Treino (Tático, Físico...) *" name="focoTreino" value={formData.focoTreino} onChange={handleChange} required />

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Observações</label>
            <textarea
              name="observacoesTreinador"
              rows={3}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={formData.observacoesTreinador || ''}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button color="gray" onClick={onClose} disabled={isLoading}>Cancelar</Button>
            <Button type="submit" color="green" disabled={isLoading}>{isLoading ? <Spinner size="sm"/> : 'Salvar Treino'}</Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}