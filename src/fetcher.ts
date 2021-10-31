import * as https from 'https'

export function get(options: object): Promise<any> {
  return new Promise((resolve, reject) => {
    const request = https.get(options, (response) => {
      let body = '';

      response.on('data', (chunk) => {
        body += chunk;
      });

      response.on('end', () => {
        try {
          const data = JSON.parse(body);
          resolve(data);
        } catch {
          reject(new Error('Parse error'));
        }
      });
    });

    request.on('error', () => reject(new Error('Request error')));

    request.end();
  });
}