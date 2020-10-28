import Head from 'next/head'
import Header from '@includes/header'
import Footer from '@includes/footer'
import { safeLoad } from 'js-yaml'

export default function DefaultLayout({ title, description, children }) {
  return (
    <main>
      <Head>
        <title>{ title }</title>
        <meta name='description' content={description} />
      </Head>
      <Header />
      { children }
      <Footer />
    </main>
  )
}