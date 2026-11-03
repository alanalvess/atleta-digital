import {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Badge } from 'flowbite-react';
import { FaTrashAlt, FaGraduationCap } from 'react-icons/fa';
import TextInputField from '../../components/form/TextInputField';
import SelectField from '../../components/form/SelectField';
import { MatriculaEscolarService } from '../../services/MatriculaEscolarService';
import { TurnoEscolar } from '../../enums/TurnoEscolar';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { MatriculaEscolar } from '../../models/MatriculaEscolar';
import type { Atleta } from '../../models/Atleta';

interface GerenciarMatriculasProps {
  isOpen: boolean;
  onClose: () => void;
  atleta: Atleta;
}

export default function GerenciarMatriculasEscolares({ isOpen, onClose, atleta }: GerenciarMatriculasProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [matriculas, setMatriculas] = useState<MatriculaEscolar[]>([]);

  const [formData, setFormData] = useState<MatriculaEscolar>({
    id: 0,
    atletaId: atleta?.id || 0,
    temporada: new Date().getFullYear().toString(),
    nomeEscola: '',
    redeEnsino: '',
    anoSerie: '',
    turno: TurnoEscolar.MANHA
  });

  useEffect(() => {
    if (isOpen && atleta) {
      setFormData(prev => ({ ...prev, atletaId: atleta.id }));
      carregarMatriculas();
    }
  }, [isOpen, atleta]);

  async function carregarMatriculas() {
    try {
      setIsFetching(true);
      const dados = await MatriculaEscolarService.listarPorAtleta(atleta.id);
      setMatriculas(dados);
    } catch (error) {
      ToastAlerta('Erro ao carregar histórico escolar', Toast.Error);
    } finally {
      setIsFetching(false);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await MatriculaEscolarService.cadastrar(formData);
      ToastAlerta('Matrícula registrada com sucesso!', Toast.Success);
      setFormData({ ...formData, atletaId: atleta.id });
      carregarMatriculas().then();
    } catch (error: any) {
      ToastAlerta(error.response?.data?.message || 'Erro ao registrar matrícula', Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  async function excluirMatricula(id: number) {
    try {
      await MatriculaEscolarService.inativar(id);
      ToastAlerta('Matrícula inativada.', Toast.Success);
      carregarMatriculas();
    } catch (error) {
      ToastAlerta('Erro ao inativar matrícula', Toast.Error);
    }
  }

  const turnoOptions = Object.values(TurnoEscolar).map(t => ({ value: t, label: t }));
  const redeEnsinoOptions = [
    { value: 'PUBLICA_ESTADUAL', label: 'Pública Estadual' },
    { value: 'PUBLICA_MUNICIPAL', label: 'Pública Municipal' },
    { value: 'PARTICULAR', label: 'Particular' },
    { value: 'OUTRA', label: 'Outra' }
  ];

  return (
    <Modal dismissible show={isOpen} onClose={onClose} size="5xl" popup>
      <ModalHeader />
      <ModalBody>
        <Card className="mb-4 bg-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <FaGraduationCap className="text-blue-600 text-2xl" />
            <div>
              <h2 className="text-xl font-semibold">Educação e Matrícula Escolar</h2>
              <p className="text-sm text-gray-600">Atleta: <strong>{atleta?.nomeCompleto}</strong></p>
            </div>
          </div>
        </Card>

        {/* Formulário de Nova Matrícula */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded border mb-6">
          <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-3">Registrar Matrícula</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInputField label="Temporada (Ano) *" name="temporada" value={formData.temporada} onChange={handleChange} required />
            <TextInputField label="Nome da Escola *" name="nomeEscola" value={formData.nomeEscola} onChange={handleChange} placeholder="Ex: EE Prof. João Silva" required />
            <SelectField label="Rede de Ensino" name="redeEnsino" value={formData.redeEnsino || ''} options={redeEnsinoOptions} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <TextInputField label="Ano / Série" name="anoSerie" value={formData.anoSerie || ''} onChange={handleChange} placeholder="Ex: 1º Ano Ensino Médio" />
            <SelectField label="Turno *" name="turno" value={formData.turno} options={turnoOptions} onChange={handleChange} required />
            <div className="flex items-end justify-end">
              <Button type="submit" color="blue" disabled={isLoading} className="w-full">
                {isLoading ? <Spinner size="sm" className="mr-2"/> : 'Salvar Matrícula'}
              </Button>
            </div>
          </div>
        </form>

        {/* Histórico Escolar / Tabela */}
        <h3 className="text-md font-semibold text-gray-700 mb-3">Histórico Escolar</h3>
        {isFetching ? (
          <div className="flex justify-center py-6"><Spinner size="lg" /></div>
        ) : (
          <div className="overflow-x-auto max-h-80 shadow-md sm:rounded-lg">
            <Table hoverable>
              <TableHead>
                <TableHeadCell>Temporada</TableHeadCell>
                <TableHeadCell>Escola</TableHeadCell>
                <TableHeadCell>Série / Turno</TableHeadCell>
                <TableHeadCell className="text-center">Ações</TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                {matriculas.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-4">Nenhuma matrícula registrada.</TableCell></TableRow>
                ) : (
                  matriculas.map(mat => (
                    <TableRow key={mat.id} className="bg-white">
                      <TableCell className="font-semibold text-gray-900">{mat.temporada}</TableCell>
                      <TableCell>
                        <div className="font-medium">{mat.nomeEscola}</div>
                        <div className="text-xs text-gray-500">{mat.redeEnsino?.replace('_', ' ')}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{mat.anoSerie || '-'}</div>
                        <Badge color="info" className="inline-block mt-1">{mat.turno}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button size="sm" color="light" onClick={() => excluirMatricula(mat.id)}>
                            <FaTrashAlt className="text-red-600" />
                          </Button>
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