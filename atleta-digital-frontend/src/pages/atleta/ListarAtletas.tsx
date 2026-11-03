import React, {type SyntheticEvent, useEffect, useState} from 'react';
import {
  Badge,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput
} from 'flowbite-react';
import {FaEdit, FaEllipsisV, FaIdCard, FaPlus, FaSearch, FaTrashAlt} from 'react-icons/fa';
import {AtletaService} from '../../services/AtletaService';
import type {Atleta} from '../../models/Atleta';
import {ToastAlerta} from '../../utils/ToastAlerta';
import {Toast} from '../../enums/Toast';
import CadastrarAtleta from "./CadastrarAtleta.tsx";
import DeletarAtleta from "./DeletarAtleta.tsx";
import EditarAtleta from "./EditarAtleta.tsx";
import VincularCartao from "./VincularCartao.tsx";
import GerenciarProntuario from "../saude/GerenciarProntuario.tsx";
import GerenciarAtendimentosMedicos from "../saude/GerenciarAtendimentosMedicos.tsx";
import GerenciarExamesAptidao from "../saude/GerenciarExameAptidao.tsx";
import GerenciarResponsavel from "../social/GerenciarResponsavel.tsx";
import GerenciarPerfilSocial from "../social/GerenciarPerfilSicialFamiliar.tsx";
import GerenciarMatriculasEscolares from "../educacao/GerenciarMatriculas.tsx";
import GerenciarContrato from "../financeiro/GerenciarContrato.tsx";
import GerenciarMovimentacoes from "../financeiro/GerenciarMovimentacoes.tsx";
import GerenciarAvaliacoes from "../desempenho/GerenciarAvaliacoes.tsx";
import GerenciarTransicoes from "../desempenho/GerenciarTransicoes.tsx";

export default function ListarAtletas() {
  const [atletas, setAtletas] = useState<Atleta[]>([]);
  const [busca, setBusca] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const [modalCartao, setModalCartao] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);
  const [modalEdicao, setModalEdicao] = useState(false);
  const [modalExclusao, setModalExclusao] = useState(false);
  const [atletaSelecionado, setAtletaSelecionado] = useState<Atleta | null>(null);

  const [modalProntuario, setModalProntuario] = useState(false);
  const [modalAtendimentos, setModalAtendimentos] = useState(false);
  const [modalExames, setModalExames] = useState(false);
  const [modalResponsavel, setModalResponsavel] = useState(false);
  const [modalPerfilSocial, setModalPerfilSocial] = useState(false);
  const [modalMatriculas, setModalMatriculas] = useState(false);
  const [modalContrato, setModalContrato] = useState(false);
  const [modalMovimentacoes, setModalMovimentacoes] = useState(false);
  const [modalAvaliacoes, setModalAvaliacoes] = useState(false);
  const [modalTransicoes, setModalTransicoes] = useState(false);


  useEffect(() => {
    listarAtletas().then();
  }, []);

  async function listarAtletas() {
    try {
      setIsLoading(true);
      const dados = await AtletaService.listarTodos();
      setAtletas(dados);
    } catch (error: any) {
      const mensagem = error.response?.data?.message || "Erro ao atualizar os dados";
      ToastAlerta(mensagem, Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  async function buscarPorNome(e: SyntheticEvent) {
    e.preventDefault();
    if (!busca.trim()) return listarAtletas();
    try {
      setIsLoading(true);
      const resultados = await AtletaService.buscarPorNome(busca);
      setAtletas(resultados);
    } catch {
      ToastAlerta("Atleta não encontrado", Toast.Warning);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <div className="flex justify-center pt-32"><Spinner size="xl"/></div>;

  return (
    <>
      <div className="pt-32 md:pl-80 md:pr-20 pb-10 px-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Gestão de Atletas</h1>
          <Button
            color="alternative"
            className="cursor-pointer mt-4 md:mt-0 flex items-center justify-center gap-2 px-6 py-3 rounded-lg shadow hover:shadow-md transition duration-200 focus:outline-none focus:ring-0"
            onClick={() => setModalCadastro(true)}
          >
            <FaPlus className="text-lg"/> Adicionar Novo Atleta
          </Button>
        </div>

        <div className="relative w-full mb-6">
          <TextInput
            type="text"
            placeholder="Buscar por nome"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && buscarPorNome(e)}
            className="w-full"
          />

          <button
            onClick={buscarPorNome}
            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
          >
            <FaSearch size={18}/>
          </button>
        </div>

        <div
          className="hidden md:block overflow-x-auto min-h-[55vh] rounded-lg shadow-md border border-gray-200 dark:border-gray-700 pb-10">
          <Table hoverable>
            <TableHead>
              <TableHeadCell className="text-center font-semibold">Atleta</TableHeadCell>
              <TableHeadCell className="text-center font-semibold">Categoria</TableHeadCell>
              <TableHeadCell className="text-center font-semibold">Posição</TableHeadCell>
              <TableHeadCell className="text-center font-semibold">Status</TableHeadCell>
              <TableHeadCell className="text-center font-semibold">Ações</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {atletas.map((atleta) => (
                <TableRow key={atleta.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell
                    className="text-center justify-center font-medium text-gray-900 dark:text-white flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center font-bold">
                      {atleta.nomeCompleto.charAt(0)}
                    </div>
                    <div>
                      <p>{atleta.nomeCompleto}</p>
                      <p className="text-start text-xs text-gray-500">{atleta.cpf}</p>
                    </div>
                  </TableCell>
                  <TableCell
                    className="text-center text-gray-900 dark:text-gray-100">{atleta.categoria.replace('_', ' ')}</TableCell>
                  <TableCell
                    className="text-center text-gray-900 dark:text-gray-100">{atleta.posicao?.replace('_', ' ') || '-'}</TableCell>
                  <TableCell className="text-center text-gray-900 dark:text-gray-100">
                    <Badge color={atleta.ativo ? 'success' : 'failure'} className="mr-1 flex justify-center">
                      {atleta.ativo ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-center text-gray-900 dark:text-gray-100">
                    <div className="flex justify-center items-center gap-2 flex-wrap">

                      <Button
                        className="cursor-pointer text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-400 focus:outline-none focus:ring-0"
                        size="xs"
                        color="alternative"
                        onClick={() => {
                          setAtletaSelecionado(atleta);
                          setModalCartao(true);
                        }}
                      >
                        <FaIdCard size={18}/>
                      </Button>

                      <Button
                        className="cursor-pointer text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-400 focus:outline-none focus:ring-0"
                        color="alternative"
                        size="xs"
                        onClick={() => {
                          setAtletaSelecionado(atleta);
                          setModalEdicao(true);
                        }}
                      >
                        <FaEdit size={18}/>
                      </Button>

                      <Button
                        className="cursor-pointer text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 focus:outline-none focus:ring-0"
                        color="alternative"
                        size="xs"
                        onClick={() => {
                          setAtletaSelecionado(atleta);
                          setModalExclusao(true);
                        }}
                      >
                        <FaTrashAlt size={18}/>
                      </Button>

                      <Dropdown
                        placement="bottom-end"
                        arrowIcon={false}
                        inline
                        label={
                          <Button size="sm" color="light">
                            <FaEllipsisV className="text-gray-600"/> Fichas
                          </Button>
                        }
                      >
                        <DropdownHeader>
                          <span className="block text-sm">Fichas de {atleta.nomeEsportivo || atleta.nomeCompleto}</span>
                        </DropdownHeader>

                        <DropdownItem onClick={() => {
                          setAtletaSelecionado(atleta);
                          setModalProntuario(true);
                        }}>Prontuário Base</DropdownItem>
                        <DropdownItem onClick={() => {
                          setAtletaSelecionado(atleta);
                          setModalAtendimentos(true);
                        }}>Atendimentos Médicos</DropdownItem>
                        <DropdownItem onClick={() => {
                          setAtletaSelecionado(atleta);
                          setModalExames(true);
                        }}>Exames de Aptidão</DropdownItem>
                        <DropdownDivider/>

                        <DropdownItem onClick={() => {
                          setAtletaSelecionado(atleta);
                          setModalResponsavel(true);
                        }}>Responsável Legal</DropdownItem>
                        <DropdownItem onClick={() => {
                          setAtletaSelecionado(atleta);
                          setModalPerfilSocial(true);
                        }}>Perfil Social Familiar</DropdownItem>
                        <DropdownItem onClick={() => {
                          setAtletaSelecionado(atleta);
                          setModalMatriculas(true);
                        }}>Educação e Escola</DropdownItem>
                        <DropdownDivider/>

                        <DropdownItem onClick={() => {
                          setAtletaSelecionado(atleta);
                          setModalContrato(true);
                        }}>Contrato Financeiro</DropdownItem>
                        <DropdownItem onClick={() => {
                          setAtletaSelecionado(atleta);
                          setModalMovimentacoes(true);
                        }}>Extrato / Mensalidades</DropdownItem>
                        <DropdownDivider/>

                        <DropdownItem onClick={() => {
                          setAtletaSelecionado(atleta);
                          setModalAvaliacoes(true);
                        }}>Boletim de Desempenho</DropdownItem>
                        <DropdownItem onClick={() => {
                          setAtletaSelecionado(atleta);
                          setModalTransicoes(true);
                        }}>Transição de Categoria</DropdownItem>

                      </Dropdown>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>


        <CadastrarAtleta
          isOpen={modalCadastro}
          onClose={() => {
            setModalCadastro(false);
            setAtletaSelecionado(null);
          }}
          onSaved={listarAtletas}
        />

        {atletaSelecionado && (
          <EditarAtleta
            isOpen={modalEdicao}
            onClose={() => {
              setModalEdicao(false);
              setAtletaSelecionado(null);
            }}
            atletaSelecionado={atletaSelecionado}
            onSaved={listarAtletas}
          />
        )}

        {atletaSelecionado && (
          <DeletarAtleta
            isOpen={modalExclusao}
            onClose={() => {
              setModalExclusao(false);
              setAtletaSelecionado(null);
            }}
            atletaSelecionado={atletaSelecionado}
            aoDeletar={() => listarAtletas()}
          />
        )}

        {atletaSelecionado && (
          <VincularCartao
            isOpen={modalCartao}
            onClose={() => {
              setModalCartao(false);
              setAtletaSelecionado(null);
            }}
            atleta={atletaSelecionado}
            onSaved={listarAtletas}
          />
        )}

        {atletaSelecionado && (
          <>
            <GerenciarProntuario isOpen={modalProntuario} onClose={() => setModalProntuario(false)}
                                 atleta={atletaSelecionado}/>
            <GerenciarAtendimentosMedicos isOpen={modalAtendimentos} onClose={() => setModalAtendimentos(false)}
                                          atleta={atletaSelecionado}/>
            <GerenciarExamesAptidao isOpen={modalExames} onClose={() => setModalExames(false)}
                                    atleta={atletaSelecionado}/>

            <GerenciarResponsavel isOpen={modalResponsavel} onClose={() => setModalResponsavel(false)}
                                  atleta={atletaSelecionado}/>
            <GerenciarPerfilSocial isOpen={modalPerfilSocial} onClose={() => setModalPerfilSocial(false)}
                                   atleta={atletaSelecionado}/>
            <GerenciarMatriculasEscolares isOpen={modalMatriculas} onClose={() => setModalMatriculas(false)}
                                          atleta={atletaSelecionado}/>

            <GerenciarContrato isOpen={modalContrato} onClose={() => setModalContrato(false)}
                               atleta={atletaSelecionado}/>
            <GerenciarMovimentacoes isOpen={modalMovimentacoes} onClose={() => setModalMovimentacoes(false)}
                                    atleta={atletaSelecionado}/>

            <GerenciarAvaliacoes isOpen={modalAvaliacoes} onClose={() => setModalAvaliacoes(false)}
                                 atleta={atletaSelecionado}/>
            <GerenciarTransicoes isOpen={modalTransicoes} onClose={() => setModalTransicoes(false)}
                                 atleta={atletaSelecionado}/>
          </>
        )}
      </div>
    </>
  );
}
