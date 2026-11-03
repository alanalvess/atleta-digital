import {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner } from 'flowbite-react';
import TextInputField from '../../components/form/TextInputField';
import SelectField from '../../components/form/SelectField';
import { PerfilSocialFamiliarService } from '../../services/PerfilSocialFamiliarService';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { PerfilSocialFamiliar } from '../../models/PerfilSocialFamiliar';
import type { Atleta } from '../../models/Atleta';

interface GerenciarPerfilSocialProps {
  isOpen: boolean;
  onClose: () => void;
  atleta: Atleta;
}

export default function GerenciarPerfilSocial({ isOpen, onClose, atleta }: GerenciarPerfilSocialProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [perfilId, setPerfilId] = useState<number | null>(null);

  const [formData, setFormData] = useState<PerfilSocialFamiliar>({
    id: 0,
    atletaId: 0,
    moradoresResidencia: undefined,
    responsavelRenda: '',
    faixaSalarial: '',
    tipoMoradia: '',
    meioTransporteTreino: '',
    tempoDeslocamentoMinutos: undefined,
    dificuldadeAlimentacao: false,
    necessidadesApoio: ''
  });

  useEffect(() => {
    if (isOpen && atleta) {
      setFormData(prev => ({ ...prev, atletaId: atleta.id }));
      carregarPerfilExistente();
    }
  }, [isOpen, atleta]);

  async function carregarPerfilExistente() {
    try {
      setIsFetching(true);
      const existente = await PerfilSocialFamiliarService.buscarPorAtleta(atleta.id);
      if (existente) {
        setPerfilId(existente.id);
        setFormData({
          id: 0,
          atletaId: existente.atletaId,
          moradoresResidencia: existente.moradoresResidencia,
          responsavelRenda: existente.responsavelRenda || '',
          faixaSalarial: existente.faixaSalarial || '',
          tipoMoradia: existente.tipoMoradia || '',
          meioTransporteTreino: existente.meioTransporteTreino || '',
          tempoDeslocamentoMinutos: existente.tempoDeslocamentoMinutos,
          dificuldadeAlimentacao: existente.dificuldadeAlimentacao || false,
          necessidadesApoio: existente.necessidadesApoio || ''
        });
      }
    } catch (error: any) {
      if (error.response?.status !== 404) {
        ToastAlerta('Erro ao consultar perfil social', Toast.Error);
      } else {
        setPerfilId(null);
        setFormData({
          id: 0,
          atletaId: atleta.id,
          moradoresResidencia: undefined,
          responsavelRenda: '',
          faixaSalarial: '',
          tipoMoradia: '',
          meioTransporteTreino: '',
          tempoDeslocamentoMinutos: undefined,
          dificuldadeAlimentacao: false,
          necessidadesApoio: ''
        });
      }
    } finally {
      setIsFetching(false);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    let parsedValue: string | number | boolean = value;
    if (name === 'moradoresResidencia' || name === 'tempoDeslocamentoMinutos') {
      parsedValue = value ? Number(value) : '';
    } else if (name === 'dificuldadeAlimentacao') {
      parsedValue = value === 'true';
    }

    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await PerfilSocialFamiliarService.cadastrar(formData);
      ToastAlerta('Perfil social salvo com sucesso!', Toast.Success);
      onClose();
    } catch (error: any) {
      ToastAlerta(error.response?.data?.message || 'Erro ao salvar perfil social', Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  const faixaSalarialOptions = [
    { value: '1-2 SM', label: '1 a 2 Salários Mínimos' },
    { value: '2-3 SM', label: '2 a 3 Salários Mínimos' },
    { value: '3-5 SM', label: '3 a 5 Salários Mínimos' },
    { value: 'Acima de 5 SM', label: 'Acima de 5 Salários Mínimos' }
  ];

  const moradiaOptions = [
    { value: 'Própria', label: 'Própria' },
    { value: 'Alugada', label: 'Alugada' },
    { value: 'Cedida', label: 'Cedida' },
    { value: 'Outra', label: 'Outra' }
  ];

  return (
    <Modal dismissible show={isOpen} onClose={onClose} size="3xl" popup>
      <ModalHeader />
      <ModalBody>
        <Card className="mb-4 bg-gray-100 shadow-sm text-center">
          <h2 className="text-xl font-semibold">Perfil Social e Familiar</h2>
          <p className="text-sm text-gray-600">Atleta: <strong>{atleta?.nomeCompleto}</strong></p>
        </Card>

        {isFetching ? (
          <div className="flex justify-center py-10"><Spinner size="xl" /></div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4">
              <legend className="text-lg font-semibold mb-2 text-gray-700">Composição Familiar</legend>
              <TextInputField label="Moradores na Residência" name="moradoresResidencia" type="number" value={formData.moradoresResidencia?.toString() || ''} onChange={handleChange} required />
              <TextInputField label="Responsável Principal pela Renda" name="responsavelRenda" value={formData.responsavelRenda || ''} onChange={handleChange} />
              <SelectField label="Faixa Salarial" name="faixaSalarial" value={formData.faixaSalarial || ''} options={faixaSalarialOptions} onChange={handleChange} />
            </fieldset>

            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4">
              <legend className="text-lg font-semibold mb-2 text-gray-700">Moradia e Rotina</legend>
              <SelectField label="Tipo de Moradia" name="tipoMoradia" value={formData.tipoMoradia || ''} options={moradiaOptions} onChange={handleChange} />
              <TextInputField label="Meio de Transporte ao Treino" name="meioTransporteTreino" value={formData.meioTransporteTreino || ''} onChange={handleChange} placeholder="Ex: Ônibus, Bicicleta, Carro" />
              <TextInputField label="Tempo de Deslocamento (Minutos)" name="tempoDeslocamentoMinutos" type="number" value={formData.tempoDeslocamentoMinutos?.toString() || ''} onChange={handleChange} />
              <SelectField
                label="Dificuldade com Alimentação?"
                name="dificuldadeAlimentacao"
                value={formData.dificuldadeAlimentacao ? 'true' : 'false'}
                options={[{ value: 'false', label: 'Não' }, { value: 'true', label: 'Sim' }]}
                onChange={handleChange}
                required
              />
            </fieldset>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Necessidades de Apoio (Material, Cesta Básica, Vale Transporte)</label>
              <textarea
                name="necessidadesApoio"
                rows={3}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                value={formData.necessidadesApoio || ''}
                onChange={handleChange}
                placeholder="Detalhe caso a família precise de apoio do clube..."
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button color="gray" onClick={onClose} disabled={isLoading}>Cancelar</Button>
              <Button type="submit" color="green" disabled={isLoading}>
                {isLoading ? <Spinner size="sm" className="mr-2"/> : (perfilId ? 'Atualizar Perfil' : 'Salvar Perfil')}
              </Button>
            </div>
          </form>
        )}
      </ModalBody>
    </Modal>
  );
}