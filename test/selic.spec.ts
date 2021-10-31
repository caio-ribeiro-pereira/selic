import * as nock from 'nock'
import {
  BCB_API, BCB_SELIC_PATH,
  CETIP_API, CETIP_CDI_PATH,
  POUPANCA_PERCENT
} from '../src/constants'
import { Selic } from '../src/selic'

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

  describe('.getAllRates', () => {
    test('returns the selic, poupanca and cdi rates using custom options', async () => {
      const poupancaPercent = 80;
      const fakeSelic = 10.11;
      const fakeCdi = 11.11;
      const fakeDataSelic = JSON.stringify({ conteudo: [{ MetaSelic: fakeSelic }]});
      const fakeDataCdi = JSON.stringify({ taxa: fakeCdi.toString().replace('.', ',') });

      bcbNock.reply(200, fakeDataSelic);
      cetipNock.reply(200, fakeDataCdi);

      const expectedSelic = fakeSelic;
      const expectedCdi = fakeCdi;
      const expectedPoupanca = Number(Number((fakeSelic / 100) * poupancaPercent).toFixed(2));
      const selic = new Selic(poupancaPercent);
      const rates = await selic.getAllRates();

      expect(rates[0]).toStrictEqual({ name: 'Selic', apy: expectedSelic });
      expect(rates[1]).toStrictEqual({ name: 'CDI', apy: expectedCdi });
      expect(rates[2]).toStrictEqual({ name: 'Poupança', apy: expectedPoupanca });
    });

    test('returns the selic, poupanca and cdi rates using default options', async () => {
      const fakeSelic = 10.11;
      const fakeCdi = 11.11;
      const fakeDataSelic = JSON.stringify({ conteudo: [{ MetaSelic: fakeSelic }]})
      const fakeDataCdi = JSON.stringify({ taxa: fakeCdi.toString().replace('.', ',') });

      bcbNock.reply(200, fakeDataSelic);
      cetipNock.reply(200, fakeDataCdi);

      const expectedSelic = fakeSelic;
      const expectedCdi = fakeCdi;
      const expectedPoupanca = Number(Number((fakeSelic / 100) * POUPANCA_PERCENT).toFixed(2));

      const selic = new Selic();
      const rates = await selic.getAllRates();

      expect(rates[0]).toStrictEqual({ name: 'Selic', apy: expectedSelic });
      expect(rates[1]).toStrictEqual({ name: 'CDI', apy: expectedCdi });
      expect(rates[2]).toStrictEqual({ name: 'Poupança', apy: expectedPoupanca });
    });

    test('raises error when bcb and cetip scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      bcbNock.reply(200, fakeData);
      cetipNock.reply(200, fakeData);

      const selic = new Selic();

      await expect(selic.getAllRates()).rejects.toThrow('Parse error');
    });

    test('raises error when bcb and cetip scraps fail', async () => {
      bcbNock.replyWithError('Api fails');
      cetipNock.replyWithError('Api fails');

      const selic = new Selic();

      await expect(selic.getAllRates()).rejects.toThrow('Request error');
    });
  });

  describe('.getSelicRate', () => {
    test('returns the selic rates when bcb scraps succeed', async () => {
      const fakeSelic = 10.11;
      const fakeData = JSON.stringify({ conteudo: [{ MetaSelic: fakeSelic }]})

      bcbNock.reply(200, fakeData);

      const selic = new Selic();

      const value = await selic.getSelicRate();
      const expected = Number(Number(fakeSelic).toFixed(2));
      expect(value).toBe(expected);
    });

    test('raises error when bcb scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      bcbNock.reply(200, fakeData);

      const selic = new Selic();

      await expect(selic.getSelicRate()).rejects.toThrow('Parse error');
    });

    test('raises error when bcb scraps fail', async () => {
      bcbNock.replyWithError('Api fails');

      const selic = new Selic();

      await expect(selic.getSelicRate()).rejects.toThrow('Request error');
    });
  });

  describe('.getCdiRate', () => {
    test('returns the cdi rates when cetip scraps succeed', async () => {
      const fakeCdi = 9.11;
      const fakeData = JSON.stringify({ taxa: fakeCdi.toString().replace('.', ',') });

      cetipNock.reply(200, fakeData);

      const selic = new Selic();
      const value = await selic.getCdiRate();

      const expected = Number(Number(fakeCdi).toFixed(2));
      expect(value).toBe(expected);
    });

    test('raises error when cetip scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      cetipNock.reply(200, fakeData);

      const selic = new Selic();

      await expect(selic.getCdiRate()).rejects.toThrow('Parse error');
    });

    test('raises error when cetip scraps fail', async () => {
      cetipNock.replyWithError('Api fails');

      const selic = new Selic();

      await expect(selic.getCdiRate()).rejects.toThrow('Request error');
    });
  });

  describe('.getPoupancaRate', () => {
    test('returns the selic rates when bcb scraps succeed', async () => {
      const fakeSelic = 10.1111;
      const fakeData = JSON.stringify({ conteudo: [{ MetaSelic: fakeSelic }]})

      bcbNock.reply(200, fakeData);

      const selic = new Selic();

      const value = await selic.getPoupancaRate();
      const expected = Number(Number((fakeSelic / 100) * POUPANCA_PERCENT).toFixed(2));
      expect(value).toBe(expected);
    });

    test('raises error when bcb scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      bcbNock.reply(200, fakeData);

      const selic = new Selic();

      await expect(selic.getPoupancaRate()).rejects.toThrow('Parse error');
    });

    test('raises error when bcb scraps fail', async () => {
      bcbNock.replyWithError('Api fails');

      const selic = new Selic();

      await expect(selic.getPoupancaRate()).rejects.toThrow('Request error');
    });
  });
});
