import React, {type ChangeEvent, useEffect, useState} from "react";
import {Button, Card, Modal, ModalBody, ModalHeader, Spinner, TabItem, Tabs} from "flowbite-react";
import {ToastAlerta} from "../../utils/ToastAlerta.ts";
import {Toast} from "../../enums/Toast.ts";
import type {Atleta} from "../../models/Atleta.ts";
import {AtletaService} from "../../services/AtletaService.ts";
import TextInputField from "../../components/form/TextInputField.tsx";
import {FaFutbol, FaMapMarkerAlt, FaUser} from "react-icons/fa";
import SelectField from "../../components/form/SelectField.tsx";
import {Categoria} from "../../enums/Categoria.ts";
import {Posicao} from "../../enums/Posicao.ts";
import {PeDominante} from "../../enums/PeDominante.ts";

interface EditarAtletaProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  atletaSelecionado: Atleta;
}

export default function EditarAtleta({
                                       isOpen,
                                       onClose,
                                       onSaved,
                                       atletaSelecionado
                                     }: EditarAtletaProps) {

  const [isLoading, setIsLoading] = useState(false);
  const [atletaAtualizado, setAtletaAtualizado] = useState<Atleta>({} as Atleta);

  useEffect(() => {
    if (atletaSelecionado && isOpen) {
      setAtletaAtualizado({
        ...atletaSelecionado
      });
    }
  }, [atletaSelecionado, isOpen]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setAtletaAtualizado({
      ...atletaAtualizado,
      [e.target.name]: e.target.value,
    });
  }

  function atualizarToggle(checked: boolean) {
    setAtletaAtualizado({...atletaAtualizado, ativo: checked});
  }

  async function editarAtleta(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const dadosFiltrados = Object.fromEntries(
        Object.entries(atletaAtualizado).filter(([key, value]) => {
          if (value === "" || value === null || value === undefined) return false;
          if (key === "id" || key === "token") return false;
          return true;
        })
      );

      await AtletaService.atualizarAtributo(atletaSelecionado.id, dadosFiltrados);

      ToastAlerta("Atleta atualizado com sucesso", Toast.Success);
      onSaved();
      onClose();
    } catch (error: any) {
      const mensagem = error.response?.data?.message || "Erro ao atualizar o atleta.";
      ToastAlerta(mensagem, Toast.Error);
    } finally {
      setIsLoading(false);
    }
  }

  const categoriaOptions = Object.values(Categoria).map(cat => ({value: cat, label: cat.replace('_', ' ')}));
  const posicaoOptions = Object.values(Posicao).map(pos => ({value: pos, label: pos.replace('_', ' ')}));
  const peDominanteOptions = Object.values(PeDominante).map(pe => ({value: pe, label: pe}));

  return (
    <>
      <Modal dismissible show={isOpen} onClose={onClose} popup>
        <ModalHeader/>
        <ModalBody>
          <form onSubmit={editarAtleta}>
            <Card className="mb-6 bg-gray-100 dark:bg-gray-800 text-center shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Editar Atleta
              </h2>
            </Card>

            <Tabs aria-label="Tabs formulário atleta">
              <TabItem active title="Dados Pessoais" icon={FaUser}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInputField
                    label="Nome Esportivo"
                    name="nomeEsportivo"
                    value={atletaAtualizado.nomeEsportivo || ''}
                    onChange={atualizarEstado}
                  />
                  <TextInputField
                    label="Data de Nascimento *"
                    name="dataNascimento"
                    type="date"
                    value={atletaAtualizado.dataNascimento || ''}
                    onChange={atualizarEstado}
                    required
                  />
                  <TextInputField
                    label="CPF *"
                    name="cpf"
                    value={atletaAtualizado.cpf || ''}
                    onChange={atualizarEstado}
                    required
                  />
                  <TextInputField
                    label="RG"
                    name="rg"
                    value={atletaAtualizado.rg || ''}
                    onChange={atualizarEstado}
                  />
                  <TextInputField
                    label="Telefone"
                    name="telefone"
                    value={atletaAtualizado.telefone || ''}
                    onChange={atualizarEstado}
                  />
                  <TextInputField
                    label="E-mail"
                    name="email"
                    type="email"
                    value={atletaAtualizado.email || ''}
                    onChange={atualizarEstado}
                  />
                </div>
              </TabItem>

              <TabItem title="Endereço" icon={FaMapMarkerAlt}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <TextInputField
                      label="Endereço Completo"
                      name="endereco"
                      value={atletaAtualizado.endereco || ''}
                      onChange={atualizarEstado}
                    />
                  </div>
                  <TextInputField
                    label="Bairro"
                    name="bairro"
                    value={atletaAtualizado.bairro || ''}
                    onChange={atualizarEstado}
                  />
                  <TextInputField
                    label="CEP"
                    name="cep"
                    value={atletaAtualizado.cep || ''}
                    onChange={atualizarEstado}
                  />
                </div>
              </TabItem>
              <TabItem title="Esportivo" icon={FaFutbol}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectField
                    label="Categoria *"
                    name="categoria"
                    value={atletaAtualizado.categoria || ''}
                    options={categoriaOptions}
                    onChange={atualizarEstado}
                    required
                  />
                  <SelectField
                    label="Posição em Campo"
                    name="posicao"
                    value={atletaAtualizado.posicao || ''}
                    options={posicaoOptions}
                    onChange={atualizarEstado}
                  />
                  <SelectField
                    label="Pé Dominante"
                    name="peDominante"
                    value={atletaAtualizado.peDominante || ''}
                    options={peDominanteOptions}
                    onChange={atualizarEstado}
                  />
                  <TextInputField
                    label="Número da Camisa"
                    name="numeroCamisa"
                    type="number"
                    value={atletaAtualizado.numeroCamisa || ''}
                    onChange={atualizarEstado}
                  />
                  <TextInputField
                    label="Data de Ingresso"
                    name="dataIngresso"
                    type="date"
                    value={atletaAtualizado.dataIngresso || ''}
                    onChange={atualizarEstado}
                  />
                  <TextInputField
                    label="Código RFID (Carteirinha)"
                    name="codigoMatricula"
                    value={atletaAtualizado.codigoMatricula || ''}
                    onChange={atualizarEstado}
                  />
                </div>
              </TabItem>
            </Tabs>

            <Button type="submit" color="green" disabled={isLoading}>
              {isLoading ? <Spinner size="sm" className="mr-2"/> : null}
              Salvar Atleta
            </Button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}