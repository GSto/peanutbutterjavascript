import { getSiteMeta } from '@pb/config'

// source: https://stackoverflow.com/questions/7918868/how-to-escape-xml-entities-in-javascript
export function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
      switch (c) {
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '&': return '&amp;';
          case '\'': return '&apos;';
          case '"': return '&quot;';
      }
  });
}

// based on work from https://dev.to/emilioschepis/adding-a-statically-generated-rss-feed-to-a-next-js-9-3-blog-58id
export function generateRSS(posts, meta) {
  const { title, description, domain } = meta
  const lastBuildDate = new Date(posts[0].published_at).toUTCString()
  const rssLink = `${domain}/rss.xml`
  return `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${escapeXml(title)}</title>
        <link>${domain}</link>
        <description>${escapeXml(description)}</description>
        <language>en</language>
        <lastBuildDate>${lastBuildDate}</lastBuildDate>
        <atom:link href="${rssLink}" rel="self" type="application/rss+xml"/>
        ${posts.map(generateRSSItem).join('')}
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
      <title>${escapeXml(title)}</title>
      <link>${url}</link>
      <description>${escapeXml(description)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>
  `
}