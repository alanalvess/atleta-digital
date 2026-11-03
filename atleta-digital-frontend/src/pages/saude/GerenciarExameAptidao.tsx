import {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Badge } from 'flowbite-react';
import { FaTrashAlt, FaHeartbeat } from 'react-icons/fa';
import TextInputField from '../../components/form/TextInputField';
import SelectField from '../../components/form/SelectField';
import { ExameAptidaoService } from '../../services/ExameAptidaoService';
import { AptidaoFisica } from '../../enums/AptidaoFisica';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { ExameAptidao } from '../../models/ExameAptidao';
import type { Atleta } from '../../models/Atleta';

interface GerenciarExamesProps {
  isOpen: boolean;
  onClose: () => void;
  atleta: Atleta;
}

export default function GerenciarExamesAptidao({ isOpen, onClose, atleta }: GerenciarExamesProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [exames, setExames] = useState<ExameAptidao[]>([]);

  const [formData, setFormData] = useState<ExameAptidao>({
    id: 0,
    atletaId: atleta?.id || 0,
    dataExame: new Date().toISOString().split('T')[0],
    validade: '',
    peso: undefined,
    altura: undefined,
    imc: undefined,
    pressaoArterial: undefined,
    aptidao: AptidaoFisica.APTO
  });

  useEffect(() => {
    if (isOpen && atleta) {
      setFormData(prev => ({ ...prev, atletaId: atleta.id }));
      carregarExames();
    }
  }, [isOpen, atleta]);

  async function carregarExames() {
    try {
      setIsFetching(true);
      const listaExames = await ExameAptidaoService.listarPorAtleta(atleta.id);
      setExames(listaExames);
    } catch {
      ToastAlerta('Erro ao carregar exames', Toast.Error);
    } finally {
      setIsFetching(false);
    }
  }

  function calcularImc(pesoStr?: string, alturaStr?: string) {
    const peso = Number(pesoStr || formData.peso);
    const altura = Number(alturaStr || formData.altura);
    if (peso > 0 && altura > 0) {
      return Number((peso / (altura * altura)).toFixed(2));
    }
    return undefined;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    setFormData(prev => {
      const newData = { ...prev, [name]: (name === 'peso' || name === 'altura' || name === 'pressaoArterial' || name === 'imc') ? (value ? Number(value) : undefined) : value };

      // Auto-calcular IMC
      if (name === 'peso' || name === 'altura') {
        newData.imc = calcularImc(name === 'peso' ? value : undefined, name === 'altura' ? value : undefined);
      }
      return newData;
    });
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await ExameAptidaoService.cadastrar(formData);
      ToastAlerta('Exame registrado com sucesso!', Toast.Success);
      setFormData({ ...formData, atletaId: atleta.id });
      carregarExames();
    } catch (error: any) {
      ToastAlerta(error.response?.data?.message || 'Erro ao registrar exame', Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  async function excluirExame(id: number) {
    try {
      await ExameAptidaoService.inativar(id);
      ToastAlerta('Exame inativado.', Toast.Success);
      carregarExames();
    } catch {
      ToastAlerta('Erro ao inativar exame', Toast.Error);
    }
  }

  const aptidaoOptions = Object.values(AptidaoFisica).map(a => ({ value: a, label: a.replace(/_/g, ' ') }));

  return (
    <Modal dismissible show={isOpen} onClose={onClose} size="5xl" popup>
      <ModalHeader />
      <ModalBody>
        <Card className="mb-4 bg-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <FaHeartbeat className="text-red-600 text-2xl" />
            <div>
              <h2 className="text-xl font-semibold">Exames e Aptidão Física</h2>
              <p className="text-sm text-gray-600">Atleta: <strong>{atleta?.nomeCompleto}</strong></p>
            </div>
          </div>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded border mb-6">
          <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-3">Registrar Novo Exame</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <TextInputField label="Data do Exame *" name="dataExame" type="date" value={formData.dataExame} onChange={handleChange} required />
            <TextInputField label="Validade" name="validade" type="date" value={formData.validade || ''} onChange={handleChange} />
            <SelectField label="Aptidão Física *" name="aptidao" value={formData.aptidao || ''} options={aptidaoOptions} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
            <TextInputField label="Peso (kg)" name="peso" type="number" value={formData.peso?.toString() || ''} onChange={handleChange} placeholder="Ex: 70.5" />
            <TextInputField label="Altura (m)" name="altura" type="number" value={formData.altura?.toString() || ''} onChange={handleChange} placeholder="Ex: 1.75" />
            <TextInputField label="IMC (Auto)" name="imc" type="number" value={formData.imc?.toString() || ''} onChange={handleChange} disabled />
            <TextInputField label="Pressão Arterial" name="pressaoArterial" type="number" value={formData.pressaoArterial?.toString() || ''} onChange={handleChange} placeholder="Ex: 12.8" />
          </div>
          <div className="flex justify-end mt-2">
            <Button type="submit" color="red" disabled={isLoading}>{isLoading ? <Spinner size="sm"/> : 'Salvar Exame'}</Button>
          </div>
        </form>

        <h3 className="text-md font-semibold text-gray-700 mb-3">Histórico de Exames</h3>
        {isFetching ? <div className="flex justify-center py-6"><Spinner size="lg" /></div> : (
          <div className="overflow-x-auto max-h-80 shadow-md sm:rounded-lg">
            <Table hoverable>
              <TableHead>
                <TableHeadCell>Data / Validade</TableHeadCell>
                <TableHeadCell>Métricas Físicas</TableHeadCell>
                <TableHeadCell>Aptidão</TableHeadCell>
                <TableHeadCell className="text-center">Ações</TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                {exames.length === 0 ? <TableRow><TableCell colSpan={4} className="text-center py-4">Nenhum exame registrado.</TableCell></TableRow> : (
                  exames.map(ex => (
                    <TableRow key={ex.id} className="bg-white">
                      <TableCell>
                        <div className="font-semibold text-gray-900">{new Date(ex.dataExame).toLocaleDateString('pt-BR')}</div>
                        {ex.validade && <div className="text-xs text-gray-500">Validade: {new Date(ex.validade).toLocaleDateString('pt-BR')}</div>}
                      </TableCell>
                      <TableCell className="text-sm">
                        Peso: {ex.peso || '-'} kg | Alt: {ex.altura || '-'} m <br/>
                        IMC: {ex.imc || '-'} | PA: {ex.pressaoArterial || '-'}
                      </TableCell>
                      <TableCell>
                        <Badge color={ex.aptidao === AptidaoFisica.APTO ? 'success' : ex.aptidao === AptidaoFisica.INAPTO ? 'failure' : 'warning'}>
                          {ex.aptidao?.replace(/_/g, ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Button size="sm" color="light" onClick={() => excluirExame(ex.id)}><FaTrashAlt className="text-red-600" /></Button>
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