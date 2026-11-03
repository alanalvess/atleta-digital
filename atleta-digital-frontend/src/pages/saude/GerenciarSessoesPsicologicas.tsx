import {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { FaTrashAlt, FaBrain } from 'react-icons/fa';
import TextInputField from '../../components/form/TextInputField';
import SelectField from '../../components/form/SelectField';
import { SessaoPsicologicaService } from '../../services/SessaoPsicologicaService';
import { FuncionarioService } from '../../services/FuncionarioService';
import { Cargo } from '../../enums/Cargo';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { SessaoPsicologica } from '../../models/SessaoPsicologica';
import type { Atleta } from '../../models/Atleta';
import type { Funcionario } from '../../models/Funcionario';

export default function GerenciarSessoesPsicologicas({ isOpen, onClose, atleta }: { isOpen: boolean, onClose: () => void, atleta: Atleta }) {
  const [isLoading, setIsLoading] = useState(false);
  const [sessoes, setSessoes] = useState<SessaoPsicologica[]>([]);
  const [psicologos, setPsicologos] = useState<Funcionario[]>([]);

  const [formData, setFormData] = useState<SessaoPsicologica>({
    id: 0,
    atletaId: atleta?.id || 0,
    psicologoId: 0,
    dataSessao: new Date().toISOString().split('T')[0],
    nivelConcentracao: '',
    nivelAutoconfianca: '',
    controleEmocoes: '',
    parecer: '',
    requerNovaSessao: false
  });

  useEffect(() => {
    if (isOpen && atleta) {
      setFormData(prev => ({ ...prev, atletaId: atleta.id }));
      carregarDados();
    }
  }, [isOpen, atleta]);

  async function carregarDados() {
    try {
      const [listaSessoes, listaFuncionarios] = await Promise.all([
        SessaoPsicologicaService.listarPorAtleta(atleta.id), FuncionarioService.listarTodos()
      ]);
      setSessoes(listaSessoes);
      setPsicologos(listaFuncionarios.filter(f => f.cargo === Cargo.PSICOLOGO));
    } catch { ToastAlerta('Erro ao carregar dados', Toast.Error); }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'psicologoId' ? Number(value) : name === 'requerNovaSessao' ? value === 'true' : value
    }));
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await SessaoPsicologicaService.cadastrar(formData);
      ToastAlerta('Sessão registrada!', Toast.Success);
      setFormData({ ...formData, atletaId: atleta.id });
      carregarDados();
    } catch { ToastAlerta('Erro ao registrar', Toast.Error); }
    finally { setIsLoading(false); }
  }

  const niveisOptions = [{value: 'EXCELENTE', label: 'Excelente'}, {value: 'BOM', label: 'Bom'}, {value: 'REGULAR', label: 'Regular'}];

  return (
    <Modal dismissible show={isOpen} onClose={onClose} size="5xl" popup>
      <ModalHeader />
      <ModalBody>
        <Card className="mb-4 bg-gray-100 shadow-sm"><h2 className="text-xl font-semibold"><FaBrain className="inline mr-2 text-purple-600"/> Psicologia: {atleta?.nomeCompleto}</h2></Card>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField label="Psicólogo *" name="psicologoId" value={formData.psicologoId?.toString() || ''} options={psicologos.map(p => ({ value: p.id.toString(), label: p.nomeCompleto }))} onChange={handleChange} required />
            <TextInputField label="Data da Sessão *" name="dataSessao" type="date" value={formData.dataSessao} onChange={handleChange} required />
            <SelectField label="Requer Nova Sessão? *" name="requerNovaSessao" value={formData.requerNovaSessao ? 'true' : 'false'} options={[{value:'false', label:'Não'}, {value:'true', label:'Sim'}]} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField label="Concentração" name="nivelConcentracao" value={formData.nivelConcentracao || ''} options={niveisOptions} onChange={handleChange} />
            <SelectField label="Autoconfiança" name="nivelAutoconfianca" value={formData.nivelAutoconfianca || ''} options={niveisOptions} onChange={handleChange} />
            <SelectField label="Controle de Emoções" name="controleEmocoes" value={formData.controleEmocoes || ''} options={niveisOptions} onChange={handleChange} />
          </div>
          <div><label className="block mb-2 text-sm font-medium">Parecer Técnico</label><textarea name="parecer" rows={3} className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300" value={formData.parecer || ''} onChange={handleChange}></textarea></div>
          <div className="flex justify-end"><Button type="submit" color="purple" disabled={isLoading}>{isLoading ? <Spinner size="sm"/> : 'Salvar Sessão'}</Button></div>
        </form>

        <h3 className="text-md font-semibold text-gray-700 mb-3">Histórico de Sessões</h3>
        <Table hoverable>
          <TableHead><TableHeadCell>Data / Psicólogo</TableHeadCell><TableHeadCell>Parecer</TableHeadCell><TableHeadCell>Ações</TableHeadCell></TableHead>
          <TableBody>
            {sessoes.map(s => (
              <TableRow key={s.id} className="bg-white">
                <TableCell><strong>{new Date(s.dataSessao).toLocaleDateString()}</strong> <br/><span className="text-xs">{s.psicologoNome}</span></TableCell>
                <TableCell className="text-sm truncate max-w-xs">{s.parecer}</TableCell>
                <TableCell><Button size="sm" color="light" onClick={async () => { await SessaoPsicologicaService.inativar(s.id); carregarDados(); }}><FaTrashAlt className="text-red-600" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ModalBody>
    </Modal>
  );
}