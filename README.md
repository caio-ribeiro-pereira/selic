# Selic

[![Donate via Paypal](https://img.shields.io/badge/donate-paypal-blue)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=L8MUNAKECUULY&source=url) [![Build Status](https://travis-ci.org/caio-ribeiro-pereira/selic.svg?branch=master)](https://travis-ci.org/caio-ribeiro-pereira/selic) ![npm](https://img.shields.io/npm/dt/selic) ![GitHub](https://img.shields.io/github/license/caio-ribeiro-pereira/selic) ![npm](https://img.shields.io/npm/v/selic) ![GitHub stars](https://img.shields.io/github/stars/caio-ribeiro-pereira/selic) ![GitHub forks](https://img.shields.io/github/forks/caio-ribeiro-pereira/selic)

A tiny lib to scrap brazilian's selic, poupança and cdi rates.

## About

This is a tiny lib **(~10kb size unpacked)** compatible with **Node.js v11+**, which request the current brazilian SELIC rates and calculates CDI and Poupança rates, all values in apy (percentage per year).


### How to install

```
npm install --save selic
```

### How to use  

#### Fetch selic and calculate all brazilian rates

``` javascript
const Selic = require('selic');

(async () => {
  const selic = new Selic();
  const rates = await selic.scrapRates();
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

## Author

Caio Ribeiro Pereira <caio.ribeiro.pereira@gmail.com>  
Twitter: <https://twitter.com/crp_underground>  
About me: <https://crpwebdev.github.io>
