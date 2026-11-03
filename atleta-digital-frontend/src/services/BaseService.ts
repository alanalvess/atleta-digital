import {api} from './Api.ts';

export const cadastrar = async <TRequest, TResponse>(url: string, dados: TRequest, setDados: (dados: TResponse) => void) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const buscar = async <TResponse>(url: string, setDados: (dados: TResponse) => void) => {
  const resposta = await api.get(url);
  setDados(resposta.data);
};

export const atualizarAtributo = async <TRequest, TResponse>(url: string, dados: TRequest, setDados: (dados: TResponse) => void) => {
  const resposta = await api.patch(url, dados);
  setDados(resposta.data);
};

export const deletar = async (url: string) => {
  await api.delete(url);
};

