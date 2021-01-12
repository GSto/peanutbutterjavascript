import Link from 'next/link'
import { slugify } from '_pb/transformers'

export function Tag({ tag }) {
  return (
    <Link href={`/tags/${slugify(tag)}`}>
      <a className=" text-sm text-purple-700 mr-1 p-1 tracking-wider cursor-pointer mt-1 underline">
        {tag}
      </a>
    </Link>
  )
}

export default function TagList({ tags = [] }) {
  return (
    <>
      {tags.map((tag) => <Tag key={tag} tag={tag} />)}
    </>
  )
}