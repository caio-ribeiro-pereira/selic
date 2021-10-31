import * as nock from 'nock'
import { CETIP_API, CETIP_CDI_PATH } from '../src/constants'
import { fetchCurrentCdi } from '../src/cetip'

let cetipNock;

describe('cetip', () => {
  beforeEach(() => {
    cetipNock = nock(CETIP_API).get(CETIP_CDI_PATH);
  });

  afterEach(() => {
    cetipNock = null;
  });

  describe('.fetchCurrentCdi', () => {
    test('returns cdi value when request succeed', async () => {
      const fakeCdi = 10.1;
      const fakeData = JSON.stringify({ taxa: fakeCdi.toString().replace('.', ',') });

      cetipNock.reply(200, fakeData);

      const cdi = await fetchCurrentCdi();
      expect(cdi).toBe(fakeCdi);
    });

    it('raises "Parse error" when request succeed but response is empty', async () => {
      const fakeData = '';

      cetipNock.reply(200, fakeData);

      try {
        await fetchCurrentCdi();
      } catch (err) {
        expect(err.message).toMatch('Parse error');
      }
    });

    it('raises "Parse error" when request succeed but response is invalid json', async () => {
      const fakeData = '<>INVALID</>';

      cetipNock.reply(200, fakeData);

      try {
        await fetchCurrentCdi();
      } catch (err) {
        expect(err.message).toMatch('Parse error');
      }
    });

    it('raises "Request error" when request fails', async () => {
      cetipNock.replyWithError('Api fails');

      try {
        await fetchCurrentCdi();
      } catch (err) {
        expect(err.message).toMatch('Request error');
      }
    });
  });
});
