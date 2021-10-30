const bcb = require('./bcb');
const { CDI_SCORE, POUPANCA_PERCENT } = require('./constants');
const { sanitize } = require('./utils');

class Selic {
  constructor(opts = {}) {
    this.bcb = sanitize(opts.bcb, bcb);
    this.cdiScore = sanitize(opts.cdiScore, CDI_SCORE);
    this.poupancaPercent = sanitize(opts.poupancaPercent, POUPANCA_PERCENT);
  }

  /**
  * Fetch and calculate the brazilian selic, poupanca and cdi rates apy
  *
  * @return {Array} list with selic, poupanca and cdi rates apy
  * @public
  */
  async scrapRates() {
    const selic = await this.getSelic();
    const cdi = this.calculateCdiFromSelic(selic);
    const poupanca = this.calculatePoupancaFromSelic(selic);
    return [
      { name: 'Selic', apy: selic },
      { name: 'CDI', apy: cdi },
      { name: 'Poupança', apy: poupanca },
    ];
  }

  /**
  * Fetch the brazilian selic rates apy
  *
  * @return {Number} selic rates apy
  * @public
  */
  async getSelic() {
    const selic = await this.bcb.fetchSelic();
    return Number(Number(selic).toFixed(2));
  }

  /**
  * Calculate the cdi rate from selic value
  *
  * @return {Number} cdi rates apy
  * @public
  */
  calculateCdiFromSelic(selic = 0) {
    const cdi = selic - this.cdiScore;
    return Number(Number(cdi).toFixed(2));
  }

  /**
  * Calculate the poupanca rate from selic value
  *
  * @return {Number} poupanca rates apy
  * @public
  */
  calculatePoupancaFromSelic(selic = 0) {
    const poupanca = (selic / 100) * this.poupancaPercent;
    return Number(Number(poupanca).toFixed(2));
  }
}

module.exports = Selic;
