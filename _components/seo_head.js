import Head from 'next/head'

export default function SeoHead({ page }) {

  const { title, url } = page
  const description =         !!page.description         ? page.description                                        : title
  const og_title =            !!page.og_title            ? page.og_title                                           : title
  const og_type =             !!page.og_type             ? page.og_type                                            : "article"
  const og_description =      !!page.og_description      ? page.og_description                                     : description
  const og_image =            !!page.og_image            ? `${process.env.NEXT_PUBLIC_PB_DOMAIN}/${page.og_image}` : null
  const twitter_title =       !!page.twitter_title       ? page.twitter_title                                      : og_title
  const twitter_description = !!page.twitter_description ? page.twitter_description                                : og_description
  const twitter_image =       !!page.twitter_image       ? `${process.env.NEXT_PUBLIC_PB_DOMAIN}/${page.og_image}` : og_image

  return (
    <Head>
      <title>{ title }</title>
      <meta name='description' content={description} />  
      {/* OGP tags https://ogp.me/*/}
      <meta property="og:title" content={og_title} />
      <meta property="og:type" content={og_type} />
      <meta property="og:description" content={og_description} />
      <meta property="og:url" content={url} />
      {og_image ? <meta property="og:image" content={og_image} /> : null }

      {/* Twitter card tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={twitter_title} />
      <meta name="twitter:description" content={twitter_description} />
      <meta name="twitter:url" content={url} />
      {twitter_image ? <meta name="twitter:image" content={twitter_image} /> : null }
    </Head>
  )
}