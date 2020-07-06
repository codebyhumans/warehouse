import React, { useState, useEffect } from 'react';
import Spinner from '@atlaskit/spinner';
import { useStores } from '../stores/appStore';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
export const StartScreen = observer(() => {
  const { load, loaded } = useStores().authenticationStore;
  const [loading, setLoading] = useState(!loaded);

  async function authentication() {
    if (!loaded) {
      await load();
    }

    setLoading(false);
  }

  useEffect(() => {
    authentication();
  }, []);

  return loading ? <Spinner size="large" /> : <Redirect to="/signin" />;
});