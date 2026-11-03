import React, {type SyntheticEvent, useEffect, useState} from 'react';
import {
  Badge,
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput
} from 'flowbite-react';
import {FaEdit, FaPlus, FaSearch, FaTrashAlt, FaUsers} from 'react-icons/fa';
import {AtletaService} from '../../services/AtletaService';
import type {Atleta} from '../../models/Atleta';
import {ToastAlerta} from '../../utils/ToastAlerta';
import {Toast} from '../../enums/Toast';
import CadastrarEquipe from "./CadastrarEquipe.tsx";
import DeletarEquipe from "./DeletarEquipe.tsx";
import EditarEquipe from "./EditarEquipe.tsx";
import type {Equipe} from "../../models/Equipe.ts";
import {EquipeService} from "../../services/EquipeService.ts";

export default function ListarEquipes() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [modalCadastro, setModalCadastro] = useState(false);
  const [modalEdicao, setModalEdicao] = useState(false);
  const [modalExclusao, setModalExclusao] = useState(false);
  const [equipeSelecionada, setEquipeSelecionada] = useState<Equipe | null>(null);

  useEffect(() => {
    listarEquipes().then();
  }, []);

  async function listarEquipes() {
    try {
      setIsLoading(true);
      const dados = await EquipeService.listarTodos();
      setEquipes(dados);
    } catch (error: any) {
      const mensagem = error.response?.data?.message || "Erro ao atualizar os dados";
      ToastAlerta(mensagem, Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <div className="flex justify-center pt-32"><Spinner size="xl"/></div>;

  return (
    <>
      <div className="pt-32 md:pl-80 md:pr-20 pb-10 px-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
            <FaUsers className="text-blue-600" /> Gestão de Equipes
          </h1>
          <Button
            color="alternative"
            className="cursor-pointer mt-4 md:mt-0 flex items-center justify-center gap-2 px-6 py-3 rounded-lg shadow hover:shadow-md transition duration-200"
            onClick={() => setModalCadastro(true)}
          >
            <FaPlus className="mr-2" /> Adicionar Nova Equipe
          </Button>
        </div>

        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Categoria</TableHeadCell>
              <TableHeadCell>Temporada</TableHeadCell>
              <TableHeadCell>Treinador</TableHeadCell>
              <TableHeadCell>Preparador Físico</TableHeadCell>
              <TableHeadCell>Atletas</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell className="text-center">Ações</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {equipes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    Nenhuma equipe cadastrada.
                  </TableCell>
                </TableRow>
              ) : (
                equipes.map((equipe) => (
                  <TableRow key={equipe.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="font-semibold text-gray-900 dark:text-white">
                      {equipe.categoria?.replace('_', ' ')}
                    </TableCell>
                    <TableCell>{equipe.temporada}</TableCell>
                    <TableCell>{equipe.treinadorNome || 'Não definido'}</TableCell>
                    <TableCell>{equipe.preparadorFisicoNome || 'Não definido'}</TableCell>
                    <TableCell>
                      <Badge color="info" className="inline-block">
                        {equipe.atletaIds ? `${equipe.atletaIds.length} Atleta(s)` : '0 Atletas'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge color={equipe.ativo ? 'success' : 'failure'}>
                        {equipe.ativo ? 'Ativa' : 'Inativa'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button
                          size="sm"
                          color="light"
                          onClick={() => {
                            setEquipeSelecionada(equipe);
                            setModalEdicao(true);
                          }}
                        >
                          <FaEdit className="text-blue-600" />
                        </Button>
                        <Button
                          size="sm"
                          color="light"
                          onClick={() => {
                            setEquipeSelecionada(equipe);
                            setModalExclusao(true);
                          }}
                        >
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
      </div>


      <CadastrarEquipe
        isOpen={modalCadastro}
        onClose={() => setModalCadastro(false)}
        onSaved={listarEquipes}
      />

      {equipeSelecionada && (
        <>
          <EditarEquipe
            isOpen={modalEdicao}
            onClose={() => {
              setModalEdicao(false);
              setEquipeSelecionada(null);
            }}
            onSaved={listarEquipes}
            equipeSelecionada={equipeSelecionada}
          />
          <DeletarEquipe
            isOpen={modalExclusao}
            onClose={() => {
              setModalExclusao(false);
              setEquipeSelecionada(null);
            }}
            aoDeletar={listarEquipes}
            equipeSelecionada={equipeSelecionada}
          />
        </>
      )}

    </>
  );
}
