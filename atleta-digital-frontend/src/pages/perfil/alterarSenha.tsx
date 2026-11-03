import React, {type ChangeEvent, type SyntheticEvent, useEffect, useState} from "react";
import {Button, Card, Modal, ModalBody, ModalHeader, Spinner} from "flowbite-react";

import {useAuth} from "../../contexts/UseAuth.ts";
import {ToastAlerta} from "../../utils/ToastAlerta.ts";
import {Toast} from "../../enums/Toast.ts";
import {UsuarioService} from "../../services/UsuarioService.ts";
import TextInputField from "../../components/form/TextInputField.tsx";

interface AlterarSenhaProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AlterarSenha({
                                       isOpen,
                                       onClose
                                     }: AlterarSenhaProps) {

  const {usuario} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  useEffect(() => {
    if (isOpen) {
      setForm({
        senhaAtual: "",
        novaSenha: "",
        confirmarSenha: ""
      });
    }
  }, [isOpen]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!usuario?.id) return;

    if (form.novaSenha.length < 8) {
      ToastAlerta("A nova senha deve ter no mínimo 8 caracteres.", Toast.Warning);
      return;
    }

    if (form.novaSenha !== form.confirmarSenha) {
      ToastAlerta("As senhas não coincidem!", Toast.Error);
      return;
    }

    try {
      setIsLoading(true);
      await UsuarioService.alterarSenha(usuario.id, {
        senhaAtual: form.senhaAtual,
        novaSenha: form.novaSenha
      });
      ToastAlerta("Senha alterada com sucesso!", Toast.Success);
      onClose();
    } catch (error: any) {
      const mensagem = error.response?.data?.message || "Erro ao alterar senha";
      ToastAlerta(mensagem, Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal show={isOpen} onClose={onClose} size="md" popup>
      <ModalHeader/>
      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Card className="mb-6 bg-gray-100 dark:bg-gray-800 text-center shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Alterar Senha
            </h2>
          </Card>

          <TextInputField
            name="senhaAtual"
            type="password"
            placeholder="Digite a senha atual"
            value={form.senhaAtual}
            onChange={atualizarEstado}
            required
          />

          <TextInputField
            name="novaSenha"
            type="password"
            placeholder="Digite a nova senha"
            value={form.novaSenha}
            onChange={atualizarEstado}
            required
          />

          <TextInputField
            name="confirmarSenha"
            type="password"
            placeholder="Repita a nova senha"
            value={form.confirmarSenha}
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
              {isLoading ? <Spinner size="sm" className="mr-2" light/> : null}
              Atualizar
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
