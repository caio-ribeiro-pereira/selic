import * as nock from 'nock'
import { BCB_API, BCB_SELIC_PATH, BCB_IPCA_PATH } from '../src/constants'
import { fetchCurrentSelic, fetchCurrentIpca } from '../src/bcb'

let bcbSelicNock;
let bcbIpcaNock;

describe('bcb', () => {
  beforeEach(() => {
    bcbSelicNock = nock(BCB_API).get(BCB_SELIC_PATH);
    bcbIpcaNock = nock(BCB_API).get(BCB_IPCA_PATH);
  });

  afterEach(() => {
    bcbSelicNock = null;
    bcbIpcaNock = null;
  });

  describe('.fetchCurrentSelic', () => {
    test('returns selic value when request succeed', async () => {
      const fakeSelic = 10.11;
      const fakeData = JSON.stringify({ conteudo: [{ MetaSelic: fakeSelic }]});

      bcbSelicNock.reply(200, fakeData);

      const selic = await fetchCurrentSelic();
      expect(selic).toBe(fakeSelic);
    });

    it('raises "Parse error" when request succeed but response is empty', async () => {
      const fakeData = '';

      bcbSelicNock.reply(200, fakeData);

      try {
        await fetchCurrentSelic();
      } catch (err) {
        expect(err.message).toMatch('Parse error');
      }
    });

    it('raises "Parse error" when request succeed but response is invalid json', async () => {
      const fakeData = '<>INVALID</>';

      bcbSelicNock.reply(200, fakeData);

      try {
        await fetchCurrentSelic();
      } catch (err) {
        expect(err.message).toMatch('Parse error');
      }
    });

    it('raises "Request error" when request fails', async () => {
      bcbSelicNock.replyWithError('Api fails');

      try {
        await fetchCurrentSelic();
      } catch (err) {
        expect(err.message).toMatch('Request error');
      }
    });
  });

  describe('.fetchCurrentIpca', () => {
    test('returns ipca value when request succeed', async () => {
      const fakeIpca = 10.11;
      const fakeData = JSON.stringify({ conteudo: [{ taxaInflacao: fakeIpca }]});

      bcbIpcaNock.reply(200, fakeData);

      const ipca = await fetchCurrentIpca();
      expect(ipca).toBe(fakeIpca);
    });

    it('raises "Parse error" when request succeed but response is empty', async () => {
      const fakeData = '';

      bcbIpcaNock.reply(200, fakeData);

      try {
        await fetchCurrentIpca();
      } catch (err) {
        expect(err.message).toMatch('Parse error');
      }
    });

    it('raises "Parse error" when request succeed but response is invalid json', async () => {
      const fakeData = '<>INVALID</>';

      bcbIpcaNock.reply(200, fakeData);

      try {
        await fetchCurrentIpca();
      } catch (err) {
        expect(err.message).toMatch('Parse error');
      }
    });

    it('raises "Request error" when request fails', async () => {
      bcbIpcaNock.replyWithError('Api fails');

      try {
        await fetchCurrentIpca();
      } catch (err) {
        expect(err.message).toMatch('Request error');
      }
    });
  });
});
