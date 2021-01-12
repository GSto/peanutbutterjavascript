import DefaultLayout from '@components/default_layout'
import PostList from '@components/post_list'
import { getAllPosts } from '@pb/post_query'
import { getSiteMeta } from '@pb/config'
import { generateRSS } from '@pb/rss'
import fs from 'fs'

export default function Index({ title, description, posts }) {
    return (
      <DefaultLayout title={title} description={description}>
        <div className="w-full">
          <div className="md:max-w-4xl sm:max-w-full px-4 py-12 ml-12">
            <h3 className="text-5xl tracking-wide font-thin">
              JavaScript solutions for the real world.
            </h3>
            <p>
              <a 
                className="text-sm underline cursor-pointer text-gray-700" 
                href="https://github.com/GSto/peanutbutterjavascript" 
                target="_blank">
                  View source
              </a>
            </p>
          </div>
        </div>

        <div className="max-w-4xl p-4 ml-12">
          <PostList posts={posts} />
        </div>
      </DefaultLayout>
    )
}

export async function getStaticProps() {
  const config = await getSiteMeta()
  const allPosts = await getAllPosts()

  // this is called when building the page, we'll use this to also create the RSS.xml file. 
  // this feels like a bit of a hack, but it'll work for now, and prevents us from querying posts twice
  // maybe a custom pre-build step? 
  const rss = generateRSS(allPosts, config)
  fs.writeFileSync('./public/rss.xml', rss)

  return {
    props: {
      posts: allPosts, 
      title: config.title, 
      description: config.description
    }
  }
}