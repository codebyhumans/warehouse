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
    maximizable: false,
    minimizable: false,
    resizable: false,
    movable: false,
    center: true,
    height: 270,
    width: 450,
  });

  window.loadURL(
    url.format({
      pathname: path.join(__dirname, '../bootstrap/index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );

  return window;
};

const createMainWindow = () => {
  const { width, height } = localConfig.get('windowBounds');

  const window = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const windowURL = isProduction
    ? url.format({
        pathname: path.join(__dirname, 'client/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    : 'http://localhost:4000';

  window.loadURL(windowURL);

  window.on('resize', () => {
    const { width, height } = window.getBounds();
    localConfig.set('windowBounds', { width, height });
  });

  return window;
};

app.on('ready', () => {
  if (isProduction) {
    const bootstrapWindow = createBootstrapWindow();

    ipc.once('bootstrap-finished', (event, success: boolean) => {
      if (success) createMainWindow();
      bootstrapWindow.close();
    });
  } else {
    createMainWindow();
  }
});

app.allowRendererProcessReuse = true;
