import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Image,
  useDisclosure
} from '@heroui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createQR } from '../actions/qrActions';

function GenerateCodeQR({ value, name, id }) {
  const [qrImage, setQrImage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const intervalRef = useRef(null);

  const qrGenerate = useSelector((state) => state.qrGenerate);
  const { error, codigo, loading } = qrGenerate;

  const dispatch = useDispatch();

  const generateQR = useCallback(async () => {
    try {
      setIsGenerating(true);
      await dispatch(createQR(name, id));
    } catch (err) {
      console.error('Error al generar QR:', err);
    } finally {
      setIsGenerating(false);
    }
  }, [dispatch, name, id]);

  useEffect(() => {
    if (codigo?.qrImage) {
      setQrImage(codigo.qrImage);
    }
  }, [codigo]);

  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(generateQR, 60000);
  }, [generateQR]);

  const handleGenerarQR = async () => {
    await generateQR();
    onOpen(true);
    startInterval();
  };

  const handleModalClose = useCallback(
    (isOpen) => {
      if (!isOpen && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      onOpenChange(isOpen);
    },
    [onOpenChange]
  );

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <button
        type="button"
        disabled={isGenerating || loading}
        className={`bg-white text-xs border shadow-sm font-bold text-zinc-800 px-4 py-2 rounded-md w-full ${
          isGenerating || loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleGenerarQR}
      >
        {isGenerating || loading ? 'Generando...' : 'Generar QR'}
      </button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleModalClose}
        backdrop="opaque"
        size="md"
        classNames={{
          backdrop: 'bg-black bg-opacity-70',
          modal: 'bg-white rounded-lg shadow-lg w-96 p-6'
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-zinc-800">
                <h1 className="font-bold text-base">
                  Código QR de la clase de {value}
                </h1>
              </ModalHeader>
              <ModalBody className="flex justify-center items-center p-8">
                {loading ? (
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                ) : qrImage ? (
                  <Image
                    radius="none"
                    isBlurred
                    loading="lazy"
                    alt={`QR de la clase de ${value}`}
                    fallbackSrc="https://via.placeholder.com/300x200"
                    className="h-full object-cover w-full"
                    src={qrImage}
                  />
                ) : (
                  <div className="text-gray-500">
                    No hay código QR disponible
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="flex flex-col justify-center items-center">
                <span className="font-bold text-xs text-zinc-600">
                  Escanea este código QR para unirte a la clase
                </span>
              </ModalFooter>
              {error && (
                <div className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded">
                  <p className="font-bold">Error:</p>
                  <p>{error}</p>
                </div>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default GenerateCodeQR;
