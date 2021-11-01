import * as nock from 'nock'
import {
  SELIC, CDI, IPCA,
  BCB_API, BCB_SELIC_PATH, BCB_IPCA_PATH,
  CETIP_API, CETIP_CDI_PATH
} from '../src/constants'
import {
  getRatesObject, getRatesList,
  getSelicRate, getCdiRate, getIpcaRate
} from '../src/selic'

let bcbSelicNock;
let bcbIpcaNock;
let cetipCdiNock;

describe('Selic', () => {
  beforeEach(() => {
    bcbSelicNock = nock(BCB_API).get(BCB_SELIC_PATH);
    bcbIpcaNock = nock(BCB_API).get(BCB_IPCA_PATH);
    cetipCdiNock = nock(CETIP_API).get(CETIP_CDI_PATH);
  });

  afterEach(() => {
    bcbSelicNock = null;
    cetipCdiNock = null;
  });

  describe('.getRatesObject', () => {
    test('returns the selic, poupanca and cdi rates', async () => {
      const fakeSelic = 10.11;
      const fakeCdi = 11.11;
      const fakeIpca = 11.11;
      const fakeDataSelic = JSON.stringify({ conteudo: [{ MetaSelic: fakeSelic }]});
      const fakeDataCdi = JSON.stringify({ taxa: fakeCdi.toString().replace('.', ',') });
      const fakeDataIpca = JSON.stringify({ conteudo: [{ taxaInflacao: fakeIpca }]});

      bcbSelicNock.reply(200, fakeDataSelic);
      bcbIpcaNock.reply(200, fakeDataIpca);
      cetipCdiNock.reply(200, fakeDataCdi);

      const rates = await getRatesObject();
      const expectedSelic = fakeSelic;
      const expectedCdi = fakeCdi;
      const expectedIpca = fakeIpca;

      expect(rates).toStrictEqual({ selic: expectedSelic, cdi: expectedCdi, ipca: expectedIpca });
    });

    test('raises error when bcb and cetip scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      bcbSelicNock.reply(200, fakeData);
      bcbIpcaNock.reply(200, fakeData);
      cetipCdiNock.reply(200, fakeData);

      await expect(getRatesObject()).rejects.toThrow('Parse error');
    });

    test('raises error when bcb and cetip scraps fail', async () => {
      bcbSelicNock.replyWithError('Api fails');
      bcbIpcaNock.replyWithError('Api fails');
      cetipCdiNock.replyWithError('Api fails');

      await expect(getRatesObject()).rejects.toThrow('Request error');
    });
  });

  describe('.getRatesList', () => {
    test('returns the selic, poupanca and cdi rates', async () => {
      const fakeSelic = 10.11;
      const fakeCdi = 11.11;
      const fakeIpca = 13.44;
      const fakeDataSelic = JSON.stringify({ conteudo: [{ MetaSelic: fakeSelic }]});
      const fakeDataCdi = JSON.stringify({ taxa: fakeCdi.toString().replace('.', ',') });
      const fakeDataIpca = JSON.stringify({ conteudo: [{ taxaInflacao: fakeIpca }]});

      bcbSelicNock.reply(200, fakeDataSelic);
      bcbIpcaNock.reply(200, fakeDataIpca);
      cetipCdiNock.reply(200, fakeDataCdi);

      const rates = await getRatesList();
      const expectedSelic = fakeSelic;
      const expectedCdi = fakeCdi;
      const expectedIpca = fakeIpca;

      expect(rates[0]).toStrictEqual({ name: SELIC, apy: expectedSelic });
      expect(rates[1]).toStrictEqual({ name: CDI, apy: expectedCdi });
      expect(rates[2]).toStrictEqual({ name: IPCA, apy: expectedIpca });
    });

    test('raises error when bcb and cetip scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      bcbSelicNock.reply(200, fakeData);
      bcbIpcaNock.reply(200, fakeData);
      cetipCdiNock.reply(200, fakeData);

      await expect(getRatesList()).rejects.toThrow('Parse error');
    });

    test('raises error when bcb and cetip scraps fail', async () => {
      bcbSelicNock.replyWithError('Api fails');
      bcbIpcaNock.replyWithError('Api fails');
      cetipCdiNock.replyWithError('Api fails');

      await expect(getRatesList()).rejects.toThrow('Request error');
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

      await expect(getSelicRate()).rejects.toThrow('Parse error');
    });

    test('raises error when bcb scraps fail', async () => {
      bcbSelicNock.replyWithError('Api fails');

      await expect(getSelicRate()).rejects.toThrow('Request error');
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

      await expect(getIpcaRate()).rejects.toThrow('Parse error');
    });

    test('raises error when bcb scraps fail', async () => {
      bcbIpcaNock.replyWithError('Api fails');

      await expect(getIpcaRate()).rejects.toThrow('Request error');
    });
  });

  describe('.getCdiRate', () => {
    test('returns the cdi rates when cetip scraps succeed', async () => {
      const fakeCdi = 9.11;
      const fakeData = JSON.stringify({ taxa: fakeCdi.toString().replace('.', ',') });

      cetipCdiNock.reply(200, fakeData);

      const value = await getCdiRate();
      const expected = fakeCdi;

      expect(value).toBe(expected);
    });

    test('raises error when cetip scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      cetipCdiNock.reply(200, fakeData);

      await expect(getCdiRate()).rejects.toThrow('Parse error');
    });

    test('raises error when cetip scraps fail', async () => {
      cetipCdiNock.replyWithError('Api fails');

      await expect(getCdiRate()).rejects.toThrow('Request error');
    });
  });
});
