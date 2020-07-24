import React, { createContext, useState, useContext, useRef } from 'react'
import Flag, { FlagGroup, FlagProps } from '@atlaskit/flag'

interface INotificationProps extends Omit<FlagProps, 'id'> {}

const NotificationsContext = createContext<{
  notify: (data: INotificationProps) => void
}>({
  notify() {},
})

export const useNotifications = () => useContext(NotificationsContext)

export const Notifications: React.FC = ({ children }) => {
  const [notifications, setNotifications] = useState<FlagProps[]>([])
  const count = useRef(0)

  const dismissFlag = () => {
    setNotifications(notifications.slice(1))
  }

  const notify = (data: INotificationProps) => {
    const notification = { ...data, id: count.current++, isAutoDismiss: true }
    setNotifications([notification, ...notifications])
  }

  return (
    <NotificationsContext.Provider value={{ notify }}>
      <FlagGroup onDismissed={dismissFlag}>
        {notifications.map((notify) => (
          <Flag key={notify.id} {...notify} />
        ))}
      </FlagGroup>

      {children}
    </NotificationsContext.Provider>
  )
}
