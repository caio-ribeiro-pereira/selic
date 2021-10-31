import { fetchCurrentSelic } from './bcb'
import { fetchCurrentCdi } from './cetip'
import { POUPANCA_PERCENT } from './constants'

type Rate = {
  name: string,
  apy: number,
}

export class Selic {
  private poupancaPercent: number

  constructor(
    poupancaPercent: number = POUPANCA_PERCENT
  ) {
    this.poupancaPercent = poupancaPercent;
  }

  /**
  * Calculate the poupanca rate from selic value
  *
  * @param {number} selic selic rate apy for calculation
  * @returns {number} poupanca rates apy
  */
  private calculatePoupancaFromSelic(selic: number): number {
    const poupanca = (selic / 100) * this.poupancaPercent;
    return Number(Number(poupanca).toFixed(2));
  }

  /**
  * Fetch and calculate the brazilian selic, poupanca and cdi rates apy
  *
  * @returns {Promise<Rate[]>} Promise with the rate list selic, cdi and poupanca
  */
  async getAllRates(): Promise<Rate[]> {
    const [selic, cdi] = await Promise.all([
      this.getSelicRate(),
      this.getCdiRate(),
    ]);
    const poupanca = this.calculatePoupancaFromSelic(selic);
    return [
      { name: 'Selic', apy: selic },
      { name: 'CDI', apy: cdi },
      { name: 'Poupança', apy: poupanca },
    ];
  }

  /**
  * Fetch brazilian selic rates apy
  *
  * @returns {Promise<number>} fetched selic rates apy
  */
  async getSelicRate(): Promise<number> {
    const selic = await fetchCurrentSelic();
    return Number(Number(selic).toFixed(2));
  }

  /**
  * Fetch cdi rate apy
  *
  * @returns {Promise<number>} fetched cdi rates apy
  */
  async getCdiRate(): Promise<number> {
    const cdi = await fetchCurrentCdi();
    return Number(Number(cdi).toFixed(2));
  }

  /**
  * Fetch and calculate poupanca rate from selic value
  *
  * @returns {Promise<number>} fetched poupanca rates apy
  */
  async getPoupancaRate(): Promise<number> {
    const selic = await this.getSelicRate();
    return this.calculatePoupancaFromSelic(selic);
  }
}
