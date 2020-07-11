import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

import { localConfig } from '@common/local-config';

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  const { width, height } = localConfig.get('windowBounds');

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
      localConfig.set('windowBounds', { width, height });
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.allowRendererProcessReuse = true;
