import * as nock from 'nock'
import { BCB_API, BCB_SELIC_PATH, CDI_SCORE, POUPANCA_PERCENT } from '../src/constants'
import { Selic } from '../src/selic'

describe('Selic', () => {
  describe('.getAllRates', () => {
    test('returns the selic, poupanca and cdi rates using custom options', async () => {
      const fakeSelic = 10.1;
      const fakeData = JSON.stringify([{ valor: fakeSelic }]);

      nock(BCB_API).get(BCB_SELIC_PATH).reply(200, fakeData);

      const cdiScore = 0;
      const poupancaPercent = 100;
      const expectedValue = fakeSelic;
      const selic = new Selic(cdiScore, poupancaPercent);
      const rates = await selic.getAllRates();

      expect(rates.selic).toBe(expectedValue);
      expect(rates.CDI).toBe(expectedValue);
      expect(rates.poupanca).toBe(expectedValue);
    });

    test('returns the selic, poupanca and cdi rates using default options', async () => {
      const fakeSelic = 10.1;
      const fakeData = JSON.stringify([{ valor: fakeSelic }]);

      nock(BCB_API).get(BCB_SELIC_PATH).reply(200, fakeData);

      const expectedSelic = Number(Number(fakeSelic).toFixed(2));
      const expectedCdi = Number(Number(fakeSelic - CDI_SCORE).toFixed(2));
      const expectedPoupanca = Number(Number((fakeSelic / 100) * POUPANCA_PERCENT).toFixed(2));

      const selic = new Selic();
      const rates = await selic.getAllRates();

      expect(rates.selic).toBe(expectedSelic);
      expect(rates.CDI).toBe(expectedCdi);
      expect(rates.poupanca).toBe(expectedPoupanca);
    });

    test('raises error when bcb scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      nock(BCB_API).get(BCB_SELIC_PATH).reply(200, fakeData);

      const selic = new Selic();

      await expect(selic.getAllRates()).rejects.toThrow('Parse error');
    });

    test('raises error when bcb scraps fail', async () => {
      nock(BCB_API).get(BCB_SELIC_PATH).replyWithError('Api fails');

      const selic = new Selic();

      await expect(selic.getAllRates()).rejects.toThrow('Request error');
    });
  });

  describe('.getSelicRate', () => {
    test('returns the selic rates when bcb scraps succeed', async () => {
      const fakeSelic = 10.1111;
      const fakeData = JSON.stringify([{ valor: fakeSelic }]);

      nock(BCB_API).get(BCB_SELIC_PATH).reply(200, fakeData);

      const selic = new Selic();

      const value = await selic.getSelicRate();
      const expected = Number(Number(fakeSelic).toFixed(2));
      expect(value).toBe(expected);
    });

    test('raises error when bcb scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      nock(BCB_API).get(BCB_SELIC_PATH).reply(200, fakeData);

      const selic = new Selic();

      await expect(selic.getSelicRate()).rejects.toThrow('Parse error');
    });

    test('raises error when bcb scraps fail', async () => {
      nock(BCB_API).get(BCB_SELIC_PATH).replyWithError('Api fails');

      const selic = new Selic();

      await expect(selic.getSelicRate()).rejects.toThrow('Request error');
    });
  });

  describe('.getCdiRate', () => {
    test('returns the selic rates when bcb scraps succeed', async () => {
      const fakeSelic = 10.1111;
      const fakeData = JSON.stringify([{ valor: fakeSelic }]);

      nock(BCB_API).get(BCB_SELIC_PATH).reply(200, fakeData);

      const selic = new Selic();

      const value = await selic.getCdiRate();
      const expected = Number(Number(fakeSelic - CDI_SCORE).toFixed(2));
      expect(value).toBe(expected);
    });

    test('raises error when bcb scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      nock(BCB_API).get(BCB_SELIC_PATH).reply(200, fakeData);

      const selic = new Selic();

      await expect(selic.getCdiRate()).rejects.toThrow('Parse error');
    });

    test('raises error when bcb scraps fail', async () => {
      nock(BCB_API).get(BCB_SELIC_PATH).replyWithError('Api fails');

      const selic = new Selic();

      await expect(selic.getCdiRate()).rejects.toThrow('Request error');
    });
  });

  describe('.getPoupancaRate', () => {
    test('returns the selic rates when bcb scraps succeed', async () => {
      const fakeSelic = 10.1111;
      const fakeData = JSON.stringify([{ valor: fakeSelic }]);

      nock(BCB_API).get(BCB_SELIC_PATH).reply(200, fakeData);

      const selic = new Selic();

      const value = await selic.getPoupancaRate();
      const expected = Number(Number((fakeSelic / 100) * POUPANCA_PERCENT).toFixed(2));
      expect(value).toBe(expected);
    });

    test('raises error when bcb scraps parse fail', async () => {
      const fakeData = '<>INVALID</>';

      nock(BCB_API).get(BCB_SELIC_PATH).reply(200, fakeData);

      const selic = new Selic();

      await expect(selic.getPoupancaRate()).rejects.toThrow('Parse error');
    });

    test('raises error when bcb scraps fail', async () => {
      nock(BCB_API).get(BCB_SELIC_PATH).replyWithError('Api fails');

      const selic = new Selic();

      await expect(selic.getPoupancaRate()).rejects.toThrow('Request error');
    });
  });
});
