import { ipcRenderer as ipc } from 'electron';
import React, { useEffect } from 'react';
import { render } from 'react-dom';

const Bootstrap = () => {
  useEffect(() => {
    setTimeout(() => {
      ipc.send('bootstrap-finished', true);
    }, 2000);
  }, []);

  return <div>Bootstrap</div>;
};

render(<Bootstrap />, document.getElementById('root'));
