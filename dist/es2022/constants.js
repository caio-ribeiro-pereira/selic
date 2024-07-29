export const SELIC = 'Selic';
export const IPCA = 'IPCA';
export const CDI = 'CDI';
export const BCB_HOST = 'www.bcb.gov.br';
export const BCB_API = `https://${BCB_HOST}`;
export const BCB_SELIC_PATH = '/api/servico/sitebcb/historicotaxasjuros';
export const BCB_IPCA_PATH = '/api/servico/sitebcb/indicadorinflacao';
export const B3_HOST = 'sistemaswebb3-derivativos.b3.com.br';
export const B3_API = `https://${B3_HOST}`;
export const B3_PATH = '/financialIndicatorsProxy/FinancialIndicators/GetFinancialIndicators/eyJsYW5ndWFnZSI6InB0LWJyIn0=';
export const BCB_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
};
export const B3_HEADERS = {
    Accept: '*/*',
    'Content-Type': 'text/plain',
    'Upgrade-Insecure-Requests': '1',
    Connection: 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
};
//# sourceMappingURL=constants.js.map