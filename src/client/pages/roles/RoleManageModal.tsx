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
import { IRole } from '@common/database/types/role'
import { rolesService, IRoleManageData } from '@client/services/roles-service'
import { PermissionsManageList } from '@client/components/PermissionsManageList'

interface IProps {
  onSuccess?: () => void
  id?: number
}

export const RoleManageModal: React.FC<IProps> = (props) => {
  const { closeModal } = useModals()
  const { notify } = useNotifications()

  const [loading, setLoading] = useState<boolean>(false)
  const [role, setRole] = useState<IRole>()

  const load = async () => {
    if (!props.id) return

    try {
      setLoading(true)
      const role = await rolesService.getRoleById(props.id)
      if (role) setRole(role)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onSubmit = async (data: IRoleManageData) => {
    try {
      setLoading(true)

      if (!role) {
        await rolesService.createRole(data)
      } else await rolesService.updateRole(role.id, data)

      if (props.onSuccess) props.onSuccess()

      notify({
        title: `Роль успешно ${role ? 'изменена' : 'создана'}`,
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
      heading={`${props.id ? 'Редактирование' : 'Создание'} роли`}
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
        defaultValue={role?.name || ''}>
        {({ fieldProps }) => <TextField {...fieldProps} />}
      </Field>
      <Field
        name="permissions"
        label="Права"
        defaultValue={role?.permissions || 0}
        isRequired={true}>
        {({ fieldProps }) => <PermissionsManageList {...fieldProps} />}
      </Field>
    </ModalDialog>
  )
}
