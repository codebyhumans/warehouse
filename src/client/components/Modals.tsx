import React, { useState, createContext, useContext } from 'react'
import Modal, { ModalTransition } from '@atlaskit/modal-dialog'
import {
  AppearanceType,
  ActionProps,
} from '@atlaskit/modal-dialog/dist/cjs/types'

interface IModalContext {
  openDialog: (dialog: IDialogProps) => void
  openModal: (modal: React.FC) => void
  closeModal: () => void
}

interface IDialogProps {
  heading: string
  content?: string
  appearance?: AppearanceType
  actions: ActionProps[]
}

let modalContext: React.Context<IModalContext>

export const useModals = (): IModalContext => useContext(modalContext)

export const Modals: React.FC = () => {
  const [modal, openModal] = useState<React.FC | null>()

  const closeModal = () => {
    openModal(null)
  }

  const openDialog = (dialog: IDialogProps) => {
    const actions: ActionProps[] = [{ text: 'Отмена', onClick: closeModal }]

    if (dialog.actions.length) {
      actions.unshift(...dialog.actions)
    }

    openModal(() => (
      <Modal
        actions={actions}
        appearance={dialog.appearance}
        onClose={closeModal}
        heading={dialog.heading}>
        {dialog.content}
      </Modal>
    ))
  }

  modalContext = createContext<IModalContext>({
    closeModal,
    openDialog,
    openModal,
  })

  return <ModalTransition>{modal && modal}</ModalTransition>
}
