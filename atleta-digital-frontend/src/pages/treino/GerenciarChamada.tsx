import { useEffect, useState } from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Badge } from 'flowbite-react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { PresencaTreinoService } from '../../services/PresencaTreinoService';
import { AtletaService } from '../../services/AtletaService';
import type { SessaoTreino } from '../../models/SessaoTreino';
import type { Atleta } from '../../models/Atleta';
import type { PresencaTreino } from '../../models/PresencaTreino';
import { StatusPresenca } from '../../enums/StatusPresenca';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';

interface GerenciarChamadaProps {
  isOpen: boolean;
  onClose: () => void;
  sessao: SessaoTreino;
}

export default function GerenciarChamada({ isOpen, onClose, sessao }: GerenciarChamadaProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [atletas, setAtletas] = useState<Atleta[]>([]);
  const [presencas, setPresencas] = useState<PresencaTreino[]>([]);

  useEffect(() => {
    if (isOpen && sessao) carregarDados();
  }, [isOpen, sessao]);

  async function carregarDados() {
    try {
      setIsLoading(true);
      const [todosAtletas, listaPresencas] = await Promise.all([
        AtletaService.listarTodos(),
        PresencaTreinoService.listarPorSessao(sessao.id)
      ]);
      setAtletas(todosAtletas.filter(a => a.categoria === sessao.categoria && a.ativo));
      setPresencas(listaPresencas);
    } catch {
      ToastAlerta('Erro ao carregar lista de presença', Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  async function registrarPresenca(atletaId: number, status: StatusPresenca) {
    try {
      await PresencaTreinoService.registrar({
        id: 0,
        atletaId,
        sessaoTreinoId: sessao.id,
        status,
        metodoChamada: 'MANUAL'
      });
      ToastAlerta('Registro salvo', Toast.Success);
      carregarDados();
    } catch (error: any) {
      ToastAlerta(error.response?.data?.message || 'Erro ao registrar', Toast.Error);
    }
  }

  function getStatusBadge(atletaId: number) {
    const registro = presencas.find(p => p.atletaId === atletaId);
    if (!registro) return <Badge color="gray">Pendente</Badge>;
    if (registro.status === StatusPresenca.PRESENTE) return <Badge color="success">Presente</Badge>;
    return <Badge color="failure">Falta</Badge>;
  }

  return (
    <Modal dismissible show={isOpen} onClose={onClose} size="4xl" popup>
      <ModalHeader />
      <ModalBody>
        <Card className="mb-4 bg-gray-100 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Chamada: {sessao.focoTreino}</h2>
              <p className="text-sm text-gray-600">Categoria: {sessao.categoria?.replace('_', ' ')} | Data: {new Date(sessao.dataTreino).toLocaleDateString()}</p>
            </div>
            <Link to={`/catraca-digital/${sessao.id}`} target="_blank">
              <Button color="dark">Modo Totem / Leitor QR</Button>
            </Link>
          </div>
        </Card>

        {isLoading ? (
          <div className="flex justify-center p-6"><Spinner size="xl" /></div>
        ) : (
          <div className="overflow-x-auto max-h-96">
            <Table hoverable>
              <TableHead>
                <TableHeadCell>Atleta</TableHeadCell>
                <TableHeadCell>Status Atual</TableHeadCell>
                <TableHeadCell className="text-center">Lançar Chamada</TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                {atletas.map(atleta => {
                  // Busca o registro atual do atleta para saber o status
                  const registroAtual = presencas.find(p => p.atletaId === atleta.id);

                  return (
                    <TableRow key={atleta.id} className="bg-white">
                      <TableCell className="font-medium text-gray-900">{atleta.nomeCompleto}</TableCell>
                      <TableCell>{getStatusBadge(atleta.id)}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            color="success"
                            // Desabilita apenas se já estiver marcado como PRESENTE
                            disabled={registroAtual?.status === StatusPresenca.PRESENTE}
                            onClick={() => registrarPresenca(atleta.id, StatusPresenca.PRESENTE)}
                          >
                            <FaCheck className="mr-1" /> Presente
                          </Button>
                          <Button
                            size="sm"
                            color="failure"
                            // Desabilita apenas se já estiver marcado como FALTA
                            disabled={registroAtual?.status === StatusPresenca.FALTA_NAO_JUSTIFICADA}
                            onClick={() => registrarPresenca(atleta.id, StatusPresenca.FALTA_NAO_JUSTIFICADA)}
                          >
                            <FaTimes className="mr-1" /> Falta
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
}