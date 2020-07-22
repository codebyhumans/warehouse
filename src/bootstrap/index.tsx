import { checkDatabaseMigrations } from '@common/database';
import { remote, ipcRenderer as ipc } from 'electron';
import { checkUpdate } from '@common/updater';

const startLoading = (el: HTMLElement | null): (() => void) => {
  const interval =
    el &&
    setInterval(() => {
      if (el.innerHTML.length > 2) el.innerHTML = '';
      else el.innerHTML += '.';
    }, 200);

  return () => {
    if (el && interval) {
      clearInterval(interval);
      el.innerHTML = '';
    }
  };
};

document.addEventListener('DOMContentLoaded', async () => {
  const version = document.getElementById('version');
  if (version) version.innerHTML = remote.app.getVersion();

  ipc.send('bootstrap-ready-to-show');

  const status = document.getElementById('status');
  const setStatus = (msg: string) => {
    if (status) status.innerHTML = msg;
  };

  const preloader = document.getElementById('preloader');
  const stopLoading = startLoading(preloader);

  try {
    await checkUpdate(setStatus);
    await checkDatabaseMigrations(setStatus);
    ipc.send('bootstrap-finished', true);
  } catch (error) {
    setStatus(`Ошибка: ${error.message}`);
  } finally {
    stopLoading();
  }
});
