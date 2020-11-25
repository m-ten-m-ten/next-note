import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../../components/Layout'
import PostList from '../../../components/PostList'
import Breadcrumb from '../../../components/Breadcrumb'
import Pagination from '../../../components/Pagination'
import { getAllPostData, PostData } from '../../../lib/posts'
import { getTagPaths, getAllPostDataInTheTag } from '../../../lib/tag'
import { getLastPageNum, getPaginatedPostData } from '../../../lib/pagination'

export default function TagIndex({
  tag,
  pageNum,
  allPostData,
}: {
  tag: string
  pageNum: number
  allPostData: PostData[]
}): JSX.Element {
  const allPostDataInTheTag = getAllPostDataInTheTag(allPostData, tag)
  const paginatedPostData = getPaginatedPostData(allPostDataInTheTag, pageNum)
  const lastPageNum = getLastPageNum(allPostDataInTheTag)
  return (
    <Layout
      pageTitle={`タグ「${tag}」の記事一覧`}
      pageDescription={`タグ「${tag}」の記事一覧ページ`}
      allPostData={allPostData}
      pageURL={`${process.env.siteURL}/tag/${tag}/${pageNum}`}
    >
      <section className="l-index">
        <Breadcrumb
          links={[
            {
              href: `/tag/${tag}/1`,
              title: tag,
            },
          ]}
        />

        <div className="index__title">{tag}の記事一覧</div>
        <PostList postData={paginatedPostData} postCount="" />
        <Pagination
          subDir={`tag/${tag}`}
          pageNum={pageNum}
          lastPageNum={lastPageNum}
        />
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: {
  params: {
    tag: string
    tagPid: string
  }
}) => {
  const tag = params.tag
  const pageNum = Number(params.tagPid)
  const allPostData = getAllPostData()
  return {
    props: {
      tag,
      pageNum,
      allPostData,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPostData = getAllPostData()
  const paths = getTagPaths(allPostData)
  return {
    paths,
    fallback: false,
  }
}
