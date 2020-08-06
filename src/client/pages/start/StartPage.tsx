import React, { useState, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import Spinner from '@atlaskit/spinner'
import { useStores } from '@client/stores'
import { localConfig } from '@common/local-config'

export const StartScreen = observer(() => {
  const { authentication, isAuthorized } = useStores().userStore
  const [loading, setLoading] = useState(true)
  const lastLocation = useRef(localConfig.get('location') || '/providers')

  const initializeApplication = async () => {
    try {
      setLoading(true)
      await authentication()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    initializeApplication()
  }, [])

  if (loading) return <Spinner size="large" />
  return <Redirect to={isAuthorized ? lastLocation.current : '/login'} />
})
