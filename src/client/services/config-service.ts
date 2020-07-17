import { db } from '@db';

type ConfigValueType = 'json';

class ConfigService {
  private stringToValue<T>(val: any, type?: string | null): T {
    switch (type) {
      case 'json':
        return JSON.parse(val);
      default:
        return val;
    }
  }

  private valueToString(val: any, type?: string | null) {
    switch (type) {
      case 'json':
        return JSON.stringify(val);
      default:
        return typeof val !== 'string' ? val.toString() : val;
    }
  }

  async get<T>(key: string): Promise<T | undefined> {
    const config = await db('Config').where({ key }).first();

    if (config) {
      return this.stringToValue<T>(config.value, config.type);
    }
  }

  async delete(key: string) {
    return db('Config').where({ key }).delete();
  }

  async set(key: string, val: any, type?: ConfigValueType): Promise<any> {
    const value = this.valueToString(val, type);

    await db.raw(`
      INSERT INTO Config (key, type, value) VALUES ('${key}', '${type}', '${value}')
        ON CONFLICT (key) DO UPDATE
          SET type = '${type}', value = '${value}'
    `);

    return val;
  }
}

export const configService = new ConfigService();
