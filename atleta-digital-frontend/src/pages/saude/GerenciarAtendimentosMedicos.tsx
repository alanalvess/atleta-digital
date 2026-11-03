import {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Badge } from 'flowbite-react';
import { FaTrashAlt, FaStethoscope } from 'react-icons/fa';
import TextInputField from '../../components/form/TextInputField';
import SelectField from '../../components/form/SelectField';
import { AtendimentoMedicoService } from '../../services/AtendimentoMedicoService';
import { FuncionarioService } from '../../services/FuncionarioService';
import { Cargo } from '../../enums/Cargo';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { AtendimentoMedico } from '../../models/AtendimentoMedico';
import type { Atleta } from '../../models/Atleta';
import type { Funcionario } from '../../models/Funcionario';

interface GerenciarAtendimentosProps {
  isOpen: boolean;
  onClose: () => void;
  atleta: Atleta;
}

export default function GerenciarAtendimentosMedicos({ isOpen, onClose, atleta }: GerenciarAtendimentosProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [atendimentos, setAtendimentos] = useState<AtendimentoMedico[]>([]);
  const [profissionais, setProfissionais] = useState<Funcionario[]>([]);

  const [formData, setFormData] = useState<AtendimentoMedico>({
    id: 0,
    atletaId: atleta?.id || 0,
    dataAtendimento: new Date().toISOString().split('T')[0],
    queixaLesao: '',
    conduta: '',
    diasAfastamento: undefined,
    liberadoParaTreino: false,
    profissionalSaudeId: undefined
  });

  useEffect(() => {
    if (isOpen && atleta) {
      setFormData(prev => ({ ...prev, atletaId: atleta.id }));
      carregarDependencias().then();
    }
  }, [isOpen, atleta]);

  async function carregarDependencias() {
    try {
      setIsFetching(true);
      const [listaAtendimentos, listaFuncionarios] = await Promise.all([
        AtendimentoMedicoService.listarPorAtleta(atleta.id),
        FuncionarioService.listarTodos()
      ]);
      setAtendimentos(listaAtendimentos);
      setProfissionais(listaFuncionarios.filter(f => f.cargo === Cargo.MEDICO || f.cargo === Cargo.FISIOTERAPEUTA));
    } catch {
      ToastAlerta('Erro ao carregar dados de saúde', Toast.Error);
    } finally {
      setIsFetching(false);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'diasAfastamento' || name === 'profissionalSaudeId' ? (Number(value)) :
        name === 'liberadoParaTreino' ? value === 'true' : value
    }));
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await AtendimentoMedicoService.cadastrar(formData);
      ToastAlerta('Atendimento registrado!', Toast.Success);
      setFormData({ ...formData, atletaId: atleta.id });
      carregarDependencias().then();
    } catch (error: any) {
      ToastAlerta(error.response?.data?.message || 'Erro ao registrar atendimento', Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  async function excluirAtendimento(id: number) {
    try {
      await AtendimentoMedicoService.inativar(id);
      ToastAlerta('Registro inativado.', Toast.Success);
      carregarDependencias().then();
    } catch {
      ToastAlerta('Erro ao inativar registro', Toast.Error);
    }
  }

  const profissionaisOptions = profissionais.map(p => ({ value: p.id.toString(), label: `${p.nomeCompleto} (${p.cargo})` }));

  return (
    <Modal dismissible show={isOpen} onClose={onClose} size="5xl" popup>
      <ModalHeader />
      <ModalBody>
        <Card className="mb-4 bg-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <FaStethoscope className="text-blue-600 text-2xl" />
            <div>
              <h2 className="text-xl font-semibold">Atendimentos Médicos e Fisioterapia</h2>
              <p className="text-sm text-gray-600">Atleta: <strong>{atleta?.nomeCompleto}</strong></p>
            </div>
          </div>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded border mb-6">
          <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-3">Registrar Novo Atendimento</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInputField
              label="Data do Atendimento *"
              name="dataAtendimento"
              type="date"
              value={formData.dataAtendimento}
              onChange={handleChange} required
            />

            <SelectField
              label="Profissional de Saúde *"
              name="profissionalSaudeId"
              value={formData.profissionalSaudeId?.toString() || ''}
              options={profissionaisOptions}
              onChange={handleChange} required
            />

            <SelectField label="Liberado para Treino? *" name="liberadoParaTreino" value={formData.liberadoParaTreino ? 'true' : 'false'} options={[{ value: 'false', label: 'Não (Afastado)' }, { value: 'true', label: 'Sim' }]} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInputField label="Dias de Afastamento" name="diasAfastamento" type="number" value={formData.diasAfastamento?.toString() || ''} onChange={handleChange} disabled={formData.liberadoParaTreino} placeholder="Ex: 5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Queixa / Lesão *</label>
              <textarea name="queixaLesao" rows={2} className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={formData.queixaLesao} onChange={handleChange} required />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Conduta / Tratamento *</label>
              <textarea name="conduta" rows={2} className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" value={formData.conduta} onChange={handleChange} required />
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <Button type="submit" color="blue" disabled={isLoading}>{isLoading ? <Spinner size="sm"/> : 'Salvar Atendimento'}</Button>
          </div>
        </form>

        <h3 className="text-md font-semibold text-gray-700 mb-3">Histórico de Atendimentos</h3>
        {isFetching ? <div className="flex justify-center py-6"><Spinner size="lg" /></div> : (
          <div className="overflow-x-auto max-h-80 shadow-md sm:rounded-lg">
            <Table hoverable>
              <TableHead>
                <TableHeadCell>Data / Profissional</TableHeadCell>
                <TableHeadCell>Queixa / Conduta</TableHeadCell>
                <TableHeadCell>Status Treino</TableHeadCell>
                <TableHeadCell className="text-center">Ações</TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                {atendimentos.length === 0 ? <TableRow><TableCell colSpan={4} className="text-center py-4">Nenhum atendimento registrado.</TableCell></TableRow> : (
                  atendimentos.map(atd => (
                    <TableRow key={atd.id} className="bg-white">
                      <TableCell>
                        <div className="font-semibold text-gray-900">{new Date(atd.dataAtendimento).toLocaleDateString('pt-BR')}</div>
                        <div className="text-xs text-gray-500">{atd.profissionalSaudeNome}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm"><strong>Lesão:</strong> {atd.queixaLesao}</div>
                        <div className="text-sm text-gray-600 truncate max-w-xs"><strong>Tratamento:</strong> {atd.conduta}</div>
                      </TableCell>
                      <TableCell>
                        <Badge color={atd.liberadoParaTreino ? 'success' : 'failure'} className="w-fit">
                          {atd.liberadoParaTreino ? 'Apto' : `Afastado (${atd.diasAfastamento || 0} dias)`}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Button size="sm" color="light" onClick={() => excluirAtendimento(atd.id)}><FaTrashAlt className="text-red-600" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
}