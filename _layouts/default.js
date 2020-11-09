import Head from 'next/head'
import highlight from 'highlight.js'
import Header from '@includes/header'
import Footer from '@includes/footer'

export default function DefaultLayout({ title, description, children }) {
  return (
    <main className="flex flex-col h-screen justify-between">
      <Head>
        <title>{ title }</title>
        <meta name='description' content={description} />       
        <script>highlight.initHighlightingOnLoad()</script> 
        <link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet"></link>
      </Head>
      <Header />
      <div className="p-6 mb-auto">
        { children }
      </div>
      <Footer />
    </main>
  )
}