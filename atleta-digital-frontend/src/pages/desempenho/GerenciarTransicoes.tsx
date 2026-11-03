import {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { FaTrashAlt, FaExchangeAlt } from 'react-icons/fa';
import TextInputField from '../../components/form/TextInputField';
import SelectField from '../../components/form/SelectField';
import { TransicaoCategoriaService } from '../../services/TransicaoCategoriaService';
import { Categoria } from '../../enums/Categoria';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { TransicaoCategoria } from '../../models/TransicaoCategoria';
import type { Atleta } from '../../models/Atleta';

export default function GerenciarTransicoes({ isOpen, onClose, atleta }: { isOpen: boolean, onClose: () => void, atleta: Atleta }) {
  const [isLoading, setIsLoading] = useState(false);
  const [transicoes, setTransicoes] = useState<TransicaoCategoria[]>([]);

  const [formData, setFormData] = useState<TransicaoCategoria>({
    id: 0,
    atletaId: atleta?.id || 0, temporada: new Date().getFullYear().toString(),
    categoriaAtual: atleta?.categoria || Categoria.SUB_11, novaCategoria: Categoria.SUB_13,
    dataTransicao: new Date().toISOString().split('T')[0], motivoTransicao: '', status: 'EM AVALIACAO',
    parecerComissaoAnterior: '', parecerComissaoNova: ''
  });

  useEffect(() => {
    if (isOpen && atleta) {
      setFormData(prev => ({ ...prev, atletaId: atleta.id, categoriaAtual: atleta.categoria }));
      carregarDados();
    }
  }, [isOpen, atleta]);

  async function carregarDados() {
    try { setTransicoes(await TransicaoCategoriaService.listarPorAtleta(atleta.id)); }
    catch { ToastAlerta('Erro ao carregar transições', Toast.Error); }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await TransicaoCategoriaService.cadastrar(formData);
      ToastAlerta('Transição registrada! Atualize o cadastro principal do atleta se aprovado.', Toast.Success);
      setFormData({ ...formData, atletaId: atleta.id });
      carregarDados().then();
    } catch (error: any) {
      const mensagem = error.response?.data?.message || 'Erro ao registrar transição';
      ToastAlerta(mensagem, Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  const catOptions = Object.values(Categoria).map(c => ({ value: c, label: c.replace('_', ' ') }));

  return (
    <Modal dismissible show={isOpen} onClose={onClose} size="5xl" popup>
      <ModalHeader />
      <ModalBody>
        <Card className="mb-4 bg-gray-100 shadow-sm"><h2 className="text-xl font-semibold"><FaExchangeAlt className="inline mr-2 text-blue-600"/> Transição de Categoria</h2></Card>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <TextInputField label="Temporada *" name="temporada" value={formData.temporada} onChange={handleChange} required />
            <SelectField label="Categoria Atual *" name="categoriaAtual" value={formData.categoriaAtual} options={catOptions} onChange={handleChange} />
            <SelectField label="Nova Categoria *" name="novaCategoria" value={formData.novaCategoria} options={catOptions} onChange={handleChange} required />
            <TextInputField label="Data Prevista *" name="dataTransicao" type="date" value={formData.dataTransicao} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block mb-2 text-sm">Parecer Equipe Anterior</label><textarea name="parecerComissaoAnterior" rows={2} className="w-full bg-gray-50 border rounded-lg p-2.5 text-sm" value={formData.parecerComissaoAnterior || ''} onChange={handleChange}></textarea></div>
            <div><label className="block mb-2 text-sm">Parecer Nova Equipe</label><textarea name="parecerComissaoNova" rows={2} className="w-full bg-gray-50 border rounded-lg p-2.5 text-sm" value={formData.parecerComissaoNova || ''} onChange={handleChange}></textarea></div>
          </div>
          <div className="flex justify-end"><Button type="submit" color="blue" disabled={isLoading}>{isLoading ? <Spinner size="sm"/> : 'Registrar Solicitação'}</Button></div>
        </form>

        <h3 className="text-md font-semibold mb-3">Histórico de Transições</h3>
        <Table hoverable>
          <TableHead><TableHeadCell>Data</TableHeadCell><TableHeadCell>Movimento</TableHeadCell><TableHeadCell>Status</TableHeadCell><TableHeadCell>Ações</TableHeadCell></TableHead>
          <TableBody>
            {transicoes.map(t => (
              <TableRow key={t.id} className="bg-white">
                <TableCell>{new Date(t.dataTransicao).toLocaleDateString()}</TableCell>
                <TableCell>{t.categoriaAtual.replace('_', ' ')} ➔ {t.novaCategoria.replace('_', ' ')}</TableCell>
                <TableCell>{t.status}</TableCell>
                <TableCell><Button size="sm" color="light" onClick={async () => { await TransicaoCategoriaService.inativar(t.id); carregarDados(); }}><FaTrashAlt className="text-red-600" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ModalBody>
    </Modal>
  );
}