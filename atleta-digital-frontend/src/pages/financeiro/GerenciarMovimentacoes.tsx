import {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Badge } from 'flowbite-react';
import { FaTrashAlt, FaMoneyBillWave } from 'react-icons/fa';
import TextInputField from '../../components/form/TextInputField';
import SelectField from '../../components/form/SelectField';
import { MovimentacaoFinanceiraService } from '../../services/MovimentacaoFinanceiraService';
import { FuncionarioService } from '../../services/FuncionarioService';
import { TipoMovimentacao } from '../../enums/TipoMovimentacao';
import { StatusPagamento } from '../../enums/StatusPagamento';
import { Cargo } from '../../enums/Cargo';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { MovimentacaoFinanceira } from '../../models/MovimentacaoFinanceira';
import type { Atleta } from '../../models/Atleta';
import type { Funcionario } from '../../models/Funcionario';
import type {ContratoFinanceiro} from "../../models/ContratoFinanceiro.ts";

interface GerenciarMovimentacoesProps {
  isOpen: boolean;
  onClose: () => void;
  atleta: Atleta;
}

export default function GerenciarMovimentacoes({ isOpen, onClose, atleta }: GerenciarMovimentacoesProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [movimentacoes, setMovimentacoes] = useState<MovimentacaoFinanceira[]>([]);
  const [responsaveis, setResponsaveis] = useState<Funcionario[]>([]);

  const [formData, setFormData] = useState<MovimentacaoFinanceira>({
    id: 0,
    atletaId: atleta?.id || 0,
    descricao: '',
    tipo: TipoMovimentacao.RECEITA,
    valor: '' as unknown as number,
    dataVencimento: '',
    dataPagamento: '',
    status: StatusPagamento.PENDENTE,
    responsavelFinanceiroId: undefined
  });

  useEffect(() => {
    if (isOpen && atleta) {
      setFormData(prev => ({ ...prev, atletaId: atleta.id }));
      carregarDependencias();
    }
  }, [isOpen, atleta]);

  async function carregarDependencias() {
    try {
      setIsFetching(true);
      const [listaMovimentacoes, listaFuncionarios] = await Promise.all([
        MovimentacaoFinanceiraService.listarPorAtleta(atleta.id),
        FuncionarioService.listarTodos()
      ]);
      setMovimentacoes(listaMovimentacoes);
      // Filtra apenas funcionários do financeiro ou diretoria
      setResponsaveis(listaFuncionarios.filter(f =>
        f.cargo === Cargo.ADMINISTRATIVO_FINANCEIRO || f.cargo === Cargo.PRESIDENTE || f.cargo === Cargo.DIRETOR
      ));
    } catch (error) {
      ToastAlerta('Erro ao carregar dados financeiros', Toast.Error);
    } finally {
      setIsFetching(false);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'valor' || name === 'responsavelFinanceiroId') ? (value ? Number(value) : undefined) : value
    }));
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await MovimentacaoFinanceiraService.cadastrar(formData);
      ToastAlerta('Lançamento registrado com sucesso!', Toast.Success);
      setFormData(formData);
      carregarDependencias().then();
    } catch (error: any) {
      ToastAlerta(error.response?.data?.message || 'Erro ao registrar lançamento', Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  async function excluirMovimentacao(id: number) {
    try {
      await MovimentacaoFinanceiraService.inativar(id);
      ToastAlerta('Lançamento inativado.', Toast.Success);
      carregarDependencias();
    } catch (error) {
      ToastAlerta('Erro ao inativar lançamento', Toast.Error);
    }
  }

  const tiposOptions = Object.values(TipoMovimentacao).map(t => ({ value: t, label: t }));
  const statusOptions = Object.values(StatusPagamento).map(s => ({ value: s, label: s }));
  const responsaveisOptions = responsaveis.map(r => ({ value: r.id.toString(), label: r.nomeCompleto }));

  return (
    <Modal dismissible show={isOpen} onClose={onClose} size="5xl" popup>
      <ModalHeader />
      <ModalBody>
        <Card className="mb-4 bg-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <FaMoneyBillWave className="text-green-600 text-2xl" />
            <div>
              <h2 className="text-xl font-semibold">Extrato e Lançamentos Financeiros</h2>
              <p className="text-sm text-gray-600">Atleta: <strong>{atleta?.nomeCompleto}</strong></p>
            </div>
          </div>
        </Card>

        {/* Formulário de Novo Lançamento */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded border mb-6">
          <h3 className="text-md font-semibold text-gray-700 border-b pb-2 mb-3">Novo Lançamento</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInputField label="Descrição *" name="descricao" value={formData.descricao} onChange={handleChange} placeholder="Ex: Mensalidade Maio" required />
            <SelectField label="Tipo *" name="tipo" value={formData.tipo} options={tiposOptions} onChange={handleChange} required />
            <TextInputField label="Valor (R$) *" name="valor" type="number" value={formData.valor?.toString() || ''} onChange={handleChange} required />
            <TextInputField label="Data de Vencimento *" name="dataVencimento" type="date" value={formData.dataVencimento} onChange={handleChange} required />
            <SelectField label="Status *" name="status" value={formData.status} options={statusOptions} onChange={handleChange} required />
            <TextInputField label="Data de Pagamento" name="dataPagamento" type="date" value={formData.dataPagamento || ''} onChange={handleChange} disabled={formData.status !== StatusPagamento.PAGO} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <SelectField label="Responsável pelo Recebimento/Lançamento" name="responsavelFinanceiroId" value={formData.responsavelFinanceiroId?.toString() || ''} options={responsaveisOptions} onChange={handleChange} />
            <div className="flex items-end justify-end">
              <Button type="submit" color="green" disabled={isLoading}>
                {isLoading ? <Spinner size="sm" className="mr-2"/> : 'Adicionar ao Extrato'}
              </Button>
            </div>
          </div>
        </form>

        {/* Histórico / Tabela */}
        <h3 className="text-md font-semibold text-gray-700 mb-3">Histórico de Movimentações</h3>
        {isFetching ? (
          <div className="flex justify-center py-6"><Spinner size="lg" /></div>
        ) : (
          <div className="overflow-x-auto max-h-80 shadow-md sm:rounded-lg">
            <Table hoverable>
              <TableHead>
                <TableHeadCell>Descrição</TableHeadCell>
                <TableHeadCell>Tipo / Valor</TableHeadCell>
                <TableHeadCell>Vencimento</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell className="text-center">Ações</TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                {movimentacoes.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-4">Nenhuma movimentação registrada.</TableCell></TableRow>
                ) : (
                  movimentacoes.map(mov => (
                    <TableRow key={mov.id} className="bg-white">
                      <TableCell className="font-medium text-gray-900">{mov.descricao}</TableCell>
                      <TableCell>
                        <Badge color={mov.tipo === TipoMovimentacao.RECEITA ? 'success' : 'failure'} className="inline-block mb-1">
                          {mov.tipo}
                        </Badge>
                        <div className="font-semibold text-gray-700">R$ {mov.valor.toFixed(2)}</div>
                      </TableCell>
                      <TableCell>{new Date(mov.dataVencimento).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        <Badge color={mov.status === StatusPagamento.PAGO ? 'success' : mov.status === StatusPagamento.PENDENTE ? 'warning' : 'failure'}>
                          {mov.status}
                        </Badge>
                        {mov.dataPagamento && <div className="text-xs text-gray-500 mt-1">Pago em: {new Date(mov.dataPagamento).toLocaleDateString('pt-BR')}</div>}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Button size="sm" color="light" onClick={() => excluirMovimentacao(mov.id)}>
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