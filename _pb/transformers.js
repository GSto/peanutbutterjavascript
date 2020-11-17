export function slugify(post) {
  return post.replace('.md','').replace(/\s+|_/g,'-')
}

export function slugToFile(slug) {
  return `${slug.replace(/\s+|-/g,'_')}.md`
}