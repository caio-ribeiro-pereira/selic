import { get } from './fetcher'
import { BCB_HOST, BCB_SELIC_PATH, BCB_IPCA_PATH } from './constants'

/**
 * Fetch selic value from Banco Central do Brasil
 * @returns {Promise<number | never>} current selic value in apy
 *
 * @throws {Error}
 * This exception is thrown if is not possible to parse response body
 * or occurred error on request
 */
export async function fetchCurrentSelic(): Promise<number | never>{
  try {
    const options = {
      hostname: BCB_HOST,
      path: BCB_SELIC_PATH,
      port: 443,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    };
    const data = await get(options);
    const { MetaSelic } = data.conteudo[0];
    return Number(Number(MetaSelic).toFixed(2));
  } catch (err) {
    throw err;
  }
}

/**
 * Fetch ipca value from Banco Central do Brasil
 * @returns {Promise<number | never>} current ipca value in apy
 *
 * @throws {Error}
 * This exception is thrown if is not possible to parse response body
 * or occurred error on request
 */
export async function fetchCurrentIpca(): Promise<number | never>{
  try {
    const options = {
      hostname: BCB_HOST,
      path: BCB_IPCA_PATH,
      port: 443,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    };
    const data = await get(options);
    const { taxaInflacao } = data.conteudo[0];
    return Number(Number(taxaInflacao).toFixed(2));
  } catch (err) {
    throw err;
  }
}
