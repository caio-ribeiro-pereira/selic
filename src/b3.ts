import { B3_API, B3_PATH, B3_HEADERS } from './constants.js'
import { get } from './fetcher.js'

/**
 * Fetch cdi value from B3 api
 * @returns {Promise<number | never>} current cdi value in apy
 *
 * @throws {Error}
 * This exception is thrown if is not possible to parse response body
 * or occurred error on request
 */
export async function fetchCurrentCdi(): Promise<number | never>{
  try {
    const url = `${B3_API}${B3_PATH}`;
    const options = { headers: B3_HEADERS };
    const data = await get(url, options);
    const cdiData = data.find((item) => item.description === 'TAXA CDI CETIP');
    const cdiString = cdiData.rate.replace(/[.]/g, '').replace(',', '.');
    const cdi = Number(Number(cdiString).toFixed(2));
    return cdi;
  } catch (err) {
    throw err;
  }
}
