import DefaultLayout from '@layouts/default'
import { Content, Title, StyledMarkdown } from '@components/theme'
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