import { fetchCurrentSelic, fetchCurrentIpca } from './bcb.js';
import { fetchCurrentCdi } from './cetip.js';
import { SELIC, CDI, IPCA } from './constants.js';
/**
  * Fetch brazilian selic, cdi and ipca rates apy in object
  *
  * @returns {Promise<RatesObject>} Promise rates in object
  */
export async function getRatesObject() {
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
export async function getRatesList() {
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
export async function getSelicRate() {
    const selic = await fetchCurrentSelic();
    return selic;
}
/**
  * Fetch brazilian ipca rate
  *
  * @returns {Promise<number>} IPCA rate
  */
export async function getIpcaRate() {
    const ipca = await fetchCurrentIpca();
    return ipca;
}
/**
  * Fetch brazilian cdi rate
  *
  * @returns {Promise<number>} CDI rate
  */
export async function getCdiRate() {
    const cdi = await fetchCurrentCdi();
    return cdi;
}
//# sourceMappingURL=selic.js.map