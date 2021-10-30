import { fetchCurrentSelic } from './bcb'
import { CDI_SCORE, POUPANCA_PERCENT } from './constants'

export default class Selic {
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
    const selic = await this.getSelic();
    const cdi = this.calculateCdiFromSelic(selic);
    const poupanca = this.calculatePoupancaFromSelic(selic);
    return [
      { name: 'Selic', apy: selic },
      { name: 'CDI', apy: cdi },
      { name: 'Poupança', apy: poupanca },
    ];
  }

  async getSelic() {
    const selic = await fetchCurrentSelic();
    return Number(Number(selic).toFixed(2));
  }

  calculateCdiFromSelic(selic = 0) {
    const cdi = selic - this.cdiScore;
    return Number(Number(cdi).toFixed(2));
  }

  calculatePoupancaFromSelic(selic = 0) {
    const poupanca = (selic / 100) * this.poupancaPercent;
    return Number(Number(poupanca).toFixed(2));
  }
}
