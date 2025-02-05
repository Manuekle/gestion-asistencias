/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button
} from '@heroui/react';
import { useDispatch } from 'react-redux';
import { Delete02Icon } from 'hugeicons-react';
import { cancelClassStatus } from '../actions/classActions';

function cancelClass({ value, id }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState(false);

  //   const navigate = useNavigate();

  const handleCancel = async () => {
    setFormData(true);
    dispatch(cancelClassStatus(id));
    await setTimeout(() => {
      setFormData(false);
      window.history.back();
    }, 2000);
  };

  return (
    <>
      <button
        type="button"
        className="bg-[#FEF2F2] hover:bg-[#FEF2F2]/90 text-xs shadow-sm font-bold text-[#C25269] px-4 py-2 rounded-md w-full"
        onClick={onOpen}
      >
        Cancelar clase
      </button>
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
                  Cancelar clase de {value}
                </h1>
              </ModalHeader>
              <ModalBody className="">
                <p className="text-sm">
                  ¿Está seguro de que desea cancelar esta clase? Esta acción no
                  se puede deshacer.
                </p>
              </ModalBody>
              <ModalFooter>
                {/* <button
                  type="button"
                  className="bg-[#FEF2F2] hover:bg-[#FEF2F2]/90 text-[#C25269] text-xs rounded-lg font-bold px-4 py-2"
                  onClick={handleCancel}
                >
                  <Delete02Icon size={20} color="#F31260" variant="stroke" />
                </button> */}
                {!formData ? (
                  <Button
                    onPress={handleCancel}
                    className="bg-[#FEF2F2] hover:bg-[#FEF2F2]/90 text-[#C25269] text-xs rounded-lg font-bold px-4 py-2"
                  >
                    <Delete02Icon size={20} color="#F31260" variant="stroke" />
                  </Button>
                ) : (
                  <Button
                    isLoading
                    className="bg-[#FEF2F2] hover:bg-[#FEF2F2]/90 text-[#C25269] text-xs rounded-lg font-bold px-4 py-2"
                    spinner={
                      <svg
                        className="animate-spin h-5 w-5 text-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          fill="currentColor"
                        />
                      </svg>
                    }
                  >
                    Cancelando
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default cancelClass;
