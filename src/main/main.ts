import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

import { LocalConfig } from '@common/local-config';

const store = new LocalConfig({
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 800, height: 600 },
  },
});

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  const { width, height } = store.get('windowBounds');

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`http://localhost:4000`);
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }

  mainWindow.on('resize', () => {
    if (mainWindow) {
      const { width, height } = mainWindow.getBounds();
      store.set('windowBounds', { width, height });
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.allowRendererProcessReuse = true;
