import { useState, useEffect, useRef } from 'react';
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const intervalRef = useRef(null);

  const qrGenerate = useSelector((state) => state.qrGenerate);
  const { error, codigo } = qrGenerate;

  const dispatch = useDispatch();

  // Actualizar la imagen QR cada vez que `codigo` cambie
  useEffect(() => {
    if (codigo?.qrImage) {
      setQrImage(codigo.qrImage);
    }
  }, [codigo]);

  // Iniciar la actualización automática del QR cada 30 segundos
  const startInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Evitar múltiples intervalos
    }
    intervalRef.current = setInterval(() => {
      dispatch(createQR(name, id));
    }, 30000); // Intervalo de 30 segundos
  };

  const handleGenerarQR = () => {
    dispatch(createQR(name, id)); // Primera generación de QR
    onOpen(true); // Abrir el modal
    console.log('open');
    startInterval(); // Iniciar intervalo de actualizaciones
  };

  // Detener el intervalo cuando el modal se cierra
  const handleModalClose = (isOpen) => {
    if (!isOpen && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // Limpieza del intervalo
    }
    onOpenChange(isOpen);
  };

  // Asegurar que el intervalo se detenga al desmontar el componente
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        console.log('close');
      }
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="bg-white text-xs border shadow-sm font-bold text-zinc-800 px-4 py-2 rounded-md w-full"
        onClick={handleGenerarQR}
      >
        Generar QR
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
                {qrImage && (
                  <Image
                    radius="none"
                    loading="lazy"
                    alt={`QR de la clase de ${value}`}
                    fallbackSrc="https://via.placeholder.com/300x200"
                    className="h-full object-cover w-full"
                    src={qrImage}
                  />
                )}
              </ModalBody>
              <ModalFooter className="flex flex-col justify-center items-center">
                <span className="font-bold text-xs text-zinc-600">
                  Escanea este código QR para unirte a la clase
                </span>
              </ModalFooter>
              {error && (
                <p className="text-red-600 text-sm mt-2">
                  Error al generar el QR: {error}
                </p>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default GenerateCodeQR;
