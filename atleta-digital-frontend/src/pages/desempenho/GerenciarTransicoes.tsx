import {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Badge, ToggleSwitch } from 'flowbite-react';
import { FaTrashAlt, FaExchangeAlt, FaEdit, FaCheckDouble } from 'react-icons/fa';
import TextInputField from '../../components/form/TextInputField';
import SelectField from '../../components/form/SelectField';
import { TransicaoCategoriaService } from '../../services/TransicaoCategoriaService';
import { FuncionarioService } from '../../services/FuncionarioService';
import { Categoria } from '../../enums/Categoria';
import { Cargo } from '../../enums/Cargo';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { TransicaoCategoria } from '../../models/TransicaoCategoria';
import type { Atleta } from '../../models/Atleta';
import type { Funcionario } from '../../models/Funcionario';

export default function GerenciarTransicoes({ isOpen, onClose, atleta }: { isOpen: boolean, onClose: () => void, atleta: Atleta }) {
  const [isLoading, setIsLoading] = useState(false);
  const [transicoes, setTransicoes] = useState<TransicaoCategoria[]>([]);
  const [transicaoId, setTransicaoId] = useState<number | null>(null);
  const [treinadores, setTreinadores] = useState<Funcionario[]>([]);
  const [coordenadores, setCoordenadores] = useState<Funcionario[]>([]);

  const [formData, setFormData] = useState<TransicaoCategoria>({
    id: 0,
    atletaId: atleta?.id || 0, temporada: new Date().getFullYear().toString(),
    categoriaAtual: atleta?.categoria || Categoria.SUB_11, novaCategoria: Categoria.SUB_13,
    dataTransicao: new Date().toISOString().split('T')[0], motivoTransicao: '', status: 'EM AVALIACAO',
    parecerComissaoAnterior: '', parecerComissaoNova: '',
    aprovadoTreinadorAnterior: false, aprovadoTreinadorNovo: false, aprovadoCoordenadorTecnico: false
  });

  useEffect(() => {
    if (isOpen && atleta) {
      cancelarEdicao();
      carregarDados();
    }
  }, [isOpen, atleta]);

  async function carregarDados() {
    try {
      const [listaTransicoes, listaFuncionarios] = await Promise.all([
        TransicaoCategoriaService.listarPorAtleta(atleta.id),
        FuncionarioService.listarTodos()
      ]);
      setTransicoes(listaTransicoes);
      setTreinadores(listaFuncionarios.filter(f => f.cargo === Cargo.TREINADOR));
      setCoordenadores(listaFuncionarios.filter(f => f.cargo === Cargo.COORDENADOR_TECNICO));
    } catch { ToastAlerta('Erro ao carregar dados', Toast.Error); }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.includes('Id') ? (value ? Number(value) : undefined) : value }));
  }

  function handleToggle(name: string, checked: boolean) {
    setFormData(prev => ({ ...prev, [name]: checked }));
  }

  function carregarParaEdicao(t: TransicaoCategoria) {
    setTransicaoId(t.id);
    setFormData({
      id: 0,
      atletaId: t.atletaId, temporada: t.temporada, categoriaAtual: t.categoriaAtual,
      novaCategoria: t.novaCategoria, dataTransicao: new Date(t.dataTransicao).toISOString().split('T')[0],
      motivoTransicao: t.motivoTransicao || '', status: t.status || 'EM AVALIACAO',
      parecerComissaoAnterior: t.parecerComissaoAnterior || '', parecerComissaoNova: t.parecerComissaoNova || '',
      treinadorAnteriorId: t.treinadorAnteriorId, treinadorNovoId: t.treinadorNovoId, coordenadorTecnicoId: t.coordenadorTecnicoId,
      aprovadoTreinadorAnterior: t.aprovadoTreinadorAnterior || false,
      aprovadoTreinadorNovo: t.aprovadoTreinadorNovo || false,
      aprovadoCoordenadorTecnico: t.aprovadoCoordenadorTecnico || false
    });
  }

  function cancelarEdicao() {
    setTransicaoId(null);
    setFormData({ ...formData, atletaId: atleta.id, categoriaAtual: atleta.categoria });
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (transicaoId) {
        await TransicaoCategoriaService.atualizar(transicaoId, formData);
        ToastAlerta('Avaliação atualizada. A categoria mudará sozinha se 100% aprovada!', Toast.Success);
      } else {
        await TransicaoCategoriaService.cadastrar(formData);
        ToastAlerta('Solicitação registrada com sucesso!', Toast.Success);
      }
      cancelarEdicao();
      carregarDados();
    } catch (error: any) {
      ToastAlerta(error.response?.data?.message || 'Erro no registro', Toast.Error);
    } finally { setIsLoading(false); }
  }

  const catOptions = Object.values(Categoria).map(c => ({ value: c, label: c.replace('_', ' ') }));
  const treinadoresOptions = treinadores.map(t => ({ value: t.id.toString(), label: t.nomeCompleto }));
  const coordenadoresOptions = coordenadores.map(c => ({ value: c.id.toString(), label: c.nomeCompleto }));

  return (
    <Modal dismissible show={isOpen} onClose={onClose} size="5xl" popup>
      <ModalHeader />
      <ModalBody>
        <Card className="mb-4 bg-gray-100 shadow-sm"><h2 className="text-xl font-semibold"><FaExchangeAlt className="inline mr-2 text-blue-600"/> Transição de Categoria</h2></Card>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded border mb-6 relative">
          {transicaoId && <div className="absolute top-2 right-2"><Badge color="warning">Modo de Avaliação</Badge></div>}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <TextInputField label="Temporada *" name="temporada" value={formData.temporada} onChange={handleChange} required />
            <SelectField label="Cat. Atual *" name="categoriaAtual" value={formData.categoriaAtual} options={catOptions} onChange={handleChange} disabled />
            <SelectField label="Nova Categoria *" name="novaCategoria" value={formData.novaCategoria} options={catOptions} onChange={handleChange} required />
            <TextInputField label="Data Prevista *" name="dataTransicao" type="date" value={formData.dataTransicao} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SelectField label="Técnico Atual" name="treinadorAnteriorId" value={formData.treinadorAnteriorId?.toString() || ''} options={treinadoresOptions} onChange={handleChange} />
              <textarea name="parecerComissaoAnterior" rows={2} className="w-full bg-gray-50 border rounded-lg p-2 mt-2 text-sm" value={formData.parecerComissaoAnterior || ''} onChange={handleChange} placeholder="Parecer da equipe atual..."></textarea>
            </div>
            <div>
              <SelectField label="Novo Técnico" name="treinadorNovoId" value={formData.treinadorNovoId?.toString() || ''} options={treinadoresOptions} onChange={handleChange} />
              <textarea name="parecerComissaoNova" rows={2} className="w-full bg-gray-50 border rounded-lg p-2 mt-2 text-sm" value={formData.parecerComissaoNova || ''} onChange={handleChange} placeholder="Parecer da nova equipe..."></textarea>
            </div>
          </div>

          <div className="md:w-1/2">
            <SelectField label="Coordenador Técnico" name="coordenadorTecnicoId" value={formData.coordenadorTecnicoId?.toString() || ''} options={coordenadoresOptions} onChange={handleChange} />
          </div>

          {/* Área de Automação e Assinaturas (Aparece Apenas na Edição) */}
          {transicaoId && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-bold text-blue-900 mb-3 flex items-center"><FaCheckDouble className="mr-2"/> Assinaturas e Liberação</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ToggleSwitch checked={formData.aprovadoTreinadorAnterior || false} label="Técnico Atual Aprova?" onChange={(c) => handleToggle('aprovadoTreinadorAnterior', c)} />
                <ToggleSwitch checked={formData.aprovadoTreinadorNovo || false} label="Novo Técnico Aceita?" onChange={(c) => handleToggle('aprovadoTreinadorNovo', c)} />
                <ToggleSwitch checked={formData.aprovadoCoordenadorTecnico || false} label="Coordenador Libera?" onChange={(c) => handleToggle('aprovadoCoordenadorTecnico', c)} />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            {transicaoId && <Button color="gray" onClick={cancelarEdicao} disabled={isLoading}>Cancelar</Button>}
            <Button type="submit" color="blue" disabled={isLoading}>{isLoading ? <Spinner size="sm"/> : (transicaoId ? 'Salvar Avaliação' : 'Registrar Solicitação')}</Button>
          </div>
        </form>

        <h3 className="text-md font-semibold mb-3">Histórico de Transições</h3>
        <Table hoverable>
          <TableHead><TableHeadCell>Data</TableHeadCell><TableHeadCell>Movimento</TableHeadCell><TableHeadCell>Status</TableHeadCell><TableHeadCell className="text-center">Ações</TableHeadCell></TableHead>
          <TableBody>
            {transicoes.map(t => (
              <TableRow key={t.id} className="bg-white">
                <TableCell>{new Date(t.dataTransicao).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>{t.categoriaAtual.replace('_', ' ')} ➔ {t.novaCategoria.replace('_', ' ')}</TableCell>
                <TableCell>
                  <Badge color={t.status === 'APROVADA' ? 'success' : t.status === 'RECUSADA' ? 'failure' : 'warning'}>
                    {t.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button size="sm" color="light" onClick={() => carregarParaEdicao(t)}><FaEdit className="text-blue-600" /></Button>
                    <Button size="sm" color="light" onClick={async () => { await TransicaoCategoriaService.inativar(t.id); carregarDados(); }}><FaTrashAlt className="text-red-600" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ModalBody>
    </Modal>
  );
}