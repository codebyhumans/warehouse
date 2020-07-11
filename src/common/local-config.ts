import debounce from 'lodash/debounce';
import electron from 'electron';
import get from 'lodash/get';
import set from 'lodash/set';
import path from 'path';
import fs from 'fs';

interface ILocalConfig {
  [key: string]: any;
}

interface ILocalConfigOptions {
  defaults: ILocalConfig;
  configName: string;
  debounce?: number;
}

export class LocalConfig {
  private readonly path: string;
  private readonly data: ILocalConfig;

  constructor(private readonly options: ILocalConfigOptions) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');

    console.log(userDataPath);
    this.path = path.join(userDataPath, this.options.configName + '.json');
    this.data = this.initConfig(this.options.defaults);
  }

  private initConfig(defaults: ILocalConfig) {
    try {
      return JSON.parse(fs.readFileSync(this.path, 'utf-8'));
    } catch (error) {
      return defaults;
    }
  }

  private saveConfig = debounce(() => {
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }, this.options.debounce || 300);

  get(key: string, defaultValue?: any): any {
    return get(this.data, key, defaultValue);
  }

  set(key: string, val: any) {
    set(this.data, key, val);
    this.saveConfig();
  }
}

export const localConfig = new LocalConfig({
  configName: 'local-config',
  defaults: {
    windowBounds: { width: 800, height: 600 },
  },
});
