/**
 * Fetch selic value from Banco Central do Brasil
 * @returns {Promise<number | never>} current selic value in apy
 *
 * @throws {Error}
 * This exception is thrown if is not possible to parse response body
 * or occurred error on request
 */
export declare function fetchCurrentSelic(): Promise<number | never>;
/**
 * Fetch ipca value from Banco Central do Brasil
 * @returns {Promise<number | never>} current ipca value in apy
 *
 * @throws {Error}
 * This exception is thrown if is not possible to parse response body
 * or occurred error on request
 */
export declare function fetchCurrentIpca(): Promise<number | never>;
