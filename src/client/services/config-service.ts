import { prisma } from '@client/libs/prisma';

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
    const config = await prisma.config.findOne({
      where: {
        key,
      },
    });

    if (config) {
      return this.stringToValue<T>(config.value, config.type);
    }
  }

  async delete(key: string) {
    return prisma.config.delete({
      where: { key },
    });
  }

  async set(key: string, val: any, type?: ConfigValueType) {
    const value = this.valueToString(val, type);

    return prisma.config.upsert({
      where: {
        key,
      },
      create: {
        key,
        value,
        type,
      },
      update: {
        value,
        type,
      },
    });
  }
}

export const configService = new ConfigService();
