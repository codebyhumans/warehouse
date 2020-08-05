import React, { useEffect } from 'react'
import styled from 'styled-components'
import { BrowserRouter as AppRouter } from 'react-router-dom'
import { ipcRenderer as ipc } from 'electron'

import { Notifications } from '@client/components/Notifications'
import { Modals } from '@client/components/Modals'
import { Routes } from '@client/Routes'
import '@client/theme/global-style'

export const App: React.FC = () => {
  useEffect(() => {
    ipc.send('client-ready-to-show')
  }, [])

  return (
    <Wrapper>
      <Notifications>
        <Modals />
        <AppRouter>
          <Routes />
        </AppRouter>
      </Notifications>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`
