# Selic

[![Donate via Paypal](https://img.shields.io/badge/donate-paypal-blue)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=L8MUNAKECUULY&source=url) [![Build Status](https://app.travis-ci.com/caio-ribeiro-pereira/selic.svg?branch=main)](https://app.travis-ci.com/caio-ribeiro-pereira/selic) [![License](https://img.shields.io/github/license/caio-ribeiro-pereira/selic)](https://raw.githubusercontent.com/caio-ribeiro-pereira/selic/main/LICENSE) [![npm](https://img.shields.io/npm/v/selic)](https://www.npmjs.com/package/selic) [![GitHub stars](https://img.shields.io/github/stars/caio-ribeiro-pereira/selic)](https://github.com/caio-ribeiro-pereira/selic) [![GitHub forks](https://img.shields.io/github/forks/caio-ribeiro-pereira/selic)](https://github.com/caio-ribeiro-pereira/selic)

A tiny lib to scrap brazilian's selic, poupança and cdi rates.

## About

This is a tiny lib **(~15kb size unpacked)** compatible with **Node.js v11+** and **TypeScript**, with zero dependencies, supports ES Import and CommonJS.

Basically this lib fetchs the current brazilian SELIC rates and calculates CDI and Poupança rates, all values in apy (percentage per year).

The Selic rate is fetched from [Banco Central do Brasil](https://bcb.gov.br)


### How to install

```
npm install --save selic
```

### How to use  

### ESImport

``` javascript
import { Selic } from 'selic';
```

### CommonJS

``` javascript
const { Selic } = require('selic');
```

#### Fetch selic and calculate all brazilian rates

``` javascript
(async () => {
  const selic = new Selic();
  const rates = await selic.getAllRates();
  /*
   * [
   *  { name: 'Selic', apy: 7.75 },
   *  { name: 'CDI', apy: 7.65 },
   *  { name: 'Poupança', apy: 5.6 },
   * ]
   */
  console.log(rates);
})()
```

### Get only Selic rate

``` javascript
(async () => {
  const selic = new Selic();
  const selicValue = await selic.getSelicRate();
  console.log(selicValue); // 7.75
})()
```

### Get only CDI rate

``` javascript
(async () => {
  const selic = new Selic();
  const cdiValue = await selic.getCdiRate();
  console.log(cdiValue); // 7.65
})()
```

### Get only Poupança rate

``` javascript
(async () => {
  const selic = new Selic();
  const poupancaValue = await selic.getPoupancaRate();
  console.log(poupancaValue); // 5.67
})()
```

## Author

Caio Ribeiro Pereira <caio.ribeiro.pereira@gmail.com>  
Twitter: <https://twitter.com/crp_underground>  
About me: <https://crpwebdev.github.io>
