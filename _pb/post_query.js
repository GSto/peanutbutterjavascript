import matter from 'gray-matter'
import highlight from 'highlight.js'
import MarkdownIt from 'markdown-it'
import fs from 'fs'
import process from 'process'
import {slugify, slugToFile } from './transformers'

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


export function sortPosts(posts) {
  return posts.sort((a, b) => {
    if(a.published_at && !b.published_at) return 1
    if(!a.published_at && b.published_at) return -1
    if(a.published_at > b.published_at) return -1
    if(a.published_at < b.published_at) return 1
    return 0
  })
}

export function hasTag(tags, tag) {
  return tags
    .filter(t => slugify(t) === slugify(tag)).length !== 0
}

export async function getPostFiles() {
  return await fs.promises.readdir(`${process.cwd()}/_posts/`)
}

// extracts post, applies metadata to post
// TODO: needs testing
export async function getPostMeta(filename) {
  const content = await import(`../_posts/${filename}`)
  const meta = matter(content.default)
  return {
    ...meta.data,
    slug: slugify(filename),
  }
}


export async function getAllPosts() {
  const files = await getPostFiles()
  const posts = []
  for(const post of files) {
    const meta = await getPostMeta(post)
    posts.push(meta)
  }
  return sortPosts(posts)
}

export async function getPostsByTag(tag) {
  const files = await getPostFiles()
  const posts = []
  for(const post of files) {
    const content = await import(`../_posts/${post}`)
    const meta = matter(content.default)
    if(hasTag(meta.data.tags, tag)) {
      posts.push({
        ...meta.data,
        slug: slugify(post),
      })
    }
  }
  return sortPosts(posts)
}

export async function getAllTags() {
  const files = await getPostFiles()
  const tags = new Set()
  for(const post of files) {
    const content = await import(`../_posts/${post}`)
    const meta = matter(content.default)
    if(!meta.data.tags) continue
    for(const tag of meta.data.tags) {
      tags.add(slugify(tag))
    }
  }
  return [...tags]
}

export async function getPostBySlug(slug) {
  const fileContent = await import(`../_posts/${slugToFile(slug)}`)
  const meta = matter(fileContent.default)
  const content = md.render(meta.content)
  return {
    ...meta.data,
    content: content,
  }
}

export function getConfig() {
  const config = fs.readFileSync(process.cwd() + '/peanutbutter.json')
  return JSON.parse(config)
}

export async function getBlock(block) {
  const fileContent = await import(`../_blocks/${block}.md`)
  const meta = matter(fileContent.default)
  const content = md.render(meta.content)
  return{
    ...meta.data, 
    content: content,
  }
}