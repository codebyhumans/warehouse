import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

import { Store } from './store.js';

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 800, height: 600 },
  },
});

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  let { width, height } = store.get('windowBounds');

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
      let { width, height } = mainWindow.getBounds();
      // Now that we have them, save them using the `set` method.
      store.set('windowBounds', { width, height });
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.allowRendererProcessReuse = true;
