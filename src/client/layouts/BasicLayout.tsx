import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import styled from 'styled-components'

import { PageLayout } from '@atlaskit/page-layout'
import { localConfig } from '@common/local-config'

import { Header } from '../components/Header'

export const BasicLayout: React.FC = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    localConfig.set('location', location.pathname)
  }, [location])

  return (
    <Layout>
      <Header />
      <Content>{children}</Content>
    </Layout>
  )
}

const Layout = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  overflow: auto;
`
