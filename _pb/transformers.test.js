import { 
  slugify,
  slugToFile
} from './transformers'

describe('slugify', () => {
  test('removes the .md file extension', () => {
    const post = 'title.md'
    const result = slugify(post)
    expect(result).toEqual('title')
  })

  test('replaces underscores with dashes', () => {
    const post = 'my_post_title.md'
    const result = slugify(post)
    expect(result).toEqual('my-post-title')
  })

  test('replaces whitespace with dashes', () => {
    const post = 'my post title'
    const result = slugify(post)
    expect(result).toEqual('my-post-title')
  })
})

describe('slugToFile', () => {
  test('converts a slug to a file', () => {
    const slug = 'my-post-title'
    const result = slugToFile(slug)
    expect(result).toEqual('my_post_title.md')
  })
})