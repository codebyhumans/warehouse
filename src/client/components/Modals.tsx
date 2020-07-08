import React, { useState, createContext, useContext } from 'react';
import { ModalTransition } from '@atlaskit/modal-dialog';

interface IModalContext {
  setModal: (modal: React.FC) => void;
  onClose: () => void;
}

let modalContext: React.Context<IModalContext>;

export const useModals = (): IModalContext => useContext(modalContext);

export const Modals: React.FC = () => {
  const [modal, setModal] = useState<React.FC | null>();

  const onClose = () => {
    setModal(null);
  };

  modalContext = createContext<IModalContext>({
    setModal,
    onClose,
  });

  return <ModalTransition>{modal && modal}</ModalTransition>;
};
