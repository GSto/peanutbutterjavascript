import DefaultLayout from '@layouts/default'
import Head from 'next/head'

export default function PostLayout({ title, content }) {
  return (
    <DefaultLayout>
      <Head>
        <title>{ title }</title>
      </Head>
      <article className="max-w-4xl p-4 ml-auto mr-auto">
        <h1>{ title }</h1>
        <div dangerouslySetInnerHTML={{__html:content}} />
      </article>
    </DefaultLayout>
  )
}