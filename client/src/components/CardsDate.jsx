/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  MoreHorizontalIcon,
  EyeIcon,
  QrCodeIcon,
  Delete02Icon
} from 'hugeicons-react';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Image,
  useDisclosure
} from '@heroui/react';

function CardsDate({
  hora_inicio,
  hora_fin,
  nombre_clase,
  nombre_profesor,
  descripcion
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenQr,
    onOpen: onOpenQr,
    onOpenChange: onOpenChangeQr
  } = useDisclosure();

  return (
    <>
      <section className="flex flex-row justify-between items-start">
        <article className="flex flex-row gap-6 items-start">
          <span className="flex flex-col gap-1">
            <h1 className="font-bold text-zinc-800 text-sm">{hora_inicio}</h1>
            <h1 className="font-bold text-zinc-400 text-xs">{hora_fin}</h1>
          </span>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="border-t-2 border-s border-amber-400" />
            <span className="flex flex-col gap-1">
              <h1 className="font-bold text-amber-400 text-xs">
                {nombre_clase}
              </h1>
              <h1 className="font-bold text-zinc-800 text-sm">
                {nombre_profesor}
              </h1>
              <p className="font-normal text-zinc-400 text-xs">{descripcion}</p>
            </span>
          </div>
        </article>
        <Dropdown>
          <DropdownTrigger>
            <button type="button" className="flex flex-row gap-2 items-center">
              <MoreHorizontalIcon size={20} color="#000" variant="stroke" />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dropdown menu with shortcut" variant="flat">
            <DropdownItem key="nuevo">
              <Link to="clase" className="flex justify-between items-center">
                <h1 className="font-bold text-zinc-800">Ver clase</h1>
                <EyeIcon size={16} color="#27272A" variant="stroke" />
              </Link>
            </DropdownItem>
            <DropdownItem key="generar" onPress={onOpenQr}>
              <span className="flex justify-between items-center">
                <h1 className="font-bold text-zinc-800">Generar codigo</h1>
                <QrCodeIcon size={16} color="#27272A" variant="stroke" />
              </span>
            </DropdownItem>
            <DropdownItem
              key="eliminar"
              className="text-danger"
              color="danger"
              onPress={onOpen}
            >
              <span className="flex justify-between items-center">
                <h1 className="font-bold text-danger">Cancelar clase</h1>
                <Delete02Icon size={16} color="#F31260" variant="stroke" />
              </span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </section>
      {/* modal de eliminacion */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
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
                  Cancelar clase de {nombre_clase}
                </h1>
              </ModalHeader>
              <ModalBody className="">
                <p className="text-sm">
                  ¿Está seguro de que desea cancelar esta clase? Esta acción no
                  se puede deshacer.
                </p>
              </ModalBody>
              <ModalFooter>
                <button
                  type="button"
                  className="bg-[#FDD0DF] hover:bg-[#FDD0DF]/90 text-[#F31260] text-xs rounded-lg font-bold px-4 py-2"
                  onClick={onClose}
                >
                  <Delete02Icon size={20} color="#F31260" variant="stroke" />
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* modal de qr */}
      <Modal
        isOpen={isOpenQr}
        onOpenChange={onOpenChangeQr}
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
                  Código QR de la clase de {nombre_clase}
                </h1>
              </ModalHeader>
              <ModalBody className="flex justify-center items-center p-8">
                <Image
                  radius="none"
                  loading="lazy"
                  alt={`QR de la clase de ${nombre_clase}`}
                  fallbackSrc="https://via.placeholder.com/300x200"
                  className="h-full object-cover w-full"
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HelloWorld"
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

export default CardsDate;
