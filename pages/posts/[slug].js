import PostLayout from '@layouts/post'
import { getPostBySlug, getAllPosts } from "@pb/post_query"

export default function Post({ post }) {
  return (
    <PostLayout post={post} />
  )
}

export async function getStaticProps(context) {
  const post = await getPostBySlug(context.params.slug)
  return {
    props: { post },
  }
}

export async function getStaticPaths() {
  let paths = await getAllPosts()
  paths = paths.map(post => ({
    params: { slug: post.slug }
  }))
  return {
    paths: paths, 
    fallback: false,
  }
}
