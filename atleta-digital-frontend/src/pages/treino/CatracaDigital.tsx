import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { Card, Spinner } from 'flowbite-react';
import { AcessoHardwareService } from '../../services/AcessoHardwareService';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import { FaFutbol, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import type { AcessoAtletaResponse } from '../../models/Rfid';

export default function CatracaDigital() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [leitura, setLeitura] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [ultimaAcao, setUltimaAcao] = useState<AcessoAtletaResponse | null>(null);

  useEffect(() => {
    const focarLeitor = () => inputRef.current?.focus();
    window.addEventListener('click', focarLeitor);
    focarLeitor();
    return () => window.removeEventListener('click', focarLeitor);
  }, []);

  const processarLeitura = async (codigoLido: string) => {
    if (!codigoLido.trim()) return;
    setIsProcessing(true);

    try {
      // Compatibilidade para extrair ID de QR Code JSON ou UID direto de RFID
      let uidFinal = codigoLido;
      try {
        const dadosQr = JSON.parse(codigoLido);
        uidFinal = dadosQr.alunoId?.toString() || dadosQr.atletaId?.toString() || codigoLido;
      } catch {
        uidFinal = codigoLido;
      }

      const resposta = await AcessoHardwareService.processarLeitura({ uid: uidFinal, deviceId: 'PORTARIA_1' });
      setUltimaAcao(resposta);

      if (resposta.liberado) {
        ToastAlerta('Acesso Liberado!', Toast.Success);
      } else {
        ToastAlerta(resposta.mensagem, Toast.Warning);
      }
    } catch (error: any) {
      const msgErro = error.response?.data?.mensagem || 'Erro de leitura. Tente novamente.';
      setUltimaAcao({ liberado: false, mensagem: msgErro });
      ToastAlerta(msgErro, Toast.Error);
    } finally {
      setLeitura('');
      setIsProcessing(false);
      setTimeout(() => setUltimaAcao(null), 5000);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      processarLeitura(leitura);
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 flex flex-col items-center justify-center p-4">
      <input
        ref={inputRef}
        type="text"
        className="opacity-0 absolute top-0 left-0"
        value={leitura}
        onChange={(e) => setLeitura(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isProcessing}
        autoFocus
        autoComplete="off"
      />

      <Card className="max-w-2xl w-full p-10 text-center shadow-2xl rounded-2xl border-0">
        <FaFutbol className="mx-auto text-blue-600 text-6xl mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Controle de Acesso</h1>
        <p className="text-lg text-gray-500 mb-8">Aproxime sua carteirinha do leitor.</p>

        <div className="h-48 flex items-center justify-center">
          {isProcessing ? (
            <div className="flex flex-col items-center">
              <Spinner size="xl" className="mb-4" />
              <p className="text-gray-600 font-medium">Validando...</p>
            </div>
          ) : ultimaAcao ? (
            <div className={`p-6 rounded-lg flex flex-col items-center w-full ${ultimaAcao.liberado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {ultimaAcao.liberado ? <FaCheckCircle className="text-5xl mb-3" /> : <FaExclamationTriangle className="text-5xl mb-3" />}
              {ultimaAcao.nomeAtleta && <p className="text-xl font-bold mb-2">{ultimaAcao.nomeAtleta}</p>}
              <p className="text-lg">{ultimaAcao.mensagem}</p>
            </div>
          ) : (
            <div className="w-full border-4 border-dashed border-gray-300 rounded-xl h-full flex items-center justify-center bg-gray-50">
              <p className="text-gray-400 font-semibold text-xl tracking-wider uppercase">Aguardando Leitura</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}