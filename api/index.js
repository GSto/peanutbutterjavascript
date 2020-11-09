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

// TODO: refactor to remove duplicate code from getAllPosts and getPostsByTag and getAllTags
// TODO: is there a more efficient way to tackle this that doesn't read the post directory multiple times?
export async function getAllPosts() {
  const files = await fs.promises.readdir(`${process.cwd()}/_posts/`)
  const posts = []
  for(const post of files) {
    const content = await import(`../_posts/${post}`)
    const meta = matter(content.default)
    posts.push({
      ...meta.data,
      slug: post.replace('.md', ''),

    })
  }
  return posts
}

export async function getPostsByTag(tag) {
  const files = await fs.promises.readdir(`${process.cwd()}/_posts/`)
  const posts = []
  for(const post of files) {
    const content = await import(`../_posts/${post}`)
    const meta = matter(content.default)
    if(posts.tags && posts.tags.include(tag)) {
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
  let tags = []
  for(const post of files) {
    const content = await import(`../_posts/${post}`)
    const meta = matter(content.default)
    if(post.tags) {
      tags = post.reduce((tag, acc) => {
        if(acc.indexOf(tag) === -1) {
          return [...acc, tag]
        }
        return acc
      }, tags)
    }
  }
  return tags
}

export async function getPostBySlug(slug) {
  const fileContent = await import(`../_posts/${slug}.md`)
  const meta = matter(fileContent.default)
  const content = md.render(meta.content)
  return {
    title: meta.data.title, 
    content: content,
  }
}

export async function getConfig() {
  const config = await import('../config.yml')
  return yaml.safeLoad(config.default)
}