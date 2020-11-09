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