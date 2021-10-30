import * as https from 'https'
import { BCB_HOST, BCB_SELIC_PATH } from './constants'

const options = {
  hostname: BCB_HOST,
  path: BCB_SELIC_PATH,
  port: 443,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  },
};

export function fetchCurrentSelic() {
  return new Promise((resolve, reject) => {
    const request = https.get(options, (response) => {
      let body = '';

      response.on('data', (chunk) => {
        body += chunk;
      });

      response.on('end', () => {
        try {
          const data = JSON.parse(body);
          const selic = data[0].valor;
          resolve(selic);
        } catch {
          reject(new Error('Parse error'));
        }
      });
    });

    request.on('error', () => reject(new Error('Request error')));

    request.end();
  });
}
