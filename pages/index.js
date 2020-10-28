import DefaultLayout from '@layouts/default'
import Link from 'next/link'
import { getConfig, getAllPosts } from '@api'

export default function Index({ title, description, posts }) {
    console.log(posts)
    return (
      <DefaultLayout title={title} description={description}>
        <div>
          <p>Posts:</p>
          <ul>

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