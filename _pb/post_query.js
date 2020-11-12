import matter from 'gray-matter'
import highlight from 'highlight.js'
import MarkdownIt from 'markdown-it'
import yaml from 'js-yaml'
import fs from 'fs'
import process from 'process'

const md = new MarkdownIt({
  highlight: (str, lang) => {
    if(lang && highlight.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
        highlight.highlight(lang, str, true).value +
        '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
})


function sortPosts(posts) {
  return posts.sort((a, b) => {
    if(a.published_at && !b.published_at) return 1
    if(!a.published_at && b.published_at) return -1
    if(a.published_at > b.published_at) return -1
    if(a.published_at < b.published_at) return 1
    return 0
  })
}

function sortStrings(strs) {

}

// TODO: refactor to remove duplicate code from getAllPosts and getPostsByTag and getAllTags
// TODO: is there a more efficient way to tackle this that doesn't read the post directory multiple times?
export async function getAllPosts() {
  const files = await fs.promises.readdir(`${process.cwd()}/_posts/`)
  const posts = []
  for(const post of files) {
    const content = await import(`../_posts/${post}`)
    const meta = matter(content.default)
    posts.push({
      slug: post.replace('.md', ''),
      ...meta.data,
    })
  }
  return sortPosts(posts)
}

export async function getPostsByTag(tag) {
  const files = await fs.promises.readdir(`${process.cwd()}/_posts/`)
  const posts = []
  for(const post of files) {
    const content = await import(`../_posts/${post}`)
    const meta = matter(content.default)
    if(meta.data.tags && meta.data.tags.includes(tag)) {
      posts.push({
        ...meta.data,
        slug: post.replace('.md', ''),
      })
    }
  }
  return posts
}

export async function getAllTags() {
  const files = await fs.promises.readdir(`${process.cwd()}/_posts/`)
  const tags = new Set()
  for(const post of files) {
    const content = await import(`../_posts/${post}`)
    const meta = matter(content.default)
    if(!meta.data.tags) continue
    for(const tag of meta.data.tags) {
      tags.add(tag)
    }
  }
  return [...tags]
}

export async function getPostBySlug(slug) {
  const fileContent = await import(`../_posts/${slug}.md`)
  const meta = matter(fileContent.default)
  const content = md.render(meta.content)
  return {
    ...meta.data,
    content: content,
  }
}

export async function getConfig() {
  const config = await import('../config.yml')
  return yaml.safeLoad(config.default)
}