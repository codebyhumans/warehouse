import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Spinner from '@atlaskit/spinner';
import { useStores } from '@client/stores';

export const StartScreen = observer(() => {
  const { authentication, isAuthorized } = useStores().userStore;
  const [loading, setLoading] = useState(true);

  const initializeApplication = async () => {
    try {
      setLoading(true);
      await authentication();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeApplication();
  }, []);

  if (loading) return <Spinner size="large" />;
  return <Redirect to={isAuthorized ? '/providers' : '/signin'} />;
});
