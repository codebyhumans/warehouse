import { bytesToMegaBytes } from '@common/utils'
import { remote } from 'electron'

interface ProgressInfo {
  bytesPerSecond: number
  percent: number
}

type SetStatus = (msg: string) => void

export const checkUpdate = (setStatus: SetStatus) =>
  new Promise((resolve, reject) => {
    const updater = remote.require('electron-updater').autoUpdater

    const data = {
      provider: 'github',
      owner: 'codebyhumans',
      repo: 'warehouse',
    }

    updater.setFeedURL(data)

    updater.checkForUpdates()

    updater.on('checking-for-update', () => {
      setStatus('Проверка наличия обновлений')
    })

    updater.on('update-available', () => {
      setStatus('Обновление доступно')
    })

    updater.on('update-not-available', () => {
      resolve()
    })

    updater.on('error', (err: Error) => {
      setStatus(`Ошибка при обновление: ${err.message}`)
      reject(err)
    })

    updater.on('download-progress', (progress: ProgressInfo) => {
      const speed = bytesToMegaBytes(progress.bytesPerSecond)
      const loaded = progress.percent.toFixed(0)

      setStatus(`Скорость загрузки: ${speed}мб/сек. Загружено ${loaded}%`)
    })

    updater.on('update-downloaded', () => {
      updater.quitAndInstall()
    })
  })
