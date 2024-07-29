"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCdiRate = exports.getIpcaRate = exports.getSelicRate = exports.getRatesList = exports.getRatesObject = void 0;
const bcb_js_1 = require("./bcb.js");
const b3_js_1 = require("./b3.js");
const constants_js_1 = require("./constants.js");
/**
  * Fetch brazilian selic, cdi and ipca rates apy in object
  *
  * @returns {Promise<RatesObject>} Promise rates in object
  */
async function getRatesObject() {
    const [selic, cdi, ipca] = await Promise.all([
        getSelicRate(),
        getCdiRate(),
        getIpcaRate(),
    ]);
    return { selic, cdi, ipca };
}
exports.getRatesObject = getRatesObject;
/**
  * Fetch brazilian selic, cdi and ipca rates apy in array
  *
  * @returns {Promise<RatesList[]>} Promise rates in array
  */
async function getRatesList() {
    const { selic, cdi, ipca } = await getRatesObject();
    return [
        { name: constants_js_1.SELIC, apy: selic },
        { name: constants_js_1.CDI, apy: cdi },
        { name: constants_js_1.IPCA, apy: ipca },
    ];
}
exports.getRatesList = getRatesList;
/**
  * Fetch brazilian selic rate
  *
  * @returns {Promise<number>} Selic rate
  */
async function getSelicRate() {
    const selic = await (0, bcb_js_1.fetchCurrentSelic)();
    return selic;
}
exports.getSelicRate = getSelicRate;
/**
  * Fetch brazilian ipca rate
  *
  * @returns {Promise<number>} IPCA rate
  */
async function getIpcaRate() {
    const ipca = await (0, bcb_js_1.fetchCurrentIpca)();
    return ipca;
}
exports.getIpcaRate = getIpcaRate;
/**
  * Fetch brazilian cdi rate
  *
  * @returns {Promise<number>} CDI rate
  */
async function getCdiRate() {
    const cdi = await (0, b3_js_1.fetchCurrentCdi)();
    return cdi;
}
exports.getCdiRate = getCdiRate;
//# sourceMappingURL=selic.js.map