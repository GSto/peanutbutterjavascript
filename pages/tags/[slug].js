import DefaultLayout from '@components/default_layout'
import PostList from '@components/post_list'
import { getPostsByTag, getAllTags } from '@pb/post_query'

export default function Index({ title, description, posts }) {
    return (
      <DefaultLayout title={title} description={description}>
        <div className="max-w-4xl p-4 ml-auto mr-auto">
          <h1 className="text-5xl font-bold pb-8">Articles tagged "{title}"</h1>
          <PostList posts={posts} />
        </div>
      </DefaultLayout>
    )
}

export async function getStaticProps(context) {
  const posts = await getPostsByTag(context.params.slug)
  return {
    props: {
      posts: posts,
      title: context.params.slug,
      description: `posts tagged ${context.params.slug}`,
    }
  }
}

export async function getStaticPaths() {
  const tags = await getAllTags()
  const paths = tags.map(tag => ({
    params: { slug: tag }
  }))
  return {
    paths: paths, 
    fallback: false,
  }
}