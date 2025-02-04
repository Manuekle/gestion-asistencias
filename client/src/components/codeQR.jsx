/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Image,
  useDisclosure
} from '@heroui/react';

// import { Button } from './ui/button.tsx';

function codeQR({ value, name, id }) {
  const [qrImage, setQrImage] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleGenerarQR = async () => {
    try {
      const response = await axios.post('http://localhost:4000/generate', {
        codi_valor: name,
        codi_clas_id: id
      });
      setQrImage(response.data.qrImage);
      onOpen(true);
    } catch (error) {
      console.error('Error al generar el código QR', error);
    }
  };
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
        onOpenChange={onOpenChange}
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
                <Image
                  radius="none"
                  loading="lazy"
                  alt={`QR de la clase de ${value}`}
                  fallbackSrc="https://via.placeholder.com/300x200"
                  className="h-full object-cover w-full"
                  src={qrImage}
                />
              </ModalBody>
              <ModalFooter className="flex flex-col justify-center items-center">
                <span className="font-bold text-xs text-zinc-600">
                  Escanea este código QR para unirte a la clase
                </span>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default codeQR;
