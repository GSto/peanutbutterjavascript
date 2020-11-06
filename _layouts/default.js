import Head from 'next/head'
import highlight from 'highlight.js'
import Header from '@includes/header'
import Footer from '@includes/footer'

export default function DefaultLayout({ title, description, children }) {
  return (
    <main>
      <Head>
        <title>{ title }</title>
        <meta name='description' content={description} />        
        <script>highlight.initHighlightingOnLoad()</script>
      </Head>
      <Header />
      <div className="p-6">
        { children }
      </div>
      <Footer />
    </main>
  )
}