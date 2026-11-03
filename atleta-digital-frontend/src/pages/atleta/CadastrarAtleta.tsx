import React, {type ChangeEvent, type SyntheticEvent, useEffect, useState} from 'react';
import {Button, Card, Modal, ModalBody, ModalHeader, Spinner, TabItem, Tabs} from 'flowbite-react';
import {FaFutbol, FaMapMarkerAlt, FaUser} from 'react-icons/fa';
import TextInputField from '../../components/form/TextInputField.tsx';
import SelectField from '../../components/form/SelectField';
import {AtletaService} from '../../services/AtletaService';
import {Categoria} from '../../enums/Categoria';
import {Posicao} from '../../enums/Posicao';
import {PeDominante} from '../../enums/PeDominante';
import {ToastAlerta} from '../../utils/ToastAlerta';
import {Toast} from '../../enums/Toast';
import type {Atleta} from "../../models/Atleta.ts";

interface CadastrarAtletaProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function CadastrarAtleta({
                                         isOpen,
                                         onClose,
                                         onSaved,
                                       }: CadastrarAtletaProps) {

  const [isLoading, setIsLoading] = useState(false);
  const [atletaCadastro, setAtletaCadastro] = useState<Atleta>({
    id: 0,
    nomeCompleto: "",
    nomeEsportivo: "",
    dataNascimento: "",
    idade: 0,
    cpf: "",
    rg: "",
    telefone: "",
    email: "",
    endereco: "",
    bairro: "",
    cep: "",
    categoria: "" as Categoria,
    posicao: "" as Posicao,
    peDominante: "" as PeDominante,
    numeroCamisa: 0,
    dataIngresso: "",
    codigoMatricula: "",
    equipeId: undefined,
    ativo: false,
  })

  useEffect(() => {
    if (isOpen) {
      setAtletaCadastro({
        id: 0,
        nomeCompleto: "",
        nomeEsportivo: "",
        dataNascimento: "",
        idade: 0,
        cpf: "",
        rg: "",
        telefone: "",
        email: "",
        endereco: "",
        bairro: "",
        cep: "",
        categoria: "" as Categoria,
        posicao: "" as Posicao,
        peDominante: "" as PeDominante,
        numeroCamisa: 0,
        dataIngresso: "",
        codigoMatricula: "",
        equipeId: undefined,
        ativo: false,
      });
    }
  }, [isOpen]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const {name, value} = e.target;
    setAtletaCadastro({
      ...atletaCadastro,
      [name]: value
    });
  }

  async function cadastrarNovoAtleta(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);
      await AtletaService.cadastrar(atletaCadastro);
      ToastAlerta("Atleta cadastrado com sucesso", Toast.Success);
      onSaved();
      onClose();
    } catch (error: any) {
      const mensagem = error.response?.data?.message || "Erro ao cadastrar atleta."
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
          <Card>
            <form onSubmit={cadastrarNovoAtleta}>
              <Card className="mb-6 bg-gray-100 dark:bg-gray-800 text-center shadow-md">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Cadastro de Atleta
                </h2>
              </Card>

              <Tabs aria-label="Tabs formulário atleta">
                <TabItem active title="Dados Pessoais" icon={FaUser}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInputField
                      label="Nome Completo *"
                      name="nomeCompleto"
                      value={atletaCadastro.nomeCompleto || ''}
                      onChange={atualizarEstado}
                      required
                    />
                    <TextInputField
                      label="Nome Esportivo"
                      name="nomeEsportivo"
                      value={atletaCadastro.nomeEsportivo || ''}
                      onChange={atualizarEstado}
                    />
                    <TextInputField
                      label="Data de Nascimento *"
                      name="dataNascimento"
                      type="date"
                      value={atletaCadastro.dataNascimento || ''}
                      onChange={atualizarEstado}
                      required
                    />
                    <TextInputField
                      label="CPF *"
                      name="cpf"
                      value={atletaCadastro.cpf || ''}
                      onChange={atualizarEstado}
                      required
                    />
                    <TextInputField
                      label="RG"
                      name="rg"
                      value={atletaCadastro.rg || ''}
                      onChange={atualizarEstado}
                    />
                    <TextInputField
                      label="Telefone"
                      name="telefone"
                      value={atletaCadastro.telefone || ''}
                      onChange={atualizarEstado}
                    />
                    <TextInputField
                      label="E-mail"
                      name="email"
                      type="email"
                      value={atletaCadastro.email || ''}
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
                        value={atletaCadastro.endereco || ''}
                        onChange={atualizarEstado}
                      />
                    </div>
                    <TextInputField
                      label="Bairro"
                      name="bairro"
                      value={atletaCadastro.bairro || ''}
                      onChange={atualizarEstado}
                    />
                    <TextInputField
                      label="CEP"
                      name="cep"
                      value={atletaCadastro.cep || ''}
                      onChange={atualizarEstado}
                    />
                  </div>
                </TabItem>
                <TabItem title="Esportivo" icon={FaFutbol}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                      label="Categoria *"
                      name="categoria"
                      value={atletaCadastro.categoria || ''}
                      options={categoriaOptions}
                      onChange={atualizarEstado}
                      required
                    />
                    <SelectField
                      label="Posição em Campo"
                      name="posicao"
                      value={atletaCadastro.posicao || ''}
                      options={posicaoOptions}
                      onChange={atualizarEstado}
                    />
                    <SelectField
                      label="Pé Dominante"
                      name="peDominante"
                      value={atletaCadastro.peDominante || ''}
                      options={peDominanteOptions}
                      onChange={atualizarEstado}
                    />
                    <TextInputField
                      label="Número da Camisa"
                      name="numeroCamisa"
                      type="number"
                      value={atletaCadastro.numeroCamisa || ''}
                      onChange={atualizarEstado}
                    />
                    <TextInputField
                      label="Data de Ingresso"
                      name="dataIngresso"
                      type="date"
                      value={atletaCadastro.dataIngresso || ''}
                      onChange={atualizarEstado}
                    />
                    <TextInputField
                      label="Código RFID (Carteirinha)"
                      name="codigoMatricula"
                      value={atletaCadastro.codigoMatricula || ''}
                      onChange={atualizarEstado}
                    />
                  </div>
                </TabItem>
              </Tabs>
              <div className="mt-6 flex justify-end gap-3">
                <Button type="submit" color="green" disabled={isLoading}>
                  {isLoading ? <Spinner size="sm" className="mr-2"/> : null}
                  Salvar Atleta
                </Button>
              </div>
            </form>
          </Card>
          <div className="pt-32 px-10 pb-10 max-w-5xl mx-auto">
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
