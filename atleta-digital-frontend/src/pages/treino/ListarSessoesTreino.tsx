import {useEffect, useState} from 'react';
import {Button, Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react';
import {FaFutbol, FaPlus, FaTrashAlt} from 'react-icons/fa';
import {SessaoTreinoService} from '../../services/SessaoTreinoService';
import type {SessaoTreino} from '../../models/SessaoTreino';
import {Categoria} from '../../enums/Categoria';
import {ToastAlerta} from '../../utils/ToastAlerta';
import {Toast} from '../../enums/Toast';
import CadastrarSessaoTreino from './CadastrarSessaoTreino';
import DeletarSessaoTreino from './DeletarSessaoTreino';
import GerenciarChamada from "./GerenciarChamada.tsx";

export default function ListarSessoesTreino() {
  const [sessoes, setSessoes] = useState<SessaoTreino[]>([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState<Categoria>(Categoria.SUB_15);
  const [isLoading, setIsLoading] = useState(false);

  const [modalCadastro, setModalCadastro] = useState(false);
  const [modalExclusao, setModalExclusao] = useState(false);
  const [modalChamada, setModalChamada] = useState(false);
  const [sessaoSelecionada, setSessaoSelecionada] = useState<SessaoTreino | null>(null);

  useEffect(() => {
    carregarSessoes().then();
  }, [categoriaFiltro]);

  async function carregarSessoes() {
    try {
      setIsLoading(true);
      const dados = await SessaoTreinoService.listarPorCategoria(categoriaFiltro);
      setSessoes(dados);
    } catch (error) {
      ToastAlerta('Erro ao carregar sessões de treino', Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="pt-32 md:pl-80 md:pr-20 pb-10 px-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
            <FaFutbol className="text-blue-600"/> Diário de Treinos
          </h1>
          <Button color="alternative" onClick={() => setModalCadastro(true)}>
            <FaPlus className="mr-2"/> Nova Sessão de Treino
          </Button>
        </div>

        <div className="mb-6 flex gap-4 items-center">
          <label className="font-semibold text-gray-700">Filtrar por Categoria:</label>
          <select
            className="rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value as Categoria)}
          >
            {Object.values(Categoria).map(cat => (
              <option key={cat} value={cat}>{cat.replace('_', ' ')}</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10"><Spinner size="xl"/></div>
        ) : (
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <Table hoverable>
              <TableHead>
                <TableHeadCell>Data</TableHeadCell>
                <TableHeadCell>Foco do Treino</TableHeadCell>
                <TableHeadCell>Treinador Responsável</TableHeadCell>
                <TableHeadCell>Observações</TableHeadCell>
                <TableHeadCell className="text-center">Ações</TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                {sessoes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">Nenhum treino registrado para esta
                      categoria.</TableCell>
                  </TableRow>
                ) : (
                  sessoes.map((sessao) => (
                    <TableRow key={sessao.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell
                        className="font-semibold">{new Date(sessao.dataTreino).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{sessao.focoTreino}</TableCell>
                      <TableCell>{sessao.treinadorNome || 'Não informado'}</TableCell>
                      <TableCell className="truncate max-w-xs" title={sessao.observacoesTreinador}>
                        {sessao.observacoesTreinador || '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            color="light"
                            onClick={() => {
                              setSessaoSelecionada(sessao);
                              setModalChamada(true);
                            }}
                          >
                            Chamada
                          </Button>

                          <Button size="sm" color="light" onClick={() => {
                            setSessaoSelecionada(sessao);
                            setModalExclusao(true);
                          }}>
                            <FaTrashAlt className="text-red-600"/>
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
      </div>

      <CadastrarSessaoTreino
        isOpen={modalCadastro}
        onClose={() => setModalCadastro(false)}
        onSaved={carregarSessoes}
        categoriaInicial={categoriaFiltro}
      />

      {sessaoSelecionada && (
        <DeletarSessaoTreino
          isOpen={modalExclusao}
          onClose={() => setModalExclusao(false)}
          sessao={sessaoSelecionada}
          aoDeletar={carregarSessoes}
        />
      )}

      {sessaoSelecionada && (
        <GerenciarChamada
          isOpen={modalChamada}
          onClose={() => {
            setModalChamada(false);
            setSessaoSelecionada(null);
          }}
          sessao={sessaoSelecionada}
        />
      )}
    </>
  );
}