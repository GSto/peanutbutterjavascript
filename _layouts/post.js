import DefaultLayout from '@layouts/default'
import Head from 'next/head'
import { PostDate } from '@components/post_list'
import TagList from '@components/tag_list'

export default function PostLayout({ post }) {
  console.log(post)
  const { title, content, published_at, tags } = post
  return (
    <DefaultLayout>
      <Head>
        <title>{ title }</title>
      </Head>
      <article className="max-w-4xl p-4 ml-auto mr-auto">
        <h1 className="mb-1 font-bold text-5xl text-orange-700">{ title }</h1>
        <div className="flex flex-row justify-center w-full mb-8">
          <span className="mr-4">
            <PostDate>{published_at}</PostDate>
          </span>
          <TagList tags={tags}></TagList>
        </div>
        <div className="markdown" dangerouslySetInnerHTML={{__html:content}} />
      </article>
    </DefaultLayout>
  )
}