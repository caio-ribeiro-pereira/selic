import { fetchCurrentSelic, fetchCurrentIpca } from '../../src/bcb.js'
import { fetchCurrentCdi } from '../../src/b3.js'

describe('integration/main', () => {
  describe('.fetchCurrentSelic', () => {
    test('returns selic value when request succeed', async () => {
      const selic = await fetchCurrentSelic();
      expect(selic).toBeDefined();
    });
  });

  describe('.fetchCurrentIpca', () => {
    test('returns ipca value when request succeed', async () => {
      const ipca = await fetchCurrentIpca();
      expect(ipca).toBeDefined();
    });
  });

  describe('.fetchCurrentCdi', () => {
    test('returns cdi value when request succeed', async () => {
      const cdi = await fetchCurrentCdi();
      expect(cdi).toBeDefined();
    });
  });
});
