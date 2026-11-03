import {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner } from 'flowbite-react';
import TextInputField from '../../components/form/TextInputField';
import SelectField from '../../components/form/SelectField';
import { EquipeService } from '../../services/EquipeService';
import { FuncionarioService } from '../../services/FuncionarioService';
import { Categoria } from '../../enums/Categoria';
import { Cargo } from '../../enums/Cargo';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { Funcionario } from '../../models/Funcionario';
import type {Equipe} from "../../models/Equipe.ts";

interface CadastrarEquipeProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function CadastrarEquipe({ isOpen, onClose, onSaved }: CadastrarEquipeProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [equipeCadastro, setEquipeCadastro] = useState<Equipe>({
    id: 0,
    temporada: new Date().getFullYear().toString(),
    categoria: '' as Categoria,
    treinadorId: undefined,
    preparadorFisicoId: undefined,
  });

  useEffect(() => {
    if (isOpen) {
      carregarProfissionais();
      setEquipeCadastro({
        id: 0,
        temporada: new Date().getFullYear().toString(),
        categoria: '' as Categoria,
        treinadorId: undefined,
        preparadorFisicoId: undefined,
      });
    }
  }, [isOpen]);

  async function carregarProfissionais() {
    try {
      const dados = await FuncionarioService.listarTodos();
      setFuncionarios(dados);
    } catch (error) {
      ToastAlerta('Erro ao carregar lista de profissionais', Toast.Error);
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setEquipeCadastro((prev) => ({
      ...prev,
      [name]: name.endsWith('Id') ? (value ? Number(value) : undefined) : value,
    }));
  }

  async function cadastrarNovaEquipe(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await EquipeService.cadastrar(equipeCadastro);
      ToastAlerta('Equipe cadastrada com sucesso!', Toast.Success);
      onSaved();
      onClose();
    } catch (error: any) {
      ToastAlerta(error.response?.data?.message || 'Erro ao cadastrar equipe.', Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  const treinadorOptions = funcionarios
    .filter(f => f.cargo === Cargo.TREINADOR)
    .map(f => ({ value: f.id.toString(), label: f.nomeCompleto }));

  const preparadorOptions = funcionarios
    .filter(f => f.cargo === Cargo.PREPARADOR_FISICO)
    .map(f => ({ value: f.id.toString(), label: f.nomeCompleto }));

  return (
    <Modal dismissible show={isOpen} onClose={onClose} popup>
      <ModalHeader />
      <ModalBody>
        <Card className="mb-6 bg-gray-100 shadow-md">
          <h2 className="text-xl font-semibold text-center text-gray-900">Nova Equipe</h2>
        </Card>

        <form onSubmit={cadastrarNovaEquipe} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInputField label="Temporada (Ano) *" name="temporada" value={equipeCadastro.temporada} onChange={atualizarEstado} required />
            <SelectField label="Categoria *" name="categoria" value={equipeCadastro.categoria} options={Object.values(Categoria).map((cat) => ({ value: cat, label: cat.replace('_', ' ') }))} onChange={atualizarEstado} required />
            <SelectField label="Treinador" name="treinadorId" value={equipeCadastro.treinadorId?.toString() || ''} options={treinadorOptions} onChange={atualizarEstado} />
            <SelectField label="Preparador Físico" name="preparadorFisicoId" value={equipeCadastro.preparadorFisicoId?.toString() || ''} options={preparadorOptions} onChange={atualizarEstado} />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button color="gray" onClick={onClose} disabled={isLoading}>Cancelar</Button>
            <Button type="submit" color="green" disabled={isLoading}>{isLoading ? <Spinner size="sm" /> : 'Salvar Equipe'}</Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}