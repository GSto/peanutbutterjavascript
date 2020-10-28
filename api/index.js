import matter from 'gray-matter'
import marked from 'marked'
import yaml from 'js-yaml'
import fs from 'fs'
import process from 'process'


export async function getAllPosts() {
  const files = await fs.promises.readdir(`${process.cwd()}/_posts/`)
  const posts = []
  for(const post of files) {
    const content = await import(`../_posts/${post}`)
    const meta = matter(content.default)
    posts.push({
      slug: post.replace('.md', ''),
      title: meta.data.title
    })
  }
  return posts
}

export async function getPostBySlug(slug) {
  const fileContent = await import(`../_posts/${slug}.md`)
  const meta = matter(fileContent.default)
  const content = marked(meta.content)
  return {
    title: meta.data.title, 
    content: content,
  }
}

export async function getConfig() {
  const config = await import('../config.yml')
  return yaml.safeLoad(config.default)
}