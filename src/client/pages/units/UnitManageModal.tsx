import React, { useEffect, useState } from 'react'

import ModalDialog, { ModalFooter } from '@atlaskit/modal-dialog'
import SuccessIcon from '@atlaskit/icon/glyph/check-circle'
import Button, { ButtonGroup } from '@atlaskit/button'
import { useModals } from '@client/components/Modals'
import Form, { Field } from '@atlaskit/form'
import TextField from '@atlaskit/textfield'
import { colors } from '@atlaskit/theme'

import { useNotifications } from '@client/components/Notifications'
import { unitsService } from '@client/services/units-service'
import { IUnit } from '@common/database/types/unit'

interface IProps {
  onSuccess?: () => void
  id?: number
}

interface IFormProps {
  name: string
  measure: string
}

export const UnitManageModal: React.FC<IProps> = (props) => {
  const { closeModal } = useModals()
  const { notify } = useNotifications()

  const [loading, setLoading] = useState<boolean>(false)
  const [unit, setUnit] = useState<IUnit>()

  const loadProvider = async () => {
    if (!props.id) return

    try {
      setLoading(true)
      const unit = await unitsService.getUnitById(props.id)
      if (unit) setUnit(unit)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProvider()
  }, [props.id])

  const onSubmit = async (data: IFormProps) => {
    if (!unit) {
      await unitsService.createUnit(data.name, data.measure)
    } else await unitsService.updateUnit(unit.id, data)

    if (props.onSuccess) props.onSuccess()

    notify({
      title: `Единица измерения успешно ${unit ? 'изменена' : 'создана'}`,
      icon: <SuccessIcon primaryColor={colors.G300} label="add-user-success" />,
    })

    closeModal()
  }

  return (
    <ModalDialog
      heading={`${props.id ? 'Редактирование' : 'Создание'} единицы измерения`}
      onClose={closeModal}
      components={{
        Container: ({ children }) => (
          <Form onSubmit={onSubmit}>
            {({ formProps }) => <form {...formProps}>{children}</form>}
          </Form>
        ),
        Footer: () => (
          <ModalFooter>
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
        defaultValue={unit && unit.name}
        label="Название"
        isRequired>
        {({ fieldProps }) => <TextField {...fieldProps} />}
      </Field>
      <Field
        name="measure"
        defaultValue={unit && unit.measure}
        label="Сокращенное название"
        isRequired>
        {({ fieldProps }) => <TextField {...fieldProps} />}
      </Field>
    </ModalDialog>
  )
}
