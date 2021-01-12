import styled from 'styled-components'
import Link from 'next/link'
import TagList from './tag_list'

const PostDate = styled.span.attrs({
  className: "text-sm text-gray-700 pr-1"
})``

export function PostListItem({ post }) {
  return (
    <li className="mb-8 hover:bg-orange-200 hover:text-orange-700 pb-1">
      <p>
        <Link href={`/posts/${post.slug}`}>
          <a className="text-3xl cursor-pointer text-orange-700">{post.title}</a>
        </Link>
      </p>
      { post.published_at  && <PostDate>{post.published_at}</PostDate> } 
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