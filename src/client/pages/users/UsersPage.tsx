import React from 'react'
import { observer } from 'mobx-react-lite'
import PageHeader from '@atlaskit/page-header'
import Button, { ButtonGroup } from '@atlaskit/button'
import { Container } from '@client/theme/grid'
import { useStores } from '@client/stores'
import { useNotifications } from '@client/components/Notifications'
import SuccessIcon from '@atlaskit/icon/glyph/check-circle'
import { colors } from '@atlaskit/theme'

const ActionsContent = () => {
  const { notify } = useNotifications()

  return (
    <ButtonGroup>
      <Button
        appearance="primary"
        onClick={() =>
          notify({
            title: 'Пользователь успешно добавлен',
            icon: (
              <SuccessIcon
                primaryColor={colors.G300}
                label="add-user-success"
              />
            ),
            description: 'Андрей успешно добавлен.',
          })
        }>
        Добавить пользователя
      </Button>
    </ButtonGroup>
  )
}

export const UsersPage: React.FC = observer(() => {
  const { users } = useStores().usersStore

  return (
    <Container>
      <PageHeader actions={<ActionsContent />}>Пользователи</PageHeader>
      {users.map((u) => (
        <div>
          {u.id}
          {u.name}
        </div>
      ))}
    </Container>
  )
})
