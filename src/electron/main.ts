import { app, BrowserWindow, ipcMain as ipc } from 'electron';
import { localConfig } from '@common/local-config';
import * as path from 'path';
import * as url from 'url';

const isProduction = process.env.NODE_ENV === 'production';

const createBootstrapWindow = () => {
  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    show: !isProduction,
    maximizable: false,
    minimizable: false,
    resizable: false,
    movable: false,
    center: true,
    frame: false,
    height: 250,
    width: 410,
  });

  const windowURL = isProduction
    ? url.format({
        pathname: path.join(__dirname, '../bootstrap/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    : 'http://localhost:4001';

  window.loadURL(windowURL);

  if (isProduction) {
    ipc.once('bootstrap-ready-to-show', () => {
      window.show();
    });
  }

  return window;
};

const createClientWindow = () => {
  const { width, height } = localConfig.get('windowBounds');

  const window = new BrowserWindow({
    show: !isProduction,
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const windowURL = isProduction
    ? url.format({
        pathname: path.join(__dirname, '../client/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    : 'http://localhost:4000';

  window.loadURL(windowURL);

  if (isProduction) {
    ipc.once('client-ready-to-show', () => {
      window.show();
    });
  }

  window.on('resize', () => {
    const { width, height } = window.getBounds();
    localConfig.set('windowBounds', { width, height });
  });

  return window;
};

app.on('ready', () => {
  if (isProduction || process.env.BOOTSTRAP) {
    const bootstrapWindow = createBootstrapWindow();

    ipc.once('bootstrap-finished', (event, success: boolean) => {
      if (success) createClientWindow();
      bootstrapWindow.close();
    });
  } else {
    createClientWindow();
  }
});

app.allowRendererProcessReuse = true;
