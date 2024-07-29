import * as nock from 'nock'
import { fetchCurrentCdi } from '../../src/b3.js'
import { B3_API, B3_PATH } from '../../src/constants.js'

let b3Nock;

describe('unit/b3', () => {
  beforeEach(() => {
    b3Nock = nock(B3_API).get(B3_PATH);
  });

  afterEach(() => {
    b3Nock = null;
  });

  describe('.fetchCurrentCdi', () => {
    test('returns cdi value when request succeed', async () => {
      const fakeCdi = 10.1;
      const fakeData = JSON.stringify([{ rate: `${fakeCdi}`.replace('.', ','), description: 'TAXA CDI CETIP' }]);

      b3Nock.reply(200, fakeData);

      const cdi = await fetchCurrentCdi();
      expect(cdi).toBe(fakeCdi);
    });

    it('raises "Parse error" when request succeed but response is empty', async () => {
      const fakeData = '';

      b3Nock.reply(200, fakeData);

      return expect(fetchCurrentCdi()).rejects.toThrow('Parse error');
    });

    it('raises "Parse error" when request succeed but response is invalid json', async () => {
      const fakeData = '<>INVALID</>';

      b3Nock.reply(200, fakeData);

      return expect(fetchCurrentCdi()).rejects.toThrow('Parse error');
    });

    it('raises "Request error" when request fails', async () => {
      b3Nock.replyWithError('Api fails');

      return expect(fetchCurrentCdi()).rejects.toThrow('Request error');
    });
  });
});
