import Link from 'next/link'
import { slugify } from '_pb/transformers'

export function Tag({ tag }) {
  return (
    <Link href={`/tags/${slugify(tag)}`}>
      <a className="bg-purple-700 hover:bg-purple-600 text-xs text-white mr-2 p-1 tracking-wider cursor-pointer mt-1">
        {tag}
      </a>
    </Link>
  )
}

export default function TagList({ tags = [] }) {
  return (
    <div className="flex flex-row">
      {tags.map((tag) => <Tag tag={tag} />)}
    </div>
  )
}