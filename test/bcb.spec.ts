import * as nock from 'nock'
import { BCB_API, BCB_SELIC_PATH } from '../src/constants'
import { fetchCurrentSelic } from '../src/bcb'

describe('bcb', () => {
  describe('.fetchCurrentSelic', () => {
    test('returns selic value when request succeed', async () => {
      const fakeSelic = 10.1;
      const fakeData = JSON.stringify([{ valor: fakeSelic }]);

      nock(BCB_API).get(BCB_SELIC_PATH).reply(200, fakeData);

      const selic = await fetchCurrentSelic();
      expect(selic).toBe(fakeSelic);
    });

    it('raises "Parse error" when request succeed but response is empty', async () => {
      const fakeData = JSON.stringify([]);

      nock(BCB_API).get(BCB_SELIC_PATH).reply(200, fakeData);

      try {
        await fetchCurrentSelic();
      } catch (err) {
        expect(err.message).toMatch('Parse error');
      }
    });

    it('raises "Parse error" when request succeed but response is invalid json', async () => {
      const fakeData = '<>INVALID</>';

      nock(BCB_API).get(BCB_SELIC_PATH).reply(200, fakeData);

      try {
        await fetchCurrentSelic();
      } catch (err) {
        expect(err.message).toMatch('Parse error');
      }
    });

    it('raises "Request error" when request fails', async () => {
      nock(BCB_API).get(BCB_SELIC_PATH).replyWithError('Api fails');

      try {
        await fetchCurrentSelic();
      } catch (err) {
        expect(err.message).toMatch('Request error');
      }
    });
  });
});
