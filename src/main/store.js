import electron from 'electron';
import path from 'path';
import fs from 'fs';

function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    return defaults;
  }
}

export class Store {
  constructor(options) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    this.path = path.join(userDataPath, options.configName + '.json');
    this.data = parseDataFile(this.path, options.defaults);
  }

  get(key) {
    return this.data[key];
  }

  set(key, val) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}
