"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCurrentCdi = void 0;
const fetcher_1 = require("./fetcher");
const constants_1 = require("./constants");
/**
 * Fetch cdi value from CETIP
 * @returns {Promise<number | never>} current cdi value in apy
 *
 * @throws {Error}
 * This exception is thrown if is not possible to parse response body
 * or occurred error on request
 */
async function fetchCurrentCdi() {
    try {
        const url = `${constants_1.CETIP_API}${constants_1.CETIP_CDI_PATH}`;
        const options = { headers: constants_1.HEADERS };
        const data = await (0, fetcher_1.get)(url, options);
        const cdiString = data.taxa.replace(/[.]/g, '').replace(',', '.');
        const cdi = Number(Number(cdiString).toFixed(2));
        return cdi;
    }
    catch (err) {
        throw err;
    }
}
exports.fetchCurrentCdi = fetchCurrentCdi;
//# sourceMappingURL=cetip.js.map