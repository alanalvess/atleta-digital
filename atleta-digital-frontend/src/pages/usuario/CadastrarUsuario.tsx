import React, {type ChangeEvent, type SyntheticEvent, useEffect, useState} from "react";
import {Button, Card, Modal, ModalBody, ModalHeader, Spinner} from "flowbite-react";

import type {Usuario} from "../../models/Usuario.ts";
import {ToastAlerta} from "../../utils/ToastAlerta.ts";
import {Role} from "../../enums/Role.ts";
import {Toast} from "../../enums/Toast.ts";
import TextInputField from "../../components/form/TextInputField.tsx";
import SelectField from "../../components/form/SelectField.tsx";
import {UsuarioService} from "../../services/UsuarioService.ts";

interface CadastrarUsuarioProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function CadastrarUsuario({
                                          isOpen,
                                          onClose,
                                          onSaved,
                                        }: CadastrarUsuarioProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");
  const [usuarioCadastro, setUsuarioCadastro] = useState<Usuario>({
    id: 0,
    nome: "",
    email: "",
    senha: "",
    roles: [] as Role[],
    ativo: false
  })

  useEffect(() => {
    if (isOpen) {
      setUsuarioCadastro({
        id: 0,
        nome: "",
        email: "",
        senha: "",
        roles: [] as Role[],
        ativo: false
      });
      setConfirmarSenha("");
    }
  }, [isOpen]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    if (name === "confirmarSenha") {
      setConfirmarSenha(value);
    } else if (name === "roles") {
      setUsuarioCadastro({
        ...usuarioCadastro,
        roles: [value as Role]
      });
    } else {
      setUsuarioCadastro({
        ...usuarioCadastro,
        [name]: value
      });
    }
  }

  async function cadastrarNovoUsuario(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (usuarioCadastro.senha && usuarioCadastro.senha.length < 8) {
      ToastAlerta("A senha deve ter no mínimo 8 caracteres.", Toast.Warning);
      return;
    }

    if (confirmarSenha !== usuarioCadastro.senha) {
      ToastAlerta("As senhas não coincidem.", Toast.Warning);
      setUsuarioCadastro({...usuarioCadastro, senha: ""});
      setConfirmarSenha("");
      return;
    }

    try {
      setIsLoading(true);
      await UsuarioService.cadastrar(usuarioCadastro);
      ToastAlerta("Usuário cadastrado com sucesso", Toast.Success);
      onSaved();
      onClose();
    } catch (error: any) {
      const mensagem = error.response?.data?.message || "Erro ao cadastrar usuário."
      ToastAlerta(mensagem, Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  const roleOptions = Object.values(Role).map((role) => ({
    value: role,
    label: role.replace("_", " "),
  }));

  return (
    <>
      <Modal dismissible show={isOpen} onClose={onClose} size="md" popup>
        <ModalHeader/>
        <ModalBody>
          <form className="flex flex-col gap-4" onSubmit={cadastrarNovoUsuario}>
            <Card className="mb-6 bg-gray-100 dark:bg-gray-800 text-center shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Cadastro de Usuário
              </h2>
            </Card>

            <TextInputField
              name="nome"
              type="text"
              placeholder="Nome Completo"
              value={usuarioCadastro.nome}
              onChange={atualizarEstado}
              required
            />

            <TextInputField
              name="email"
              type="email"
              placeholder="email@email.com"
              value={usuarioCadastro.email}
              onChange={atualizarEstado}
              required
            />

            <TextInputField
              name="senha"
              type="password"
              placeholder="senha"
              value={usuarioCadastro.senha}
              onChange={atualizarEstado}
              required
            />

            <TextInputField
              name="confirmarSenha"
              placeholder="confirmarSenha"
              type="password"
              value={confirmarSenha}
              onChange={atualizarEstado}
              required
            />

            <SelectField
              label="Selecione o Tipo de Usuario"
              name="roles"
              value={usuarioCadastro.roles?.[0] || ""}
              onChange={atualizarEstado}
              options={roleOptions}
              required
            />

            <Button
              color="green"
              type="submit"
              className='cursor-pointer mt-6 focus:outline-none focus:ring-0'
            >
              {isLoading ? <Spinner size="md" light/> : <span>Cadastrar</span>}
            </Button>
          </form>
        </ModalBody>
      </Modal>
    </>
  )
}