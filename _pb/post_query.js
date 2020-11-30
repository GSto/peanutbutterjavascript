import matter from 'gray-matter'
import fs from 'fs'
import process from 'process'
import {slugify, slugToFile } from './transformers'
import { renderMarkdown } from './markdown'

export function getPostDirectory() {
  return process.env.POSTS_DIRECTORY ? process.env.POSTS_DIRECTORY : '_posts'
}

export function getBlockDirectory() {
  return process.env.BLOCKS_DIRECTORY ? process.env.BLOCKS_DIRECTORY : '_blocks'
}

export function processContent(fileContent) {
  const meta = matter(fileContent.default)
  const content = renderMarkdown(meta.content)
  return {
    ...meta.data,
    content: content,
  }
}

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
    .filter(t => slugify(t) === slugify(tag))
    .length !== 0
}

export async function getPostFiles() {
  return await fs.promises.readdir(`${process.cwd()}/${getPostDirectory()}/`)
}

export async function getPostMeta(filename) {
  const content = await import(`../${getPostDirectory()}/${filename}`)
  const meta = matter(content.default)
  const slug = slugify(filename)
  return {
    ...meta.data,
    url: `${process.env.PB_SITE_DOMAIN}/posts/${slug}`,
    slug,
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
    const content = await import(`../${getPostDirectory()}/${post}`)
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
    const content = await import(`../${getPostDirectory()}/${post}`)
    const meta = matter(content.default)
    if(!meta.data.tags) continue
    for(const tag of meta.data.tags) {
      tags.add(slugify(tag))
    }
  }
  return [...tags]
}

export async function getPostBySlug(slug) {
  const fileContent = await import(`../${getPostDirectory()}/${slugToFile(slug)}`)
  return processContent(fileContent)
}

export async function getBlock(block) {
  const fileContent = await import(`../${getBlockDirectory()}/${block}.md`)
  return processContent(fileContent)
}