import { fetchCurrentSelic } from './bcb'
import { fetchCurrentCdi } from './cetip'

type RatesList = {
  name: string,
  apy: number,
}

type RatesObject = {
  selic: number,
  cdi: number,
}

export class Selic {
  /**
  * Fetch brazilian selic and cdi rates apy in object
  *
  * @returns {Promise<RatesObject>} Promise with rate object { selic, cdi }
  */
   async getRatesObject(): Promise<RatesObject> {
    const [selic, cdi] = await Promise.all([
      this.getSelicRate(),
      this.getCdiRate(),
    ]);
    return { selic, cdi };
  }

  /**
  * Fetch brazilian selic and cdi rates apy
  *
  * @returns {Promise<RatesList[]>} Promise with list of rates
  */
  async getAllRates(): Promise<RatesList[]> {
    const rates = await this.getRatesObject();
    return [
      { name: 'Selic', apy: rates.selic },
      { name: 'CDI', apy: rates.cdi },
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
}
