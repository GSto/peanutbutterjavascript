import Head from 'next/head'
import highlight from 'highlight.js'
import Header from '@components/header'
import Footer from '@components/footer'

export default function DefaultLayout({ title, description, children }) {
  return (
    <main className="flex flex-col h-screen justify-between">
      <Head>
        <title>{ title }</title>
        <meta name='description' content={description} />       
        <script>highlight.initHighlightingOnLoad()</script> 
        <link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet"></link>

        <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
        `
          }}
        />
      </Head>
      <Header />
      <div className="p-6 mb-auto">
        { children }
      </div>
      <Footer />
    </main>
  )
}