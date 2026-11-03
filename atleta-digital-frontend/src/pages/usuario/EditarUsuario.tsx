import React, {type ChangeEvent, type SyntheticEvent, useEffect, useState} from "react";
import {Button, Card, Modal, ModalBody, ModalHeader, Spinner} from "flowbite-react";
import {ToastAlerta} from "../../utils/ToastAlerta.ts";
import type {Usuario} from "../../models/Usuario.ts"
import {Toast} from "../../enums/Toast.ts";
import ToggleSwitchField from "../../components/form/ToggleSwitchField.tsx";
import {UsuarioService} from "../../services/UsuarioService.ts";
import TextInputField from "../../components/form/TextInputField.tsx";
import SelectField from "../../components/form/SelectField.tsx";
import {Role} from "../../enums/Role.ts";

interface EditarUsuarioProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  usuarioSelecionado: Usuario;
}

export default function EditarUsuario({
                                        isOpen,
                                        onClose,
                                        onSaved,
                                        usuarioSelecionado
                                      }: EditarUsuarioProps) {

  const [isLoading, setIsLoading] = useState(false);
  const [usuarioAtualizado, setUsuarioAtualizado] = useState<Usuario>({} as Usuario);

  useEffect(() => {
    if (usuarioSelecionado && isOpen) {
      setUsuarioAtualizado({
        ...usuarioSelecionado,
        senha: ''
      });
    }
  }, [usuarioSelecionado, isOpen]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setUsuarioAtualizado({
      ...usuarioAtualizado,
      [e.target.name]: e.target.value
    });
  }

  function atualizarToggle(checked: boolean) {
    setUsuarioAtualizado({...usuarioAtualizado, ativo: checked});
  }

  async function editarUsuario(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const dadosFiltrados = Object.fromEntries(
        Object.entries(usuarioAtualizado).filter(([key, value]) => {
          if (value === "" || value === null || value === undefined) return false;
          if (key === "id" || key === "token") return false;
          return true;
        })
      );

      if (Array.isArray(usuarioAtualizado.roles) && usuarioAtualizado.roles.length > 0) {
        dadosFiltrados.roles = usuarioAtualizado.roles;
      }

      await UsuarioService.atualizarAtributo(usuarioSelecionado.id, dadosFiltrados);

      ToastAlerta("Usuário atualizado com sucesso", Toast.Success);
      onSaved();
      onClose();
    } catch (error: any) {
      const mensagem = error.response?.data?.message || "Erro ao atualizar o usuário.";
      ToastAlerta(mensagem, Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  const roleOptions = Object.values(Role).map((role) => ({
    value: role,
    label: role.replace("_", " "),
  }));

  if (!usuarioSelecionado) return null;

  return (
    <>
      <Modal dismissible show={isOpen} onClose={onClose} size="md" popup>
        <ModalHeader/>
        <ModalBody>
          <form className="flex flex-col gap-4" onSubmit={editarUsuario}>
            <Card className="mb-6 bg-gray-100 dark:bg-gray-800 text-center shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Editar Usuário
              </h2>
            </Card>

            <TextInputField
              name="nome"
              placeholder="Nome Completo"
              value={usuarioAtualizado.nome || ""}
              onChange={atualizarEstado}
              required
            />

            <TextInputField
              name="email"
              placeholder="E-mail"
              value={usuarioAtualizado.email || ""}
              onChange={atualizarEstado}
              required
            />

            <SelectField
              label="Selecione o Tipo de Usuario"
              name="roles"
              value={usuarioAtualizado.roles?.[0] || ""}
              onChange={atualizarEstado}
              options={roleOptions}
              required
            />

            <ToggleSwitchField
              label={usuarioAtualizado.ativo ? "Usuário Ativo" : "Usuário Inativo"}
              name="ativo"
              checked={usuarioAtualizado.ativo ?? true}
              onChange={atualizarToggle}
            />

            <Button color="green" type="submit" className='cursor-pointer mt-6 focus:outline-none focus:ring-0'>
              {isLoading ? <Spinner size="sm" light/> : <span>Salvar Alterações</span>}
            </Button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}