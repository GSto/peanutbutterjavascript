import Link from 'next/link'
import TagList from './tag_list'

export function PostDate({ children }) {
  if(!children) return null
  return (
    <span className="text-xl pl-2">{children}</span>
  )
}

export function PostListItem({ post }) {
  return (
    <li className="mb-8 hover:bg-orange-200 hover:text-orange-700 pb-1">
      <Link href={`/posts/${post.slug}`}>
        <a className="text-3xl cursor-pointer text-orange-700 font-bold">{post.title}</a>
      </Link>
      <PostDate>{post.published_at}</PostDate>
      { post.tags && <TagList tags={post.tags} /> }
    </li>
  )
}

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => <PostListItem key={post.slug} post={post} />)}
    </ul>
  )
}