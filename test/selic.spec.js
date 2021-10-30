const sinon = require('sinon');
const { expect } = require('chai');
const { CDI_SCORE, POUPANCA_PERCENT } = require('../src/constants');
const Selic = require('../src/selic');

describe('Selic', () => {
  describe('.scrapRates', () => {
    it('returns the selic, poupanca and cdi rates using options when bcb scraps succeed', (done) => {
      const fakeBcb = { fetchSelic() {} };
      const fakeValue = 10;
      sinon.stub(fakeBcb, 'fetchSelic').resolves(fakeValue);

      const options = { bcb: fakeBcb, cdiScore: 0, poupancaPercent: 100 };
      const selic = new Selic(options);
      selic.scrapRates().then((rates) => {
        expect(rates).to.have.length(3);
        expect(rates[0].name).to.equal('Selic');
        expect(rates[0].apy).to.equal(fakeValue);
        expect(rates[1].name).to.equal('CDI');
        expect(rates[1].apy).to.equal(fakeValue);
        expect(rates[2].name).to.equal('Poupança');
        expect(rates[2].apy).to.equal(fakeValue);
        done();
      });
    });

    it('returns the selic, poupanca and cdi rates using default options when bcb scraps succeed', (done) => {
      const fakeBcb = { fetchSelic() {} };
      const fakeValue = 10;
      sinon.stub(fakeBcb, 'fetchSelic').resolves(fakeValue);

      const selic = new Selic({ bcb: fakeBcb });
      selic.scrapRates().then((rates) => {
        expect(rates).to.have.length(3);
        expect(rates[0].name).to.equal('Selic');
        expect(rates[0].apy).to.equal(fakeValue);
        expect(rates[1].name).to.equal('CDI');
        expect(rates[1].apy).to.equal(fakeValue - CDI_SCORE);
        expect(rates[2].name).to.equal('Poupança');
        expect(rates[2].apy).to.equal((fakeValue / 100) * POUPANCA_PERCENT);
        done();
      });
    });

    it('raises error when bcb scraps fail', (done) => {
      const fakeBcb = { fetchSelic() {} };
      sinon.stub(fakeBcb, 'fetchSelic').rejects(new Error());

      const selic = new Selic({ bcb: fakeBcb });
      selic.scrapRates().catch((err) => {
        expect(err).to.be.instanceOf(Error);
        done();
      });
    });
  });

  describe('.getSelic', () => {
    it('returns the selic rates when bcb scraps succeed', (done) => {
      const fakeBcb = { fetchSelic() {} };
      const fakeValue = 10.1111;
      sinon.stub(fakeBcb, 'fetchSelic').resolves(fakeValue);

      const selic = new Selic({ bcb: fakeBcb });
      selic.getSelic().then((value) => {
        const expected = Number(Number(fakeValue).toFixed(2));
        expect(value).to.equal(expected);
        done();
      });
    });

    it('raises error when bcb scraps fail', (done) => {
      const fakeBcb = { fetchSelic() {} };
      sinon.stub(fakeBcb, 'fetchSelic').rejects(new Error());

      const selic = new Selic({ bcb: fakeBcb });
      selic.getSelic().catch((err) => {
        expect(err).to.be.instanceOf(Error);
        done();
      });
    });
  });

  describe('.calculateCdiFromSelic', () => {
    it('returns the cdi rates using default options.cdiScore', (done) => {
      const fakeBcb = {};
      const selicValue = 11.1;
      const selic = new Selic({ bcb: fakeBcb });

      const cdi = selic.calculateCdiFromSelic(selicValue);
      const expected = Number(Number(selicValue - CDI_SCORE).toFixed(2));
      expect(cdi).to.equal(expected);
      done();
    });

    it('returns the cdi rates using custom options.cdiScore', (done) => {
      const fakeBcb = {};
      const selicValue = 11.1;
      const cdiScore = 0.2;
      const selic = new Selic({ bcb: fakeBcb, cdiScore });

      const cdi = selic.calculateCdiFromSelic(selicValue);
      const expected = Number(Number(selicValue - cdiScore).toFixed(2));
      expect(cdi).to.equal(expected);
      done();
    });
  });

  describe('.calculatePoupancaFromSelic', () => {
    it('returns the poupanca rates using default options.poupancaPercent', (done) => {
      const fakeBcb = {};
      const selicValue = 11.1;
      const selic = new Selic({ bcb: fakeBcb });

      const poupanca = selic.calculatePoupancaFromSelic(selicValue);
      const expected = Number(Number((selicValue / 100) * POUPANCA_PERCENT).toFixed(2));
      expect(poupanca).to.equal(expected);
      done();
    });

    it('returns the poupanca rates using custom options.poupancaPercent', (done) => {
      const fakeBcb = {};
      const selicValue = 11.1;
      const poupancaPercent = 50;
      const selic = new Selic({ bcb: fakeBcb, poupancaPercent });

      const poupanca = selic.calculatePoupancaFromSelic(selicValue);
      const expected = Number(Number((selicValue / 100) * poupancaPercent).toFixed(2));
      expect(poupanca).to.equal(expected);
      done();
    });
  });
});
