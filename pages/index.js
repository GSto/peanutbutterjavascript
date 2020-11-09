import DefaultLayout from '@layouts/default'
import Link from 'next/link'
import { getConfig, getAllPosts } from '@api'

export default function Index({ title, description, posts }) {
    console.log(posts)
    return (
      <DefaultLayout title={title} description={description}>
        <div className="max-w-4xl p-4 ml-auto mr-auto">
          <ul>
            {posts.map((post) => (
              <li key={post.slug} className="mb-8 hover:bg-orange-200 hover:text-orange-700">
                <Link href={`/posts/${post.slug}`}>
                  <a className="text-3xl cursor-pointer text-orange-700 font-bold">{post.title}</a>
                </Link>
                <span className="text-xl font-serif pl-2">{post.published_at}</span>
                {
                  post.tags && (
                    <div className="flex flex-row">
                    {post.tags.map((tag) => (
                      <span className="bg-purple-700 hover:bg-purple-600 text-xs text-white mr-2 p-1 tracking-wider cursor-pointer mt-1">
                        {tag}
                      </span>
                    ))}
                    </div>
                  )
                }

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