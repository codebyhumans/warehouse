import { ipcRenderer as ipc } from 'electron';
import React, { useEffect } from 'react';
import { render } from 'react-dom';

const Bootstrap = () => {
  useEffect(() => {
    ipc.send('bootstrap-ready-to-show');

    setTimeout(() => {
      ipc.send('bootstrap-finished', true);
    }, 4000);
  }, []);

  return <div>Bootstrap</div>;
};

render(<Bootstrap />, document.getElementById('root'));
