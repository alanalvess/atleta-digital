import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { Button, Card, Modal, ModalBody, ModalHeader, Spinner } from 'flowbite-react';
import { AcessoHardwareService } from '../../services/AcessoHardwareService';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { Toast } from '../../enums/Toast';
import type { Atleta } from '../../models/Atleta';
import { FaIdCard } from 'react-icons/fa';

interface VincularCartaoProps {
  isOpen: boolean;
  onClose: () => void;
  atleta: Atleta;
  onSaved: () => void;
}

export default function VincularCartao({ isOpen, onClose, atleta, onSaved }: VincularCartaoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [uidLido, setUidLido] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setUidLido('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const processarVinculo = async (uid: string) => {
    if (!uid.trim()) return;
    setIsLoading(true);
    try {
      await AcessoHardwareService.vincularCartao({ uid, atletaId: atleta.id });
      ToastAlerta('Cartão vinculado com sucesso!', Toast.Success);
      onSaved();
      onClose();
    } catch (error: any) {
      ToastAlerta(error.response?.data?.message || 'Erro ao vincular cartão', Toast.Error);
      setUidLido('');
      inputRef.current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      processarVinculo(uidLido);
    }
  };

  return (
    <Modal dismissible show={isOpen} onClose={onClose} popup size="md">
      <ModalHeader />
      <ModalBody>
        <Card className="text-center shadow-none border-0">
          <FaIdCard className="mx-auto text-blue-600 text-5xl mb-4" />
          <h3 className="mb-2 text-lg font-semibold text-gray-800">
            Vincular Carteirinha
          </h3>
          <p className="mb-4 text-sm text-gray-500">
            Atleta: <strong>{atleta.nomeCompleto}</strong>
          </p>
          <p className="mb-6 text-sm text-gray-500">
            Passe o novo cartão RFID no leitor USB conectado a este computador.
          </p>

          <input
            ref={inputRef}
            type="text"
            className="w-full text-center border-2 border-blue-500 rounded-lg py-2 focus:ring-2 focus:ring-blue-600 mb-4"
            placeholder="Aguardando leitura..."
            value={uidLido}
            onChange={(e) => setUidLido(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            autoComplete="off"
          />

          <div className="flex justify-center gap-3">
            <Button color="gray" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button color="blue" onClick={() => processarVinculo(uidLido)} disabled={isLoading || !uidLido}>
              {isLoading ? <Spinner size="sm" className="mr-2" /> : null}
              Salvar Manualmente
            </Button>
          </div>
        </Card>
      </ModalBody>
    </Modal>
  );
}