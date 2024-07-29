"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B3_HEADERS = exports.BCB_HEADERS = exports.B3_PATH = exports.B3_API = exports.B3_HOST = exports.BCB_IPCA_PATH = exports.BCB_SELIC_PATH = exports.BCB_API = exports.BCB_HOST = exports.CDI = exports.IPCA = exports.SELIC = void 0;
exports.SELIC = 'Selic';
exports.IPCA = 'IPCA';
exports.CDI = 'CDI';
exports.BCB_HOST = 'www.bcb.gov.br';
exports.BCB_API = `https://${exports.BCB_HOST}`;
exports.BCB_SELIC_PATH = '/api/servico/sitebcb/historicotaxasjuros';
exports.BCB_IPCA_PATH = '/api/servico/sitebcb/indicadorinflacao';
exports.B3_HOST = 'sistemaswebb3-derivativos.b3.com.br';
exports.B3_API = `https://${exports.B3_HOST}`;
exports.B3_PATH = '/financialIndicatorsProxy/FinancialIndicators/GetFinancialIndicators/eyJsYW5ndWFnZSI6InB0LWJyIn0=';
exports.BCB_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
};
exports.B3_HEADERS = {
    Accept: '*/*',
    'Content-Type': 'text/plain',
    'Upgrade-Insecure-Requests': '1',
    Connection: 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
};
//# sourceMappingURL=constants.js.map