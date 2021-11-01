import * as nock from 'nock'
import {
  BCB_API, BCB_SELIC_PATH,
  CETIP_API, CETIP_CDI_PATH
} from '../src/constants'
import {
  getRatesObject, getRatesList,
  getSelicRate, getCdiRate,
} from '../src/selic'

let bcbNock;
let cetipNock;

describe('Selic', () => {
  beforeEach(() => {
    bcbNock = nock(BCB_API).get(BCB_SELIC_PATH);
    cetipNock = nock(CETIP_API).get(CETIP_CDI_PATH);
  });

  afterEach(() => {
    bcbNock = null;
    cetipNock = null;
  });

  describe('.getRatesObject', () => {
    test('returns the selic, poupanca and cdi rates', async () => {
      const fakeSelic = 10.11;
      const fakeCdi = 11.11;
      const fakeDataSelic = JSON.stringify({ conteudo: [{ MetaSelic: fakeSelic }]})
      const fakeDataCdi = JSON.stringify({ taxa: fakeCdi.toString().replace('.', ',') });

      bcbNock.reply(200, fakeDataSelic);
      cetipNock.reply(200, fakeDataCdi);

      const rates = await getRatesObject();
      const expectedSelic = fakeSelic;
      const expectedCdi = fakeCdi;

      expect(rates).toStrictEqual({ selic: expectedSelic, cdi: expectedCdi });
    });

    test('raises error when bcb and cetip scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      bcbNock.reply(200, fakeData);
      cetipNock.reply(200, fakeData);

      await expect(getRatesObject()).rejects.toThrow('Parse error');
    });

    test('raises error when bcb and cetip scraps fail', async () => {
      bcbNock.replyWithError('Api fails');
      cetipNock.replyWithError('Api fails');

      await expect(getRatesObject()).rejects.toThrow('Request error');
    });
  });

  describe('.getRatesList', () => {
    test('returns the selic, poupanca and cdi rates', async () => {
      const fakeSelic = 10.11;
      const fakeCdi = 11.11;
      const fakeDataSelic = JSON.stringify({ conteudo: [{ MetaSelic: fakeSelic }]})
      const fakeDataCdi = JSON.stringify({ taxa: fakeCdi.toString().replace('.', ',') });

      bcbNock.reply(200, fakeDataSelic);
      cetipNock.reply(200, fakeDataCdi);

      const rates = await getRatesList();
      const expectedSelic = fakeSelic;
      const expectedCdi = fakeCdi;

      expect(rates[0]).toStrictEqual({ name: 'Selic', apy: expectedSelic });
      expect(rates[1]).toStrictEqual({ name: 'CDI', apy: expectedCdi });
    });

    test('raises error when bcb and cetip scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      bcbNock.reply(200, fakeData);
      cetipNock.reply(200, fakeData);

      await expect(getRatesList()).rejects.toThrow('Parse error');
    });

    test('raises error when bcb and cetip scraps fail', async () => {
      bcbNock.replyWithError('Api fails');
      cetipNock.replyWithError('Api fails');

      await expect(getRatesList()).rejects.toThrow('Request error');
    });
  });

  describe('.getSelicRate', () => {
    test('returns the selic rates when bcb scraps succeed', async () => {
      const fakeSelic = 10.11;
      const fakeData = JSON.stringify({ conteudo: [{ MetaSelic: fakeSelic }]})

      bcbNock.reply(200, fakeData);

      const value = await getSelicRate();
      const expected = fakeSelic;

      expect(value).toBe(expected);
    });

    test('raises error when bcb scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      bcbNock.reply(200, fakeData);

      await expect(getSelicRate()).rejects.toThrow('Parse error');
    });

    test('raises error when bcb scraps fail', async () => {
      bcbNock.replyWithError('Api fails');

      await expect(getSelicRate()).rejects.toThrow('Request error');
    });
  });

  describe('.getCdiRate', () => {
    test('returns the cdi rates when cetip scraps succeed', async () => {
      const fakeCdi = 9.11;
      const fakeData = JSON.stringify({ taxa: fakeCdi.toString().replace('.', ',') });

      cetipNock.reply(200, fakeData);

      const value = await getCdiRate();
      const expected = fakeCdi;

      expect(value).toBe(expected);
    });

    test('raises error when cetip scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      cetipNock.reply(200, fakeData);

      await expect(getCdiRate()).rejects.toThrow('Parse error');
    });

    test('raises error when cetip scraps fail', async () => {
      cetipNock.replyWithError('Api fails');

      await expect(getCdiRate()).rejects.toThrow('Request error');
    });
  });
});
