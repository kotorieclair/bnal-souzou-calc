import { expect } from 'chai';
import addSign from '../../src/filters/addSign';

describe('filter: addSign', () => {
  // it('throws an error when the given argument is not an integer', () => {
  //   expect(() => addSign('aaa')).to.throw();
  // });

  it('returns an empty string when the given argument is not an integer', () => {
    expect(addSign('aaa')).to.equal('');
    expect(addSign()).to.equal('');
  });

  it('prefixes a plus sign for the given number greater than or equal to 0', () => {
    expect(addSign(120)).to.equal('+120');
    expect(addSign(0)).to.equal('+0');
  });

  it('returns the given number smaller than 0 as is', () => {
    expect(addSign(-10)).to.equal(-10);
  });
});
