import { api } from './Api.ts';

export const FileService = {
  buscarQrCode: async (url: string, setImagem: (url: string) => void) => {
    // O header com token já é injetado automaticamente pelo api.ts
    const resposta = await api.get(url, { responseType: 'blob' });
    const blobUrl = URL.createObjectURL(resposta.data);
    setImagem(blobUrl);
  },

  baixarArquivo: async (url: string, fileName: string) => {
    const resposta = await api.get(url, { responseType: 'blob' });
    const blob = new Blob([resposta.data]);
    const downloadUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(downloadUrl);
  }
};