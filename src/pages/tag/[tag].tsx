import Layout from '../../components/Layout'
import PostList from '../../components/PostList'
import Breadcrumb from '../../components/Breadcrumb'
import {
  getTagPaths,
  getSortedTagPostsData,
  getCategories,
  getTags,
  PostData,
} from '../../lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'

export default function TagIndex({
  tag,
  tagPostsData,
  categories,
  tags,
}: {
  tag: string
  tagPostsData: PostData[]
  categories: string[]
  tags: string[]
}): JSX.Element {
  return (
    <Layout
      pageTitle={`タグ「${tag}」の記事一覧`}
      pageDescription={`タグ「${tag}」の記事一覧ページ`}
      categories={categories}
      tags={tags}
      pageURL={`${process.env.siteURL}/tag/${tag}`}
    >
      <section className="l-index">
        <Breadcrumb
          links={[
            {
              href: `/tag/${tag}`,
              title: tag,
            },
          ]}
        />

        <div className="index__title">{tag}の記事一覧</div>
        <PostList allPostData={tagPostsData} postCount="" />
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: {
  params: {
    tag: string
  }
}) => {
  const tag = params.tag
  const tagPostsData = getSortedTagPostsData(tag)
  const categories = getCategories()
  const tags = getTags()
  return {
    props: {
      tag,
      tagPostsData,
      categories,
      tags,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getTagPaths()
  return {
    paths,
    fallback: false,
  }
}
