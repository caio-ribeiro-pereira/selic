const { expect } = require('chai');
const { sanitize } = require('../src/utils');

describe('Utils', () => {
  describe('.sanitize', () => {
    it('returns firstArg when firstArg is not undefined', (done) => {
      const firstArg = 10;
      const defaultArg = 20;
      const result = sanitize(firstArg, defaultArg);
      expect(result).to.equal(firstArg);
      done();
    });

    it('returns defaultArg when firstArg is undefined', (done) => {
      const firstArg = undefined;
      const defaultArg = 20;
      const result = sanitize(firstArg, defaultArg);
      expect(result).to.equal(defaultArg);
      done();
    });
  });
});
