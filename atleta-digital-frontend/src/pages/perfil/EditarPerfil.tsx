import React, {type ChangeEvent, type SyntheticEvent, useEffect, useState} from "react";
import {Button, Card, Modal, ModalBody, ModalHeader, Spinner, TextInput} from "flowbite-react";
import {ToastAlerta} from "../../utils/ToastAlerta.ts";
import {useAuth} from "../../contexts/UseAuth.ts";
import type {Usuario} from "../../models/Usuario.ts";
import {Toast} from "../../enums/Toast.ts";
import {UsuarioService} from "../../services/UsuarioService.ts";
import TextInputField from "../../components/form/TextInputField.tsx";

interface EditarPerfilProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  usuarioSelecionado: Usuario;
}

export default function EditarPerfil({
                                           isOpen,
                                           onClose,
                                           onSaved,
                                           usuarioSelecionado
                                         }: EditarPerfilProps) {

  const {usuario} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [meuUsuario, setMeuUsuario] = useState<Partial<Usuario>>({});

  useEffect(() => {
    if (isOpen && usuarioSelecionado) {
      setMeuUsuario({
        nome: usuarioSelecionado.nome,
        email: usuarioSelecionado.email,
      });
    }
  }, [isOpen, usuarioSelecionado]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setMeuUsuario({
      ...meuUsuario,
      [e.target.name]: e.target.value
    });
  }

  async function editarPerfil(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!usuario?.id) {
      ToastAlerta("Sessão inválida", Toast.Error);
      return;
    }

    try {
      setIsLoading(true);
      await UsuarioService.atualizarAtributo(usuario.id, meuUsuario);
      ToastAlerta("Dados atualizados com sucesso!", Toast.Success);
      onSaved();
      onClose();
    } catch (error: any) {
      const mensagem = error.response?.data?.message || "Erro ao atualizar os dados";
      ToastAlerta(mensagem, Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal show={isOpen} onClose={onClose} size="md" popup>
      <ModalHeader/>
      <ModalBody>
        <form onSubmit={editarPerfil} className="flex flex-col gap-4">
          <Card className="mb-2 bg-gray-100 dark:bg-gray-800 text-center shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Editar Meus Dados
            </h2>
          </Card>

          <TextInputField
            name="nome"
            placeholder="Nome"
            value={meuUsuario.nome || ""}
            onChange={atualizarEstado}
            required
          />

          <TextInputField
            name="email"
            placeholder="E-mail"
            value={meuUsuario.email || ""}
            onChange={atualizarEstado}
            required
          />

          <div className="flex justify-end gap-2 pt-3">
            <Button
              className="cursor-pointer focus:outline-none focus:ring-0"
              color="light"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              className="cursor-pointer focus:outline-none focus:ring-0"
              color="green"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" className="mr-2" light /> : null}
              Salvar Alterações
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
