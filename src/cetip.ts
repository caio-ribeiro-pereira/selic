import { get } from './fetcher'
import { CETIP_HOST, CETIP_CDI_PATH } from './constants'

/**
 * Fetch cdi value from CETIP
 * @returns {Promise<number | never>} current cdi value in apy
 *
 * @throws {Error}
 * This exception is thrown if is not possible to parse response body
 * or occurred error on request
 */
export async function fetchCurrentCdi(): Promise<number | never>{
  try {
    const options = {
      hostname: CETIP_HOST,
      path: CETIP_CDI_PATH,
      port: 443,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    };
    const data = await get(options);
    const cdi = Number(data.taxa.replaceAll('.', '').replace(',', '.'));
    return cdi;
  } catch (err) {
    throw err;
  }
}
