import { useEffect } from 'react'
import Head from 'next/head'
import highlight from 'highlight.js'
import Header from '@components/header'
import Footer from '@components/footer'
import GaInitializer from '@components/ga_initializer'

export default function DefaultLayout({ title, description, children }) {
  useEffect(() => {
    highlight.initHighlightingOnLoad()
  })
  
  return (
    <main className="flex flex-col h-screen justify-between">
      <GaInitializer />
      <Head>
        { title ? <title>{ title }</title> : null }
        { description ? <meta name='description' content={description} /> : null }       
        <link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet"></link>
        <link 
          rel="alternate"
          type="application/rss+xml"
          title="RSS feed for blog posts"
          href="${process.env.NEXT_PUBLIC_PB_DOMAIN}/rss.xml"
        />
      </Head>
      <Header />
      <section className="flex-grow bg-white">
        { children }
      </section>
      <Footer />
    </main>
  )
}