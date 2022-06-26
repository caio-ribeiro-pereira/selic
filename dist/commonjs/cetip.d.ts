/**
 * Fetch cdi value from CETIP
 * @returns {Promise<number | never>} current cdi value in apy
 *
 * @throws {Error}
 * This exception is thrown if is not possible to parse response body
 * or occurred error on request
 */
export declare function fetchCurrentCdi(): Promise<number | never>;
