// uses styles from tailwind.css
export default function StyledMarkdown({ content }) {
  return (
    <div className="markdown" dangerouslySetInnerHTML={{__html:content}} />
  )
}