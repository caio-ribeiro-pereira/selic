import { fetchCurrentSelic } from './bcb'
import { CDI_SCORE, POUPANCA_PERCENT } from './constants'

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

  async scrapRates() {
    const selic = await this.getSelicRate();
    const cdi = this.calculateCdiFromSelic(selic);
    const poupanca = this.calculatePoupancaFromSelic(selic);
    return [
      { name: 'Selic', apy: selic },
      { name: 'CDI', apy: cdi },
      { name: 'Poupança', apy: poupanca },
    ];
  }

  async getSelicRate() {
    const selic = await fetchCurrentSelic();
    return Number(Number(selic).toFixed(2));
  }

  async getCdiRate() {
    const selic = await this.getSelicRate();
    return this.calculateCdiFromSelic(selic);
  }

  async getPoupancaRate() {
    const selic = await this.getSelicRate();
    return this.calculatePoupancaFromSelic(selic);
  }

  calculateCdiFromSelic(selic: number) {
    const cdi = selic - this.cdiScore;
    return Number(Number(cdi).toFixed(2));
  }

  calculatePoupancaFromSelic(selic: number) {
    const poupanca = (selic / 100) * this.poupancaPercent;
    return Number(Number(poupanca).toFixed(2));
  }
}
