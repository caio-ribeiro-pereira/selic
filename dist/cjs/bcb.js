"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCurrentIpca = exports.fetchCurrentSelic = void 0;
const fetcher_1 = require("./fetcher");
const constants_1 = require("./constants");
/**
 * Fetch selic value from Banco Central do Brasil
 * @returns {Promise<number | never>} current selic value in apy
 *
 * @throws {Error}
 * This exception is thrown if is not possible to parse response body
 * or occurred error on request
 */
async function fetchCurrentSelic() {
    try {
        const url = `${constants_1.BCB_API}${constants_1.BCB_SELIC_PATH}`;
        const options = { headers: constants_1.HEADERS };
        const data = await (0, fetcher_1.get)(url, options);
        const { MetaSelic } = data.conteudo[0];
        return Number(Number(MetaSelic).toFixed(2));
    }
    catch (err) {
        throw err;
    }
}
exports.fetchCurrentSelic = fetchCurrentSelic;
/**
 * Fetch ipca value from Banco Central do Brasil
 * @returns {Promise<number | never>} current ipca value in apy
 *
 * @throws {Error}
 * This exception is thrown if is not possible to parse response body
 * or occurred error on request
 */
async function fetchCurrentIpca() {
    try {
        const url = `${constants_1.BCB_API}${constants_1.BCB_IPCA_PATH}`;
        const options = { headers: constants_1.HEADERS };
        const data = await (0, fetcher_1.get)(url, options);
        const { taxaInflacao } = data.conteudo[0];
        return Number(Number(taxaInflacao).toFixed(2));
    }
    catch (err) {
        throw err;
    }
}
exports.fetchCurrentIpca = fetchCurrentIpca;
//# sourceMappingURL=bcb.js.map