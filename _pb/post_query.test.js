import { hasTag } from './post_query'

describe('hasTag', () => {
  test('matches if tag has space and query has hyphen', () => {
    const haystack = ['dependency management']
    const needle = 'dependency-management'
    const result = hasTag(haystack, needle)
    expect(result).toEqual(true)
  })
})