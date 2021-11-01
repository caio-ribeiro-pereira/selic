# Selic

[![Donate via Paypal](https://img.shields.io/badge/donate-paypal-blue)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=L8MUNAKECUULY&source=url) [![Build Status](https://app.travis-ci.com/caio-ribeiro-pereira/selic.svg?branch=main)](https://app.travis-ci.com/caio-ribeiro-pereira/selic) [![License](https://img.shields.io/github/license/caio-ribeiro-pereira/selic)](https://raw.githubusercontent.com/caio-ribeiro-pereira/selic/main/LICENSE) [![npm](https://img.shields.io/npm/v/selic)](https://www.npmjs.com/package/selic) [![GitHub stars](https://img.shields.io/github/stars/caio-ribeiro-pereira/selic)](https://github.com/caio-ribeiro-pereira/selic) [![GitHub forks](https://img.shields.io/github/forks/caio-ribeiro-pereira/selic)](https://github.com/caio-ribeiro-pereira/selic)

A tiny lib to scrap brazilian's selic, poupança and cdi rates.

## About

This is a tiny lib compatible with **Node.js v11+** and **TypeScript**, with zero dependencies, supports ES Import and CommonJS.

Basically this lib fetchs the current brazilian SELIC rates and CDI rates, all values in apy (percentage per year).

The Selic rate is fetched from [Banco Central do Brasil](https://bcb.gov.br)
The CDI rate is fetched from [CETIP](https://www2.cetip.com.br)


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

#### Fetch selic and cdi brazilian rates in array version

``` javascript
(async () => {
  const selic = new Selic();
  const rates = await selic.getAllRates();
  /*
   * [
   *  { name: 'Selic', apy: 7.75 },
   *  { name: 'CDI', apy: 7.65 }
   * ]
   */
  console.log(rates);
})()
```

#### Fetch selic and cdi brazilian rates in object version

``` javascript
(async () => {
  const selic = new Selic();
  const rates = await selic.getRatesObject();
  /*
   * { selic: 7.75, cdi: 7.65 }
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

## Author

Caio Ribeiro Pereira <caio.ribeiro.pereira@gmail.com>  
Twitter: <https://twitter.com/crp_underground>  
About me: <https://crpwebdev.github.io>
