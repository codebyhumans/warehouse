import React, { useState, useEffect } from 'react'

import { Checkbox } from '@atlaskit/checkbox'

import {
  Permission,
  PermissionProperties,
  permissionsService,
  PermissionStack,
} from '@client/services/permissions-servise'

interface IProps {
  onChange: (event: PermissionStack) => any
  value?: number | null | undefined
}

export const PermissionsManageList: React.FC<IProps> = (props) => {
  const [stack, setStack] = useState<PermissionStack>(props.value)
  const [permissions] = useState<Permission[]>(
    Object.keys(PermissionProperties).map((key) => +key),
  )

  const onChange = (permission: Permission) => (event: any) =>
    setStack(
      event.target.checked
        ? permissionsService.addPermission(permission, stack)
        : permissionsService.deletePermission(stack!, permission),
    )

  useEffect(() => props.onChange(stack), [stack])

  return (
    <>
      {permissions.map((permission, idx) => (
        <Checkbox
          key={idx}
          isChecked={permissionsService.checkPermission(stack, permission)}
          label={PermissionProperties[permission]}
          onChange={onChange(permission)}
        />
      ))}
    </>
  )
}
