import React, { useEffect, useState } from 'react'

import ModalDialog, { ModalFooter } from '@atlaskit/modal-dialog'
import SuccessIcon from '@atlaskit/icon/glyph/check-circle'
import Button, { ButtonGroup } from '@atlaskit/button'
import Form, { Field } from '@atlaskit/form'
import TextField from '@atlaskit/textfield'
import { colors } from '@atlaskit/theme'

import { providersService } from '@client/services/providers-service'
import { useNotifications } from '@client/components/Notifications'
import { IProvider } from '@common/database/types/provider'
import { useModals } from '@client/components/Modals'

interface IProps {
  onSuccess?: () => void
  id?: number
}

export const ProviderManageModal: React.FC<IProps> = (props) => {
  const { closeModal } = useModals()
  const { notify } = useNotifications()

  const [loading, setLoading] = useState<boolean>(false)
  const [provider, setProvider] = useState<IProvider>()

  const loadProvider = async () => {
    if (!props.id) return

    try {
      setLoading(true)
      const provider = await providersService.getProviderById(props.id)

      if (provider) {
        setProvider(provider)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProvider()
  }, [])

  const onSubmit = async (data: IProvider) => {
    try {
      setLoading(true)

      if (!provider) {
        await providersService.createProvider(data)
      } else await providersService.updateProvider(provider.id, data)

      if (props.onSuccess) props.onSuccess()

      notify({
        title: `Поставщик успешно ${provider ? 'изменен' : 'создан'}`,
        icon: (
          <SuccessIcon primaryColor={colors.G300} label="add-user-success" />
        ),
      })

      closeModal()
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalDialog
      heading={`${props.id ? 'Редактирование' : 'Создание'} поставщика`}
      onClose={closeModal}
      components={{
        Container: ({ children, className }) => (
          <Form onSubmit={onSubmit}>
            {({ formProps }) => (
              <form {...formProps} className={className}>
                {children}
              </form>
            )}
          </Form>
        ),
        Footer: (props) => (
          <ModalFooter showKeyline={props.showKeyline}>
            <span />
            <ButtonGroup>
              <Button appearance="subtle" onClick={closeModal}>
                Отменить
              </Button>
              <Button type="submit" appearance="primary" isLoading={loading}>
                Сохранить
              </Button>
            </ButtonGroup>
          </ModalFooter>
        ),
      }}>
      <Field
        name="name"
        label="Название"
        isRequired={true}
        defaultValue={provider?.name || ''}>
        {({ fieldProps }) => <TextField {...fieldProps} />}
      </Field>
      <Field name="taxId" label="УНП" defaultValue={provider?.taxId || ''}>
        {({ fieldProps }) => <TextField {...fieldProps} />}
      </Field>
      <Field
        name="address"
        label="Адрес"
        defaultValue={provider?.address || ''}>
        {({ fieldProps }) => <TextField {...fieldProps} />}
      </Field>
      <Field name="phone" label="Телефон" defaultValue={provider?.phone || ''}>
        {({ fieldProps }) => <TextField {...fieldProps} />}
      </Field>
      <Field name="email" label="Почта" defaultValue={provider?.email || ''}>
        {({ fieldProps }) => <TextField {...fieldProps} />}
      </Field>
      <Field
        name="bankName"
        label="Банк"
        defaultValue={provider?.bankName || ''}>
        {({ fieldProps }) => <TextField {...fieldProps} />}
      </Field>
      <Field
        name="bankAddress"
        label="Адрес банка"
        defaultValue={provider?.bankAddress || ''}>
        {({ fieldProps }) => <TextField {...fieldProps} />}
      </Field>
      <Field
        name="bankMfo"
        label="МФО Банка"
        defaultValue={provider?.bankMfo || ''}>
        {({ fieldProps }) => <TextField {...fieldProps} />}
      </Field>
    </ModalDialog>
  )
}
