import {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react';
import { Button, Card, Checkbox, Label, Modal, ModalBody, ModalHeader, Spinner } from 'flowbite-react';
import TextInputField from '../../components/form/TextInputField';
import SelectField from '../../components/form/SelectField';
import { EquipeService } from '../../services/EquipeService';
import { FuncionarioService } from '../../services/FuncionarioService';
import { AtletaService } from '../../services/AtletaService';
import { Categoria } from '../../enums/Categoria';
import { Cargo } from '../../enums/Cargo';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { Equipe } from '../../models/Equipe';
import type { Funcionario } from '../../models/Funcionario';
import type { Atleta } from '../../models/Atleta';

interface EditarEquipeProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  equipeSelecionada: Equipe;
}

export default function EditarEquipe({ isOpen, onClose, onSaved, equipeSelecionada }: EditarEquipeProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [atletasCategoria, setAtletasCategoria] = useState<Atleta[]>([]);
  const [atletaIds, setAtletaIds] = useState<number[]>([]);

  const [equipeAtualizada, setEquipeAtualizada] = useState<Equipe>({
    id: 0, temporada: '', categoria: '' as Categoria, treinadorId: undefined, preparadorFisicoId: undefined,
  });

  useEffect(() => {
    if (equipeSelecionada && isOpen) {
      carregarDependencias().then();
      setEquipeAtualizada({
        id: 0,
        temporada: equipeSelecionada.temporada,
        categoria: equipeSelecionada.categoria,
        treinadorId: equipeSelecionada.treinadorId,
        preparadorFisicoId: equipeSelecionada.preparadorFisicoId,
      });
      setAtletaIds(equipeSelecionada.atletaIds || []);
    }
  }, [equipeSelecionada, isOpen]);

  async function carregarDependencias() {
    try {
      const [funcDados, atletasDados] = await Promise.all([
        FuncionarioService.listarTodos(),
        AtletaService.listarTodos()
      ]);
      setFuncionarios(funcDados);
      setAtletasCategoria(atletasDados.filter(a => a.categoria === equipeSelecionada.categoria));
    } catch {
      ToastAlerta('Erro ao carregar dependências', Toast.Error);
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setEquipeAtualizada((prev) => ({
      ...prev, [name]: name.endsWith('Id') ? (value ? Number(value) : undefined) : value,
    }));
  }

  function toggleAtleta(id: number) {
    setAtletaIds(prev => prev.includes(id) ? prev.filter(aid => aid !== id) : [...prev, id]);
  }

  async function editarEquipe(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await EquipeService.atualizar(equipeSelecionada.id, equipeAtualizada);
      await EquipeService.vincularAtletas(equipeSelecionada.id, atletaIds);
      ToastAlerta('Equipe e elenco atualizados com sucesso!', Toast.Success);
      onSaved();
      onClose();
    } catch (error: any) {
      ToastAlerta(error.response?.data?.message || 'Erro ao atualizar equipe.', Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  const treinadorOptions = funcionarios.filter(f => f.cargo === Cargo.TREINADOR).map(f => ({ value: f.id.toString(), label: f.nomeCompleto }));
  const preparadorOptions = funcionarios.filter(f => f.cargo === Cargo.PREPARADOR_FISICO).map(f => ({ value: f.id.toString(), label: f.nomeCompleto }));

  return (
    <Modal dismissible show={isOpen} onClose={onClose} popup size="3xl">
      <ModalHeader />
      <ModalBody>
        <Card className="mb-6 bg-gray-100 shadow-md">
          <h2 className="text-xl font-semibold text-center text-gray-900">Editar Equipe e Elenco</h2>
        </Card>

        <form onSubmit={editarEquipe} className="space-y-6">
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4">
            <TextInputField
              label="Temporada *"
              name="temporada"
              value={equipeAtualizada.temporada}
              onChange={atualizarEstado}
              required
            />

            <SelectField
              label="Categoria *"
              name="categoria"
              value={equipeAtualizada.categoria}
              options={Object.values(Categoria).map((cat) => ({ value: cat, label: cat.replace('_', ' ') }))}
              onChange={atualizarEstado} required />
            <SelectField label="Treinador" name="treinadorId" value={equipeAtualizada.treinadorId?.toString() || ''} options={treinadorOptions} onChange={atualizarEstado} />
            <SelectField label="Preparador Físico" name="preparadorFisicoId" value={equipeAtualizada.preparadorFisicoId?.toString() || ''} options={preparadorOptions} onChange={atualizarEstado} />
          </fieldset>

          <fieldset>
            <legend className="text-lg font-semibold mb-3 text-gray-700">Montagem do Elenco (Atletas {equipeSelecionada.categoria?.replace('_', ' ')})</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-2 border rounded bg-gray-50">
              {atletasCategoria.length === 0 ? (
                <p className="text-sm text-gray-500 col-span-full">Nenhum atleta cadastrado nesta categoria.</p>
              ) : (
                atletasCategoria.map(atleta => (
                  <div key={atleta.id} className="flex items-center gap-2 bg-white p-2 rounded shadow-sm border">
                    <Checkbox id={`atleta-${atleta.id}`} checked={atletaIds.includes(atleta.id)} onChange={() => toggleAtleta(atleta.id)} />
                    <Label htmlFor={`atleta-${atleta.id}`} className="cursor-pointer text-sm truncate" title={atleta.nomeCompleto}>
                      {atleta.nomeCompleto}
                    </Label>
                  </div>
                ))
              )}
            </div>
          </fieldset>

          <div className="mt-6 flex justify-end gap-3">
            <Button color="gray" onClick={onClose} disabled={isLoading}>Cancelar</Button>
            <Button type="submit" color="green" disabled={isLoading}>{isLoading ? <Spinner size="sm" /> : 'Salvar Alterações'}</Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}