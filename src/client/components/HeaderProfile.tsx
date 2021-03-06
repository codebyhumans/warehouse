import React from 'react'
import { remote } from 'electron'
import { useHistory } from 'react-router'

import Avatar from '@atlaskit/avatar'
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu'
import { Profile } from '@atlaskit/atlassian-navigation'
import { useStores } from '@client/stores'

export const HeaderProfile = () => {
  const { logout } = useStores().userStore
  const history = useHistory()

  const onLogout = async () => {
    await logout()
    const currentWindow = remote.getCurrentWindow()
    currentWindow.close()
  }

  const onUserChange = async () => {
    await logout()
    history.push('/start')
  }

  return (
    <DropdownMenu
      trigger={
        <Profile icon={<Avatar />} tooltip="Your profile and settings" />
      }
      position="bottom right">
      <DropdownItemGroup>
        <DropdownItem onClick={onUserChange}>Сменить пользователя</DropdownItem>
        <DropdownItem onClick={onLogout}>Закрыть</DropdownItem>
      </DropdownItemGroup>
    </DropdownMenu>
  )
}
