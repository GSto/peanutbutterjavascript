import matter from 'gray-matter'

export async function getAllPosts() {
  const context = require.context('../_posts', false, '/\.md$/')
  const posts = []
  for(const key of context.keys()) {
    const post = key.slice(2)
    const content = await import(`../_posts/${post}`)
    const meta = matter(content.default)
    posts.push({
      slug: post.repleace('.md', ''),
      title: meta.data.title
    })
  }

  return posts
}