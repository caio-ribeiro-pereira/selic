const https = require('https');

const URL = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.1178/dados/ultimos/1?formato=json';

const bcb = {
  fetchSelic() {
    return new Promise((resolve, reject) => {
      const request = https.get(URL, (response) => {
        let body = '';

        response.on('data', (chunk) => {
          body += chunk;
        });

        response.on('end', () => {
          try {
            const data = JSON.parse(body);
            const selic = data[0].valor;
            return resolve(selic);
          } catch (err) {
            return reject(new Error('Parse error'));
          }
        });
      });

      request.on('error', () => reject(new Error('Request error')));
      request.end();
      return true;
    });
  },
};

module.exports = bcb;
