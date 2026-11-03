import {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { FaTrashAlt, FaChartLine } from 'react-icons/fa';
import TextInputField from '../../components/form/TextInputField';
import SelectField from '../../components/form/SelectField';
import { AvaliacaoDesempenhoService } from '../../services/AvaliacaoDesempenhoService';
import { FuncionarioService } from '../../services/FuncionarioService';
import { Cargo } from '../../enums/Cargo';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { AvaliacaoDesempenho } from '../../models/AvaliacaoDesempenho';
import type { Atleta } from '../../models/Atleta';
import type { Funcionario } from '../../models/Funcionario';

export default function GerenciarAvaliacoes({ isOpen, onClose, atleta }: { isOpen: boolean, onClose: () => void, atleta: Atleta }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoDesempenho[]>([]);
  const [treinadores, setTreinadores] = useState<Funcionario[]>([]);

  const [formData, setFormData] = useState<AvaliacaoDesempenho>({
    id: 0,
    atletaId: atleta?.id || 0, avaliadorId: 0, temporada: new Date().getFullYear().toString(),
    dataAvaliacao: new Date().toISOString().split('T')[0], notaPasse: undefined, notaFinalizacao: undefined,
    notaDrible: undefined, notaMarcacao: undefined, pontosFortes: '', pontosADesenvolver: ''
  });

  useEffect(() => {
    if (isOpen && atleta) {
      setFormData(prev => ({ ...prev, atletaId: atleta.id }));
      carregarDados();
    }
  }, [isOpen, atleta]);

  async function carregarDados() {
    try {
      setIsFetching(true);
      const [listaAvaliacoes, listaFuncionarios] = await Promise.all([
        AvaliacaoDesempenhoService.listarPorAtleta(atleta.id), FuncionarioService.listarTodos()
      ]);
      setAvaliacoes(listaAvaliacoes);
      setTreinadores(listaFuncionarios.filter(f => f.cargo === Cargo.TREINADOR || f.cargo === Cargo.COORDENADOR_TECNICO));
    } catch {
      ToastAlerta('Erro ao carregar dados', Toast.Error);
    } finally { setIsFetching(false); }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.startsWith('nota') || name === 'avaliadorId' ? (value ? Number(value) : undefined) : value
    }));
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await AvaliacaoDesempenhoService.cadastrar(formData);
      ToastAlerta('Avaliação registrada!', Toast.Success);
      setFormData({ ...formData, atletaId: atleta.id });
      carregarDados();
    } catch { ToastAlerta('Erro ao registrar', Toast.Error); }
    finally { setIsLoading(false); }
  }

  return (
    <Modal dismissible show={isOpen} onClose={onClose} size="5xl" popup>
      <ModalHeader />
      <ModalBody>
        <Card className="mb-4 bg-gray-100 shadow-sm"><h2 className="text-xl font-semibold"><FaChartLine className="inline mr-2 text-blue-600"/> Avaliação Técnica: {atleta?.nomeCompleto}</h2></Card>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField label="Avaliador *" name="avaliadorId" value={formData.avaliadorId?.toString() || ''} options={treinadores.map(t => ({ value: t.id.toString(), label: t.nomeCompleto }))} onChange={handleChange} required />
            <TextInputField label="Data da Avaliação *" name="dataAvaliacao" type="date" value={formData.dataAvaliacao} onChange={handleChange} required />
            <TextInputField label="Temporada *" name="temporada" value={formData.temporada} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TextInputField label="Passe (1-5)" name="notaPasse" type="number" value={formData.notaPasse?.toString() || ''} onChange={handleChange} />
            <TextInputField label="Finalização (1-5)" name="notaFinalizacao" type="number" value={formData.notaFinalizacao?.toString() || ''} onChange={handleChange} />
            <TextInputField label="Drible (1-5)" name="notaDrible" type="number" value={formData.notaDrible?.toString() || ''} onChange={handleChange} />
            <TextInputField label="Marcação (1-5)" name="notaMarcacao" type="number" value={formData.notaMarcacao?.toString() || ''} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInputField label="Pontos Fortes" name="pontosFortes" value={formData.pontosFortes || ''} onChange={handleChange} />
            <TextInputField label="Pontos a Desenvolver" name="pontosADesenvolver" value={formData.pontosADesenvolver || ''} onChange={handleChange} />
          </div>
          <div className="flex justify-end"><Button type="submit" color="blue" disabled={isLoading}>{isLoading ? <Spinner size="sm"/> : 'Salvar Avaliação'}</Button></div>
        </form>

        <h3 className="text-md font-semibold text-gray-700 mb-3">Histórico de Avaliações</h3>
        {isFetching ? <Spinner size="lg" /> : (
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <Table hoverable>
              <TableHead><TableHeadCell>Data / Avaliador</TableHeadCell><TableHeadCell>Média Geral</TableHeadCell><TableHeadCell>Ações</TableHeadCell></TableHead>
              <TableBody>
                {avaliacoes.map(av => (
                  <TableRow key={av.id} className="bg-white">
                    <TableCell><strong>{new Date(av.dataAvaliacao).toLocaleDateString()}</strong> <br/><span className="text-xs">{av.avaliadorNome}</span></TableCell>
                    <TableCell>{av.mediaGeral?.toFixed(2) || '-'}</TableCell>
                    <TableCell><Button size="sm" color="light" onClick={async () => { await AvaliacaoDesempenhoService.inativar(av.id); carregarDados(); }}><FaTrashAlt className="text-red-600" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
}