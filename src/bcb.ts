import { get } from './fetcher'
import { BCB_HOST, BCB_SELIC_PATH } from './constants'

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
    const selicString = Number(data.conteudo[0].MetaSelic);
    const selic = Number(Number(selicString).toFixed(2));
    return selic;
  } catch (err) {
    throw err;
  }
}
