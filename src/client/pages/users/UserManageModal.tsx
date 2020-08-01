import React, { useEffect, useState, useMemo } from 'react'

import ModalDialog, { ModalFooter } from '@atlaskit/modal-dialog'
import SuccessIcon from '@atlaskit/icon/glyph/check-circle'
import Button, { ButtonGroup } from '@atlaskit/button'
import { useModals } from '@client/components/Modals'
import Form, { Field } from '@atlaskit/form'
import TextField from '@atlaskit/textfield'
import { colors } from '@atlaskit/theme'
import Select, { ValueType } from '@atlaskit/select'

import { useNotifications } from '@client/components/Notifications'

import { usersService } from '@client/services/users-service'
import { rolesService } from '@client/services/roles-service'
import { IUser } from '@common/database/types/user'
import { IRole } from '@common/database/types/role'

interface IProps {
  onSuccess?: () => void
  id?: number
}

interface IFormProps {
  name: string
  password: string
  role: IRoleSelectOption
}

interface IRoleSelectOption {
  label: string
  value: number
}

export const UserManageModal: React.FC<IProps> = (props) => {
  const { closeModal } = useModals()
  const { notify } = useNotifications()

  const isEdit = useMemo(() => !!props.id, [props.id])
  const [loading, setLoading] = useState<boolean>(true)
  const [roles, setRoles] = useState<IRoleSelectOption[]>([])
  const [user, setUser] = useState<IUser>()

  const load = async () => {
    try {
      const roles = await rolesService.getAllRoles()
      setRoles(roles.map((role) => ({ label: role.name, value: role.id })))

      if (isEdit) {
        const user = await usersService.getUserById(props.id!)
        if (user) setUser(user)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onSubmit = async ({ role, ...form }: IFormProps) => {
    try {
      setLoading(true)

      const data = {
        ...form,
        roleId: role.value,
      }

      if (!isEdit) {
        await usersService.createUser(data)
      } else await usersService.updateUser(user!.id, data)
      if (props.onSuccess) props.onSuccess()

      notify({
        title: `Пользователь успешно ${isEdit ? 'изменен' : 'создан'}`,
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
      heading={`${isEdit ? 'Редактирование' : 'Создание'} пользователя`}
      onClose={closeModal}
      components={{
        Container: ({ children }) => (
          <Form onSubmit={onSubmit}>
            {({ formProps }) => <form {...formProps}>{children}</form>}
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
      <Field<ValueType<IRoleSelectOption>>
        defaultValue={user && { value: user.roleId, label: user.roleName }}
        name="role"
        label="Роль"
        isRequired>
        {({ fieldProps }) => (
          <Select {...fieldProps} options={roles} placeholder="Выберете роль" />
        )}
      </Field>

      <Field name="name" defaultValue={user?.name} label="Имя" isRequired>
        {({ fieldProps }) => <TextField {...fieldProps} />}
      </Field>

      {!isEdit && (
        <Field name="password" label="Пароль" isRequired>
          {({ fieldProps }) => <TextField {...fieldProps} />}
        </Field>
      )}
    </ModalDialog>
  )
}
