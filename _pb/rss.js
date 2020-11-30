import { getSiteMeta } from '@pb/config'

// based on work from https://dev.to/emilioschepis/adding-a-statically-generated-rss-feed-to-a-next-js-9-3-blog-58id

export function generateRSS(posts) {
  const { title, description, domain } = getSiteMeta()
  const lastBuildDate = new Date(posts[0].published_at).toUTCString()
  const rssLink = `${domain}/rss.xml`
  return `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${title}</title>
        <link>${domain}</link>
        <description>${description}</description>
        <language>en</language>
        <lastBuildDate>${lastBuildDate}</lastBuildDate>
        <atom:link href="${rssLink}" rel="self" type="application/rss+xml"/>
        ${posts.map(generateRSSItem.join(''))}
      </channel>
    </rss>
  `
}

export function generateRSSItem(post) {
  const { url, title, published_at } = post
  const description = post.description ? post.description : post.title
  const pubDate= new Date(published_at).toUTCString()
  return `
    <item>
      <guid isPermalink="true">${url}</guid>
      <title>${title}</title>
      <link>${url}</link>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
    </item>
  `
}