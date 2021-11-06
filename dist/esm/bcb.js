import { get } from './fetcher';
import { BCB_API, BCB_SELIC_PATH, BCB_IPCA_PATH, HEADERS } from './constants';
/**
 * Fetch selic value from Banco Central do Brasil
 * @returns {Promise<number | never>} current selic value in apy
 *
 * @throws {Error}
 * This exception is thrown if is not possible to parse response body
 * or occurred error on request
 */
export async function fetchCurrentSelic() {
    try {
        const url = `${BCB_API}${BCB_SELIC_PATH}`;
        const options = { headers: HEADERS };
        const data = await get(url, options);
        const { MetaSelic } = data.conteudo[0];
        return Number(Number(MetaSelic).toFixed(2));
    }
    catch (err) {
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
export async function fetchCurrentIpca() {
    try {
        const url = `${BCB_API}${BCB_IPCA_PATH}`;
        const options = { headers: HEADERS };
        const data = await get(url, options);
        const { taxaInflacao } = data.conteudo[0];
        return Number(Number(taxaInflacao).toFixed(2));
    }
    catch (err) {
        throw err;
    }
}
//# sourceMappingURL=bcb.js.map