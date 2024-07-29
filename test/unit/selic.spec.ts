import * as nock from 'nock'
import {
  SELIC, CDI, IPCA,
  BCB_API, BCB_SELIC_PATH, BCB_IPCA_PATH,
  B3_API, B3_PATH
} from '../../src/constants.js'
import {
  getRatesObject, getRatesList,
  getSelicRate, getCdiRate, getIpcaRate
} from '../../src/selic.js'

let bcbSelicNock;
let bcbIpcaNock;
let b3CdiNock;

describe('unit/selic', () => {
  beforeEach(() => {
    bcbSelicNock = nock(BCB_API).get(BCB_SELIC_PATH);
    bcbIpcaNock = nock(BCB_API).get(BCB_IPCA_PATH);
    b3CdiNock = nock(B3_API).get(B3_PATH);
  });

  afterEach(() => {
    bcbSelicNock = null;
    b3CdiNock = null;
  });

  describe('.getRatesObject', () => {
    test('returns the selic, poupanca and cdi rates', async () => {
      const fakeSelic = 10.11;
      const fakeCdi = 11.11;
      const fakeIpca = 11.11;
      const fakeDataSelic = JSON.stringify({ conteudo: [{ MetaSelic: fakeSelic }]});
      const fakeDataCdi = JSON.stringify([{ rate: `${fakeCdi}`.replace('.', ','), description: 'TAXA CDI CETIP' }]);
      const fakeDataIpca = JSON.stringify({ conteudo: [{ taxaInflacao: fakeIpca }]});

      bcbSelicNock.reply(200, fakeDataSelic);
      bcbIpcaNock.reply(200, fakeDataIpca);
      b3CdiNock.reply(200, fakeDataCdi);

      const rates = await getRatesObject();
      const expectedSelic = fakeSelic;
      const expectedCdi = fakeCdi;
      const expectedIpca = fakeIpca;

      expect(rates).toStrictEqual({ selic: expectedSelic, cdi: expectedCdi, ipca: expectedIpca });
    });

    test('raises error when bcb and b3 scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      bcbSelicNock.reply(200, fakeData);
      bcbIpcaNock.reply(200, fakeData);
      b3CdiNock.reply(200, fakeData);

      const error = async () => await getRatesObject();
      await expect(error()).rejects.toThrow('Parse error');
    });

    test('raises error when bcb and b3 scraps fail', async () => {
      bcbSelicNock.replyWithError('Api fails');
      bcbIpcaNock.replyWithError('Api fails');
      b3CdiNock.replyWithError('Api fails');

      const error = async () => await getRatesObject();
      return expect(error()).rejects.toThrow('Request error');
    });
  });

  describe('.getRatesList', () => {
    test('returns the selic, poupanca and cdi rates', async () => {
      const fakeSelic = 10.11;
      const fakeCdi = 11.11;
      const fakeIpca = 13.44;
      const fakeDataSelic = JSON.stringify({ conteudo: [{ MetaSelic: fakeSelic }]});
      const fakeDataCdi = JSON.stringify([{ rate: `${fakeCdi}`.replace('.', ','), description: 'TAXA CDI CETIP' }]);
      const fakeDataIpca = JSON.stringify({ conteudo: [{ taxaInflacao: fakeIpca }]});

      bcbSelicNock.reply(200, fakeDataSelic);
      bcbIpcaNock.reply(200, fakeDataIpca);
      b3CdiNock.reply(200, fakeDataCdi);

      const rates = await getRatesList();
      const expectedSelic = fakeSelic;
      const expectedCdi = fakeCdi;
      const expectedIpca = fakeIpca;

      expect(rates[0]).toStrictEqual({ name: SELIC, apy: expectedSelic });
      expect(rates[1]).toStrictEqual({ name: CDI, apy: expectedCdi });
      expect(rates[2]).toStrictEqual({ name: IPCA, apy: expectedIpca });
    });

    test('raises error when bcb and b3 scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      bcbSelicNock.reply(200, fakeData);
      bcbIpcaNock.reply(200, fakeData);
      b3CdiNock.reply(200, fakeData);

      const error = async () => await getRatesList();
      return expect(error()).rejects.toThrow('Parse error');
    });

    test('raises error when bcb and b3 scraps fail', async () => {
      bcbSelicNock.replyWithError('Api fails');
      bcbIpcaNock.replyWithError('Api fails');
      b3CdiNock.replyWithError('Api fails');

      const error = async () => await getRatesList();
      return expect(error()).rejects.toThrow('Request error');
    });
  });

  describe('.getSelicRate', () => {
    test('returns the selic rates when bcb scraps succeed', async () => {
      const fakeSelic = 10.11;
      const fakeData = JSON.stringify({ conteudo: [{ MetaSelic: fakeSelic }]})

      bcbSelicNock.reply(200, fakeData);

      const value = await getSelicRate();
      const expected = fakeSelic;

      expect(value).toBe(expected);
    });

    test('raises error when bcb scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      bcbSelicNock.reply(200, fakeData);
      return expect(getSelicRate()).rejects.toThrow('Parse error');
    });

    test('raises error when bcb scraps fail', async () => {
      bcbSelicNock.replyWithError('Api fails');
      return expect(getSelicRate()).rejects.toThrow('Request error');
    });
  });

  describe('.getIpcaRate', () => {
    test('returns the ipca rate when bcb scraps succeed', async () => {
      const fakeIpca = 13.11;
      const fakeData = JSON.stringify({ conteudo: [{ taxaInflacao: fakeIpca }]})

      bcbIpcaNock.reply(200, fakeData);

      const value = await getIpcaRate();
      const expected = fakeIpca;

      expect(value).toBe(expected);
    });

    test('raises error when bcb scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      bcbIpcaNock.reply(200, fakeData);

      return expect(getIpcaRate()).rejects.toThrow('Parse error');
    });

    test('raises error when bcb scraps fail', async () => {
      bcbIpcaNock.replyWithError('Api fails');

      return expect(getIpcaRate()).rejects.toThrow('Request error');
    });
  });

  describe('.getCdiRate', () => {
    test('returns the cdi rates when b3 scraps succeed', async () => {
      const fakeCdi = 9.11;
      const fakeData = JSON.stringify([{ rate: `${fakeCdi}`.replace('.', ','), description: 'TAXA CDI CETIP' }]);

      b3CdiNock.reply(200, fakeData);

      const value = await getCdiRate();
      const expected = fakeCdi;

      expect(value).toBe(expected);
    });

    test('raises error when b3 scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      b3CdiNock.reply(200, fakeData);

      return expect(getCdiRate()).rejects.toThrow('Parse error');
    });

    test('raises error when b3 scraps fail', async () => {
      b3CdiNock.replyWithError('Api fails');

      return expect(getCdiRate()).rejects.toThrow('Request error');
    });
  });
});
