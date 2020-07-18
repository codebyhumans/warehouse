import React, { useEffect, useState } from 'react';
import { ipcRenderer as ipc } from 'electron';
import { render } from 'react-dom';

import { checkDatabaseMigrations } from '@common/database';
import { checkUpdate } from '@common/auto-upader';

const Bootstrap = () => {
  const [status, setStatus] = useState('');

  const initializeBootstrap = async () => {
    await checkUpdate(setStatus);
    // await checkDatabaseMigrations(setStatus);
    ipc.send('bootstrap-finished', true);
  };

  useEffect(() => {
    ipc.send('bootstrap-ready-to-show');

    initializeBootstrap();
  }, []);

  return <div>{status}</div>;
};

render(<Bootstrap />, document.getElementById('root'));
