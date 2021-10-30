import * as nock from 'nock'
import { BCB_API, BCB_SELIC_PATH, CDI_SCORE, POUPANCA_PERCENT } from '../src/constants'
import { Selic } from '../src/selic'

describe('Selic', () => {
  describe('.scrapRates', () => {
    test('returns the selic, poupanca and cdi rates using custom options', async () => {
      const fakeSelic = 10.1;
      const fakeData = JSON.stringify([{ valor: fakeSelic }]);

      nock(BCB_API).get(BCB_SELIC_PATH).reply(200, fakeData);
      
      const cdiScore = 0;
      const poupancaPercent = 100;
      const expectedValue = fakeSelic;
      const selic = new Selic(cdiScore, poupancaPercent);
      const rates = await selic.getAllRates();

      expect(rates[0].name).toBe('Selic');
      expect(rates[0].apy).toBe(expectedValue);
      expect(rates[1].name).toBe('CDI');
      expect(rates[1].apy).toBe(expectedValue);
      expect(rates[2].name).toBe('Poupança');
      expect(rates[2].apy).toBe(expectedValue);
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
      expect(rates[0].name).toBe('Selic');
      expect(rates[0].apy).toBe(expectedSelic);
      expect(rates[1].name).toBe('CDI');
      expect(rates[1].apy).toBe(expectedCdi);
      expect(rates[2].name).toBe('Poupança');
      expect(rates[2].apy).toBe(expectedPoupanca);
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

  describe('.calculateCdiFromSelic', () => {
    test('returns the cdi rates using default options.cdiScore', () => {
      const selicValue = 11.1;
      const selic = new Selic();

      const cdi = selic.calculateCdiFromSelic(selicValue);
      const expected = Number(Number(selicValue - CDI_SCORE).toFixed(2));
      
      expect(cdi).toBe(expected);
    });

    test('returns the cdi rates using custom options.cdiScore', () => {
      const selicValue = 11.1;
      const cdiScore = 0.2;
      const selic = new Selic(cdiScore);

      const cdi = selic.calculateCdiFromSelic(selicValue);
      const expected = Number(Number(selicValue - cdiScore).toFixed(2));
      
      expect(cdi).toBe(expected);
    });
  });

  describe('.calculatePoupancaFromSelic', () => {
    test('returns the poupanca rates using default options.poupancaPercent', () => {
      const selicValue = 11.1;
      const selic = new Selic();

      const poupanca = selic.calculatePoupancaFromSelic(selicValue);
      const expected = Number(Number((selicValue / 100) * POUPANCA_PERCENT).toFixed(2));
      
      expect(poupanca).toBe(expected);
    });

    test('returns the poupanca rates using custom options.poupancaPercent', () => {
      const selicValue = 11.1;
      const poupancaPercent = 50;
      const selic = new Selic(CDI_SCORE, poupancaPercent);

      const poupanca = selic.calculatePoupancaFromSelic(selicValue);
      const expected = Number(Number((selicValue / 100) * poupancaPercent).toFixed(2));
      
      expect(poupanca).toBe(expected);
    });
  });
});
