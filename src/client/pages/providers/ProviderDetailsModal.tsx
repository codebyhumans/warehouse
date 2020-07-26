import React, { useEffect, useState } from 'react'
import { shell } from 'electron'

import ModalDialog, { ModalFooter } from '@atlaskit/modal-dialog'
import SuccessIcon from '@atlaskit/icon/glyph/check-circle'
import Button, { ButtonGroup } from '@atlaskit/button'
import TableTree from '@atlaskit/table-tree'
import Form, { Field } from '@atlaskit/form'
import TextField from '@atlaskit/textfield'
import { colors } from '@atlaskit/theme'

import { providersService } from '@client/services/providers-service'
import { useNotifications } from '@client/components/Notifications'
import { IProvider } from '@common/database/types/provider'
import { useModals } from '@client/components/Modals'
import { PropertyList } from '@client/components/PropertyList'

interface IProps {
  provider: IProvider
}

export const ProviderDetailsModal: React.FC<IProps> = ({ provider }) => {
  const { closeModal } = useModals()

  return (
    <ModalDialog
      heading={provider.name}
      onClose={closeModal}
      components={{
        Footer: (props) => (
          <ModalFooter showKeyline={props.showKeyline}>
            <span />
            <Button onClick={closeModal}>Закрыть</Button>
          </ModalFooter>
        ),
      }}>
      <PropertyList
        list={[
          {
            propery: 'Название',
            value: provider.name,
          },
          {
            propery: 'УНП',
            value: provider.taxId,
          },
          {
            propery: 'Адрес',
            value() {
              const onClick = () =>
                shell.openExternal(
                  `https://maps.google.com/?q=${encodeURI(provider.address)}`,
                )

              return (
                provider.address && <a onClick={onClick}>{provider.address}</a>
              )
            },
          },
          {
            propery: 'E-mail',
            value() {
              return <a href={`mailto:${provider.email}`}>provider.email</a>
            },
          },
          {
            propery: 'Телефон',
            value: provider.phone,
          },
          {
            propery: 'Банк',
            value: provider.bankName,
          },
          {
            propery: 'Адрес банка',
            value: provider.bankAddress,
          },
          {
            propery: 'МФО',
            value: provider.bankMfo,
          },
        ]}
      />
    </ModalDialog>
  )
}
