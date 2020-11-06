import DefaultLayout from '@layouts/default'
import Link from 'next/link'
import { getConfig, getAllPosts } from '@api'

export default function Index({ title, description, posts }) {
    console.log(posts)
    return (
      <DefaultLayout title={title} description={description}>
        <div className="p-6">
          <h2 className="font-semibold text-2xl">JavaScript Solutions for the Real World</h2>
        </div>
        <div>
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/posts/${post.slug}`}>
                  <a>{post.title}</a>
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