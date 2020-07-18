import { remote } from 'electron';

interface ProgressInfo {
  total: number;
  delta: number;
  transferred: number;
  percent: number;
  bytesPerSecond: number;
}

export const checkUpdate = (setStatus: (msg: string) => void) =>
  new Promise((resolve, reject) => {
    const updater = remote.require('electron-updater').autoUpdater;

    const data = {
      provider: 'github',
      owner: 'codebyhumans',
      repo: 'anchor-crm',
      private: true,
      token: 'bca2c300e269f9630fa687dacbd0d7594faaab90',
    };

    updater.setFeedURL(data);

    updater.checkForUpdates();

    updater.on('checking-for-update', () => {
      setStatus('Проверка наличия обновлений...');
    });

    updater.on('update-available', () => {
      setStatus('Обновление доступно.');
    });

    updater.on('update-not-available', () => {
      setStatus('Обновление недоступно.');
      resolve();
    });

    updater.on('error', (err: any) => {
      setStatus(`Ошибка при обновление: ${err}`);
      reject();
    });

    updater.on('download-progress', (progress: ProgressInfo) => {
      setStatus(
        `Скорость загрузки: ${progress.bytesPerSecond}. Загружено ${progress.percent}% (${progress.transferred}/${progress.total})`,
      );
    });

    updater.on('update-downloaded', () => {
      updater.quitAndInstall();
    });
  });
