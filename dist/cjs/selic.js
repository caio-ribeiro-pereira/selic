"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCdiRate = exports.getIpcaRate = exports.getSelicRate = exports.getRatesList = exports.getRatesObject = void 0;
const bcb_1 = require("./bcb");
const cetip_1 = require("./cetip");
const constants_1 = require("./constants");
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
        { name: constants_1.SELIC, apy: selic },
        { name: constants_1.CDI, apy: cdi },
        { name: constants_1.IPCA, apy: ipca },
    ];
}
exports.getRatesList = getRatesList;
/**
  * Fetch brazilian selic rate
  *
  * @returns {Promise<number>} Selic rate
  */
async function getSelicRate() {
    const selic = await (0, bcb_1.fetchCurrentSelic)();
    return selic;
}
exports.getSelicRate = getSelicRate;
/**
  * Fetch brazilian ipca rate
  *
  * @returns {Promise<number>} IPCA rate
  */
async function getIpcaRate() {
    const ipca = await (0, bcb_1.fetchCurrentIpca)();
    return ipca;
}
exports.getIpcaRate = getIpcaRate;
/**
  * Fetch brazilian cdi rate
  *
  * @returns {Promise<number>} CDI rate
  */
async function getCdiRate() {
    const cdi = await (0, cetip_1.fetchCurrentCdi)();
    return cdi;
}
exports.getCdiRate = getCdiRate;
//# sourceMappingURL=selic.js.map