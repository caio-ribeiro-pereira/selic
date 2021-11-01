import { fetchCurrentSelic, fetchCurrentIpca } from './bcb'
import { fetchCurrentCdi } from './cetip'
import { RatesObject, RatesList } from './types'
import { SELIC, CDI, IPCA } from './constants'

/**
  * Fetch brazilian selic, cdi and ipca rates apy in object
  *
  * @returns {Promise<RatesObject>} Promise rates in object
  */
export async function getRatesObject(): Promise<RatesObject> {
  const [selic, cdi, ipca] = await Promise.all([
    getSelicRate(),
    getCdiRate(),
    getIpcaRate(),
  ]);
  return { selic, cdi, ipca };
}

/**
  * Fetch brazilian selic, cdi and ipca rates apy in array
  *
  * @returns {Promise<RatesList[]>} Promise rates in array
  */
export async function getRatesList(): Promise<RatesList[]> {
  const { selic, cdi, ipca } = await getRatesObject();
  return [
    { name: SELIC, apy: selic },
    { name: CDI, apy: cdi },
    { name: IPCA, apy: ipca },
  ];
}

/**
  * Fetch brazilian selic rate
  *
  * @returns {Promise<number>} Selic rate
  */
export async function getSelicRate(): Promise<number> {
  const selic = await fetchCurrentSelic();
  return selic;
}

/**
  * Fetch brazilian ipca rate
  *
  * @returns {Promise<number>} IPCA rate
  */
 export async function getIpcaRate(): Promise<number> {
  const ipca = await fetchCurrentIpca();
  return ipca;
}

/**
  * Fetch brazilian cdi rate
  *
  * @returns {Promise<number>} CDI rate
  */
export async function getCdiRate(): Promise<number> {
  const cdi = await fetchCurrentCdi();
  return cdi;
}
