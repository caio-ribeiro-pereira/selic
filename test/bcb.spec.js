const https = require('https');
const { PassThrough } = require('stream');
const sinon = require('sinon');
const { expect } = require('chai');
const BCB = require('../src/bcb');

let stubGet;

describe('BCB', () => {
  beforeEach(() => {
    stubGet = sinon.stub(https, 'get');
  });

  afterEach(() => {
    https.get.restore();
  });

  describe('.fetchSelic', () => {
    it('returns selic value when request succeed', (done) => {
      const fakeSelic = 10.1;
      const fakeData = [{ valor: fakeSelic }];

      const fakeResponse = new PassThrough();
      fakeResponse.write(JSON.stringify(fakeData));
      fakeResponse.end();

      const fakeRequest = new PassThrough();

      stubGet.callsArgWith(1, fakeResponse).returns(fakeRequest);

      BCB.fetchSelic().then((selic) => {
        expect(selic).to.equal(fakeSelic);
        done();
      });
    });

    it('raises "Parse error" when request succeed but response is empty', (done) => {
      const fakeData = [];

      const fakeResponse = new PassThrough();
      fakeResponse.write(JSON.stringify(fakeData));
      fakeResponse.end();

      const fakeRequest = new PassThrough();

      stubGet.callsArgWith(1, fakeResponse).returns(fakeRequest);
      BCB.fetchSelic().catch((err) => {
        expect(err).to.be.instanceOf(Error);
        expect(err.message).to.equal('Parse error');
        done();
      });
    });

    it('raises "Parse error" when request succeed but response is invalid json', (done) => {
      const fakeResponse = new PassThrough();
      fakeResponse.write('INVALID');
      fakeResponse.end();

      const fakeRequest = new PassThrough();

      stubGet.callsArgWith(1, fakeResponse).returns(fakeRequest);

      BCB.fetchSelic().catch((err) => {
        expect(err).to.be.instanceOf(Error);
        expect(err.message).to.equal('Parse error');
        done();
      });
    });

    it('raises "Request error" when request fails', () => {
      const fakeRequest = new PassThrough();

      stubGet.returns(fakeRequest);

      BCB.fetchSelic().catch((err) => {
        expect(err).to.be.instanceOf(Error);
        expect(err.message).to.equal('Request error');
        done();
      });

      fakeRequest.emit('error', new Error());
    });
  });
});
