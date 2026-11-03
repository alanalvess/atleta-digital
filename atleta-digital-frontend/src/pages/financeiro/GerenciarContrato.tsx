import {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner } from 'flowbite-react';
import TextInputField from '../../components/form/TextInputField';
import SelectField from '../../components/form/SelectField';
import { ContratoFinanceiroService } from '../../services/ContratoFinanceiroService';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { ContratoFinanceiro } from '../../models/ContratoFinanceiro';
import type { Atleta } from '../../models/Atleta';

interface GerenciarContratoProps {
  isOpen: boolean;
  onClose: () => void;
  atleta: Atleta;
}

export default function GerenciarContrato({ isOpen, onClose, atleta }: GerenciarContratoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [contratoId, setContratoId] = useState<number | null>(null);

  const [formData, setFormData] = useState<ContratoFinanceiro>({
    id: 0,
    atletaId: 0,
    tipoVinculo: '',
    valorAcordado: undefined,
    diaVencimento: undefined,
    isento: false,
    observacoes: ''
  });

  useEffect(() => {
    if (isOpen && atleta) {
      setFormData(prev => ({ ...prev, atletaId: atleta.id }));
      carregarContratoExistente().then();
    }
  }, [isOpen, atleta]);

  async function carregarContratoExistente() {
    try {
      setIsFetching(true);
      const existente = await ContratoFinanceiroService.buscarPorAtleta(atleta.id);
      if (existente) {
        setContratoId(existente.id);
        setFormData({
          id: 0,
          atletaId: existente.atletaId,
          tipoVinculo: existente.tipoVinculo || '',
          valorAcordado: existente.valorAcordado,
          diaVencimento: existente.diaVencimento,
          isento: existente.isento || false,
          observacoes: existente.observacoes || ''
        });
      }
    } catch (error: any) {
      // 404 significa que o atleta ainda não tem contrato financeiro
      if (error.response?.status !== 404) {
        ToastAlerta('Erro ao consultar contrato financeiro', Toast.Error);
      } else {
        setContratoId(null);
        setFormData({
          id: 0,
          atletaId: atleta.id,
          tipoVinculo: '',
          valorAcordado: undefined,
          diaVencimento: undefined,
          isento: false, observacoes: ''
        });
      }
    } finally {
      setIsFetching(false);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    let parsedValue: string | number | boolean = value;
    if (name === 'valorAcordado' || name === 'diaVencimento') {
      parsedValue = value ? Number(value) : '';
    } else if (name === 'isento') {
      parsedValue = value === 'true';
    }

    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await ContratoFinanceiroService.cadastrar(formData);
      ToastAlerta('Contrato financeiro salvo com sucesso!', Toast.Success);
      onClose();
    } catch (error: any) {
      ToastAlerta(error.response?.data?.message || 'Erro ao salvar contrato', Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  const tiposVinculoOptions = [
    { value: 'GRATUITO', label: 'Gratuito' },
    { value: 'MENSALIDADE', label: 'Contribuição Mensal' },
    { value: 'BOLSA', label: 'Bolsa / Auxílio' },
    { value: 'OUTRO', label: 'Outro' }
  ];

  return (
    <Modal dismissible show={isOpen} onClose={onClose} size="2xl" popup>
      <ModalHeader />
      <ModalBody>
        <Card className="mb-4 bg-gray-100 shadow-sm text-center">
          <h2 className="text-xl font-semibold">Contrato e Vínculo Financeiro</h2>
          <p className="text-sm text-gray-600">Atleta: <strong>{atleta?.nomeCompleto}</strong></p>
        </Card>

        {isFetching ? (
          <div className="flex justify-center py-10"><Spinner size="xl" /></div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4">
              <SelectField
                label="Tipo de Vínculo *"
                name="tipoVinculo"
                value={formData.tipoVinculo}
                options={tiposVinculoOptions}
                onChange={handleChange}
                required
              />
              <SelectField
                label="Isento de Pagamento? *"
                name="isento"
                value={formData.isento ? 'true' : 'false'}
                options={[{ value: 'false', label: 'Não' }, { value: 'true', label: 'Sim' }]}
                onChange={handleChange}
                required
              />
            </fieldset>

            {/* Renderiza campos de cobrança apenas se o atleta não for isento e não for vínculo 100% gratuito */}
            {(!formData.isento && formData.tipoVinculo !== 'GRATUITO') && (
              <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4">
                <TextInputField
                  label="Valor Acordado Mensal (R$)"
                  name="valorAcordado"
                  type="number"
                  value={formData.valorAcordado?.toString() || ''}
                  onChange={handleChange}
                  placeholder="Ex: 150.00"
                />
                <TextInputField
                  label="Dia de Vencimento"
                  name="diaVencimento"
                  type="number"
                  value={formData.diaVencimento?.toString() || ''}
                  onChange={handleChange}
                  placeholder="Ex: 10"
                />
              </fieldset>
            )}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Observações Financeiras</label>
              <textarea
                name="observacoes"
                rows={3}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                value={formData.observacoes || ''}
                onChange={handleChange}
                placeholder="Detalhes sobre bolsas, descontos ou negociações pendentes..."
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button color="gray" onClick={onClose} disabled={isLoading}>Cancelar</Button>
              <Button type="submit" color="green" disabled={isLoading}>
                {isLoading ? <Spinner size="sm" className="mr-2"/> : (contratoId ? 'Atualizar Contrato' : 'Salvar Contrato')}
              </Button>
            </div>
          </form>
        )}
      </ModalBody>
    </Modal>
  );
}