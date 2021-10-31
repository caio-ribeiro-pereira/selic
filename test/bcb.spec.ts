import * as nock from 'nock'
import { BCB_API, BCB_SELIC_PATH } from '../src/constants'
import { fetchCurrentSelic } from '../src/bcb'

let bcbNock;

describe('bcb', () => {
  beforeEach(() => {
    bcbNock = nock(BCB_API).get(BCB_SELIC_PATH);
  });

  afterEach(() => {
    bcbNock = null;
  });

  describe('.fetchCurrentSelic', () => {
    test('returns selic value when request succeed', async () => {
      const fakeSelic = 10.11;
      const fakeData = JSON.stringify({ conteudo: [{ MetaSelic: fakeSelic }]});

      bcbNock.reply(200, fakeData);

      const selic = await fetchCurrentSelic();
      expect(selic).toBe(fakeSelic);
    });

    it('raises "Parse error" when request succeed but response is empty', async () => {
      const fakeData = '';

      bcbNock.reply(200, fakeData);

      try {
        await fetchCurrentSelic();
      } catch (err) {
        expect(err.message).toMatch('Parse error');
      }
    });

    it('raises "Parse error" when request succeed but response is invalid json', async () => {
      const fakeData = '<>INVALID</>';

      bcbNock.reply(200, fakeData);

      try {
        await fetchCurrentSelic();
      } catch (err) {
        expect(err.message).toMatch('Parse error');
      }
    });

    it('raises "Request error" when request fails', async () => {
      bcbNock.replyWithError('Api fails');

      try {
        await fetchCurrentSelic();
      } catch (err) {
        expect(err.message).toMatch('Request error');
      }
    });
  });
});
