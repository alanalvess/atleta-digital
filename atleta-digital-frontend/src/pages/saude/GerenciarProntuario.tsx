import {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner } from 'flowbite-react';
import SelectField from '../../components/form/SelectField';
import { ProntuarioBaseService } from '../../services/ProntuarioBaseService';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { ProntuarioBase } from '../../models/ProntuarioBase';
import type { Atleta } from '../../models/Atleta';

interface GerenciarProntuarioProps {
  isOpen: boolean;
  onClose: () => void;
  atleta: Atleta;
}

export default function GerenciarProntuario({ isOpen, onClose, atleta }: GerenciarProntuarioProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [prontuarioId, setProntuarioId] = useState<number | null>(null);

  const [formData, setFormData] = useState<ProntuarioBase>({
    id: 0,
    atletaId: 0,
    tipoSanguineo: '',
    alergias: '',
    historicoCirurgias: '',
    doencasCronicas: '',
    medicamentosUsoContinuo: ''
  });

  useEffect(() => {
    if (isOpen && atleta) {
      setFormData(prev => ({ ...prev, atletaId: atleta.id }));
      carregarProntuarioExistente().then();
    }
  }, [isOpen, atleta]);

  async function carregarProntuarioExistente() {
    try {
      setIsFetching(true);
      const existente = await ProntuarioBaseService.buscarPorAtleta(atleta.id);
      if (existente) {
        setProntuarioId(existente.id);
        setFormData({
          id: 0,
          atletaId: existente.atletaId,
          tipoSanguineo: existente.tipoSanguineo || '',
          alergias: existente.alergias || '',
          historicoCirurgias: existente.historicoCirurgias || '',
          doencasCronicas: existente.doencasCronicas || '',
          medicamentosUsoContinuo: existente.medicamentosUsoContinuo || ''
        });
      }
    } catch (error: any) {
      // 404 é esperado caso o atleta seja novo e ainda não tenha prontuário
      if (error.response?.status !== 404) {
        ToastAlerta('Erro ao consultar prontuário base', Toast.Error);
      } else {
        setProntuarioId(null);
        setFormData({
          id: 0,
          atletaId: atleta.id,
          tipoSanguineo: '',
          alergias: '',
          historicoCirurgias: '',
          doencasCronicas: '',
          medicamentosUsoContinuo: ''
        });
      }
    } finally {
      setIsFetching(false);
    }
  }

  function handleChange(e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await ProntuarioBaseService.cadastrar(formData);
      ToastAlerta('Prontuário salvo com sucesso!', Toast.Success);
      onClose();
    } catch (error: any) {
      ToastAlerta(error.response?.data?.message || 'Erro ao salvar prontuário', Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  const tiposSanguineos = [
    { value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' }, { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' }, { value: 'O-', label: 'O-' }
  ];

  return (
    <Modal dismissible show={isOpen} onClose={onClose} size="2xl" popup>
      <ModalHeader />
      <ModalBody>
        <Card className="mb-4 bg-gray-100 shadow-sm text-center">
          <h2 className="text-xl font-semibold">Anamnese e Prontuário Base</h2>
          <p className="text-sm text-gray-600">Atleta: <strong>{atleta?.nomeCompleto}</strong></p>
        </Card>

        {isFetching ? (
          <div className="flex justify-center py-10"><Spinner size="xl" /></div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Tipo Sanguíneo"
                name="tipoSanguineo"
                value={formData.tipoSanguineo || ''}
                options={tiposSanguineos}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Alergias (Medicamentos, Alimentos, etc.)</label>
              <textarea
                name="alergias"
                rows={2}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                value={formData.alergias || ''}
                onChange={handleChange}
                placeholder="Ex: Nenhuma alergia conhecida."
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Doenças Crônicas</label>
              <textarea
                name="doencasCronicas"
                rows={2}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                value={formData.doencasCronicas || ''}
                onChange={handleChange}
                placeholder="Ex: Asma, Diabetes."
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Histórico de Cirurgias ou Lesões Graves</label>
              <textarea
                name="historicoCirurgias"
                rows={2}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                value={formData.historicoCirurgias || ''}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Medicamentos de Uso Contínuo</label>
              <textarea
                name="medicamentosUsoContinuo"
                rows={2}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                value={formData.medicamentosUsoContinuo || ''}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button color="gray" onClick={onClose} disabled={isLoading}>Cancelar</Button>
              <Button type="submit" color="green" disabled={isLoading}>
                {isLoading ? <Spinner size="sm" className="mr-2"/> : (prontuarioId ? 'Atualizar Prontuário' : 'Criar Prontuário')}
              </Button>
            </div>
          </form>
        )}
      </ModalBody>
    </Modal>
  );
}