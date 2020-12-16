export function Content({ children }) {
  return (
    <article className="max-w-4xl p-4 mx-auto">
      { children }
    </article>
  )
}

export function Title({ children }) {
  return (
    <h1 className="mb-1 font-bold text-5xl text-orange-700">{ children }</h1>
  )
}

// uses styles from tailwind.css
export function StyledMarkdown({ content }) {
  return (
    <div className="markdown" dangerouslySetInnerHTML={{__html:content}} />
  )
}

export function StyledContent({ children }) {
  return (
    <div className="markdown">
      { children }
    </div>
  )
}

export function CTA({ children }) {
  return (
    <p className="text-2xl bg-purple-700 text-white p-4">
      { children }
    </p>
  )
}