import DefaultLayout from '@components/default_layout'
import { Content, Title } from '@components/theme'
import StyledMarkdown from '@components/styled_markdown'
import { getBlock } from '@pb/post_query'

export default function About({ title, description, content }) {
    return (
      <DefaultLayout title={title} description={description}>
        <Content>
          <Title>About</Title>
          <StyledMarkdown content={content} />
        </Content>
      </DefaultLayout>
    )
}

export async function getStaticProps() {
  const block = await getBlock('about')
  return {
    props: { content: block.content },
  }
}