import { expect } from 'chai'
import starify from '../../src/filters/starify'

describe('filter: starify', () => {
  it('returns an empty string when the given argument is not an integer', () => {
    expect(starify('aaa')).to.equal('')
    expect(starify()).to.equal('')
  })

  it('returns same number of stars as given integer', () => {
    const stars = starify(3)
    expect(stars).to.equal('★★★')
  })
})
