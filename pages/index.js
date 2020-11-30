import DefaultLayout from '@components/default_layout'
import PostList from '@components/post_list'
import { getAllPosts, getConfig } from '@pb/post_query'

export default function Index({ title, description, posts }) {
    return (
      <DefaultLayout title={title} description={description}>
        <div className="bg-purple-900 text-white w-full">
          <div className="max-w-4xl px-4 py-12 mx-auto">
            <p className="text-5xl tracking-wide">
              JavaScript solutions for the real world
            </p>
            <p>
              <a 
                className="text-sm underline cursor-pointer" 
                href="https://github.com/GSto/peanutbutterjavascript" 
                target="_blank">
                  View source
              </a>
            </p>

          </div>
        </div>
        <div className="bg-orange-700 p-4">
          <span className="text-xl">&nbsp;</span>
        </div>
        <div className="max-w-4xl p-4 mx-auto">
          <PostList posts={posts} />
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