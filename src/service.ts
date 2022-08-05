import swithcher from 'ai-switcher-translit';

import getModification from './db';
import { BodyDTO } from './dto/body.dto';

class Service {
  async getCarsByFilterRetranslit(body: BodyDTO) {
    const {
      type, fields, filter, unique = true,
    } = body;
    if (type === 'get-modification') {
      const keys = this.splitter(fields);

      const modification = await getModification(keys, filter, unique);

      const translitedModification = modification.reduce((acc, item) => {
        if ('mark' in item) {
          const { mark: latinMark } = item;
          const cyrillicMark = this.retranslit(latinMark);
          item.mark = { latinMark, cyrillicMark }
        }
        return [...acc, item];
      }, []);

      return translitedModification;
    }
    return {}
  }

  async getCarsByFilter(body: BodyDTO) {
    const {
      type, fields, filter, unique = true,
    } = body;
    if (type === 'get-modification') {
      const keys = this.splitter(fields);

      return getModification(keys, filter, unique);
    }
    return {}
  }

  private retranslit (str: string) {
    const template = {
      'w': 'в'
    };

    const output = swithcher.getSwitch(str, {
      type: 'retranslit',
      input: template
    });

    return output;
  }

  private splitter (fields: string[]): string[] {
    const keys = fields.reduce((acc, key) => {
      if (key.includes('.')) {
        const splitedKey = key.split('.');

        return [...acc, `${key} AS ${splitedKey[0]}`];
      }

      return [...acc, key];
    }, []);
    return keys;
  }
}

export default new Service();
