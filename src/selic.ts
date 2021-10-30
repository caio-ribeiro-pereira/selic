import { fetchCurrentSelic } from './bcb'
import { CDI_SCORE, POUPANCA_PERCENT } from './constants'

type Rate = {
  name: string,
  apy: number,
}

export class Selic {
  private cdiScore: number
  private poupancaPercent: number

  constructor(
    cdiScore: number = CDI_SCORE,
    poupancaPercent: number = POUPANCA_PERCENT
  ) {
    this.cdiScore = cdiScore;
    this.poupancaPercent = poupancaPercent;
  }

  /**
  * Fetch and calculate the brazilian selic, poupanca and cdi rates apy
  *
  * @returns {Array} list with selic, poupanca and cdi rates apy
  */
  async scrapRates(): Promise<Rate[]> {
    const selic = await this.getSelicRate();
    const cdi = this.calculateCdiFromSelic(selic);
    const poupanca = this.calculatePoupancaFromSelic(selic);
    return [
      { name: 'Selic', apy: selic },
      { name: 'CDI', apy: cdi },
      { name: 'Poupança', apy: poupanca },
    ];
  }

  /**
  * Fetch and calculate brazilian selic rates apy
  *
  * @returns {Number} fetched selic rates apy
  */
  async getSelicRate() {
    const selic = await fetchCurrentSelic();
    return Number(Number(selic).toFixed(2));
  }

  /**
  * Fetch and calculate cdi rate from selic value
  *
  * @returns {Number} fetched cdi rates apy
  */
  async getCdiRate() {
    const selic = await this.getSelicRate();
    return this.calculateCdiFromSelic(selic);
  }

  /**
  * Fetch and calculate poupanca rate from selic value
  *
  * @returns {Number} fetched poupanca rates apy
  */
  async getPoupancaRate() {
    const selic = await this.getSelicRate();
    return this.calculatePoupancaFromSelic(selic);
  }

  /**
  * Calculate the cdi rate from selic value
  *
  * @param {number} selic selic rate apy for calculation
  * @returns {Number} cdi rates apy
  */
  calculateCdiFromSelic(selic: number): number {
    const cdi = selic - this.cdiScore;
    return Number(Number(cdi).toFixed(2));
  }

  /**
  * Calculate the poupanca rate from selic value
  *
  * @param {number} selic selic rate apy for calculation
  * @returns {Number} poupanca rates apy
  */
  calculatePoupancaFromSelic(selic: number): number {
    const poupanca = (selic / 100) * this.poupancaPercent;
    return Number(Number(poupanca).toFixed(2));
  }
}
