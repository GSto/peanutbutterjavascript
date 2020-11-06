import DefaultLayout from '@layouts/default'
import Link from 'next/link'
import { getConfig, getAllPosts } from '@api'

export default function Index({ title, description, posts }) {
    console.log(posts)
    return (
      <DefaultLayout title={title} description={description}>
        <div className="max-w-4xl p-4 ml-auto mr-auto">
          <h1 className="text-5xl text-orange-700 mb-4">JavaScript Solutions For The Real World</h1>
          <ul>
            {posts.map((post) => (
              <li key={post.slug} className="mb-8 hover:bg-orange-200 hover:text-orange-700">
                <Link href={`/posts/${post.slug}`}>
                  <a className="text-2xl underline">{post.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </DefaultLayout>
    )
}

export async function getStaticProps() {
  const config = await getConfig()
  const allPosts = await getAllPosts()
  return {
    props: {
      posts: allPosts, 
      title: config.title, 
      description: config.description
    }
  }
}