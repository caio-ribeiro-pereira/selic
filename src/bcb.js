const https = require('https');

const options = {
  hostname: 'api.bcb.gov.br',
  path: '/dados/serie/bcdata.sgs.1178/dados/ultimos/1?formato=json',
  port: 443,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  },
};

const bcb = {
  fetchSelic() {
    return new Promise((resolve, reject) => {
      const request = https.get(options, (response) => {
        let body = '';

        response.on('data', (chunk) => {
          body += chunk;
        });

        response.on('end', () => {
          try {
            console.log(body);
            const data = JSON.parse(body);
            const selic = data[0].valor;
            return resolve(selic);
          } catch (err) {
            console.error(err);
            return reject(new Error('Parse error'));
          }
        });
      });

      request.on('error', (err) => {
        console.error(err);
        return reject(new Error('Request error'));
      });
      request.end();
      return true;
    });
  },
};

module.exports = bcb;
