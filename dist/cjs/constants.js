"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HEADERS = exports.CETIP_CDI_PATH = exports.CETIP_API = exports.CETIP_HOST = exports.BCB_IPCA_PATH = exports.BCB_SELIC_PATH = exports.BCB_API = exports.BCB_HOST = exports.CDI = exports.IPCA = exports.SELIC = void 0;
exports.SELIC = 'Selic';
exports.IPCA = 'IPCA';
exports.CDI = 'CDI';
exports.BCB_HOST = 'www.bcb.gov.br';
exports.BCB_API = `https://${exports.BCB_HOST}`;
exports.BCB_SELIC_PATH = '/api/servico/sitebcb/historicotaxasjuros';
exports.BCB_IPCA_PATH = '/api/servico/sitebcb/indicadorinflacao';
exports.CETIP_HOST = 'www2.cetip.com.br';
exports.CETIP_API = `https://${exports.CETIP_HOST}`;
exports.CETIP_CDI_PATH = '/ConsultarTaxaDi/ConsultarTaxaDICetip.aspx';
exports.HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
};
//# sourceMappingURL=constants.js.map