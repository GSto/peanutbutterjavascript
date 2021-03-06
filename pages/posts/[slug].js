import styled from 'styled-components'
import DefaultLayout from '@components/default_layout'
import TagList from '@components/tag_list'
import SEOHead from '@components/seo_head'
import { Content, Title, CTA } from '@components/theme'
import StyledMarkdown from '@components/styled_markdown'
import { getPostBySlug, getAllPosts } from "@pb/post_query"


const PostDate = styled.span.attrs({
  className: "text-sm text-gray-700"
})``

export default function Post({ post }) {
  return (
    <DefaultLayout>
      <SEOHead page={post} />
      <Content>
        <Title>{ !!post.headline ? post.headline : post.title }</Title>
        <div className="flex flex-row mb-12">
          <span className="mr-4 pt-1">
            <PostDate>{post.published_at}</PostDate>
          </span>
          <TagList tags={post.tags}></TagList>
        </div>
        <StyledMarkdown content={post.content} />
        <CTA>
          To get more JavaScript tips and news, you can follow me on Twitter: <a href="twitter.com/gsto" target="_blank" className="font-bold underline pl-1">@GSto</a>
        </CTA>
        <span className="text-sm text-gray-700">
          Have a comment or question? <a href="https://github.com/GSto/peanutbutterjavascript/issues" target="_blank" className="underline cursor-pointer">Submit an issue.</a>
        </span>
      </Content>
    </DefaultLayout>
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
