import {useEffect, useState} from 'react';
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
import {FaEdit, FaPlus, FaSearch, FaTrashAlt, FaUserTie} from 'react-icons/fa';
import {FuncionarioService} from '../../services/FuncionarioService';
import type {Funcionario} from '../../models/Funcionario';
import {ToastAlerta} from '../../utils/ToastAlerta';
import {Toast} from '../../enums/Toast';
import CadastrarFuncionario from './CadastrarFuncionario';
import EditarFuncionario from './EditarFuncionario';
import DeletarFuncionario from './DeletarFuncionario';

export default function ListarFuncionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [busca, setBusca] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [modalCadastro, setModalCadastro] = useState(false);
  const [modalEdicao, setModalEdicao] = useState(false);
  const [modalExclusao, setModalExclusao] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<Funcionario | null>(null);

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  async function carregarFuncionarios() {
    try {
      setIsLoading(true);
      const dados = await FuncionarioService.listarTodos();
      setFuncionarios(dados);
    } catch (error) {
      ToastAlerta('Erro ao carregar comissão técnica', Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  const filtrados = funcionarios.filter(f => f.nomeCompleto.toLowerCase().includes(busca.toLowerCase()));

  if (isLoading) return <div className="flex justify-center pt-32"><Spinner size="xl"/></div>;

  return (
    <>
      <div className="pt-32 md:pl-80 md:pr-20 pb-10 px-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
            <FaUserTie className="text-blue-600"/> Comissão Técnica
          </h1>
          <Button color="alternative" onClick={() => setModalCadastro(true)}>
            <FaPlus className="mr-2"/> Adicionar Profissional
          </Button>
        </div>

        <div className="relative w-full max-w-md mb-6">
          <TextInput
            icon={FaSearch}
            placeholder="Buscar por nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <Table hoverable>
            <TableHead>
              <TableHeadCell>Profissional</TableHeadCell>
              <TableHeadCell>Cargo</TableHeadCell>
              <TableHeadCell>Registro (CREF/CRM)</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell className="text-center">Ações</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {filtrados.map((func) => (
                <TableRow key={func.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="font-medium text-gray-900 dark:text-white flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex justify-center items-center font-bold">
                      {func.nomeCompleto.charAt(0)}
                    </div>
                    <div>
                      <p>{func.nomeCompleto}</p>
                      <p className="text-xs text-gray-500">{func.cpf}</p>
                    </div>
                  </TableCell>
                  <TableCell>{func.cargo.replace(/_/g, ' ')}</TableCell>
                  <TableCell>{func.registroProfissional || '-'}</TableCell>
                  <TableCell>
                    <Badge color={func.ativo ? 'success' : 'failure'} className="w-fit">
                      {func.ativo ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button size="sm" color="light" onClick={() => {
                        setFuncionarioSelecionado(func);
                        setModalEdicao(true);
                      }}>
                        <FaEdit className="text-blue-600"/>
                      </Button>
                      <Button size="sm" color="light" onClick={() => {
                        setFuncionarioSelecionado(func);
                        setModalExclusao(true);
                      }}>
                        <FaTrashAlt className="text-red-600"/>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <CadastrarFuncionario
        isOpen={modalCadastro}
        onClose={() => setModalCadastro(false)}
        onSaved={carregarFuncionarios}
      />

      {funcionarioSelecionado && (
        <EditarFuncionario
          isOpen={modalEdicao}
          onClose={() => setModalEdicao(false)}
          onSaved={carregarFuncionarios}
          funcionario={funcionarioSelecionado}
        />
      )}

      {funcionarioSelecionado && (

        <DeletarFuncionario
          isOpen={modalExclusao}
          onClose={() => setModalExclusao(false)}
          aoDeletar={carregarFuncionarios}
          funcionario={funcionarioSelecionado}
        />
      )}

    </>
  );
}