import { fetchCurrentSelic } from './bcb'
import { fetchCurrentCdi } from './cetip'
import { RatesObject, RatesList } from './types'
import { SELIC, CDI } from './constants'

/**
  * Fetch brazilian selic and cdi rates apy in object
  *
  * @returns {Promise<RatesObject>} Promise with rates in object
  */
export async function getRatesObject(): Promise<RatesObject> {
  const [selic, cdi] = await Promise.all([
    getSelicRate(),
    getCdiRate(),
  ]);
  return { selic, cdi };
}

/**
  * Fetch brazilian selic and cdi rates apy in array
  *
  * @returns {Promise<RatesList[]>} Promise with rates in array
  */
export async function getRatesList(): Promise<RatesList[]> {
  const { selic, cdi } = await getRatesObject();
  return [
    { name: SELIC, apy: selic },
    { name: CDI, apy: cdi },
  ];
}

/**
  * Fetch brazilian selic rates apy
  *
  * @returns {Promise<number>} fetched selic rates apy
  */
export async function getSelicRate(): Promise<number> {
  const selic = await fetchCurrentSelic();
  return selic;
}

/**
  * Fetch cdi rate apy
  *
  * @returns {Promise<number>} fetched cdi rates apy
  */
export async function getCdiRate(): Promise<number> {
  const cdi = await fetchCurrentCdi();
  return cdi;
}
