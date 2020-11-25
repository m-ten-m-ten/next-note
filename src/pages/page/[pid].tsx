import { GetStaticProps, GetStaticPaths } from 'next'
import Layout from '../../components/Layout'
import PostList from '../../components/PostList'
import Pagination from '../../components/Pagination'
import { PostData, getAllPostData } from '../../lib/posts'
import {
  getPagePaths,
  getPaginatedPostData,
  getLastPageNum,
} from '../../lib/pagination'

export default function PageNum({
  pageNum,
  lastPageNum,
  paginatedPostData,
  allPostData,
}: {
  pageNum: number
  lastPageNum: number
  paginatedPostData: PostData[]
  allPostData: PostData[]
}): JSX.Element {
  return (
    <Layout
      pageTitle="Home"
      pageDescription="Home"
      allPostData={allPostData}
      pageURL={process.env.siteURL}
    >
      <section className="l-index">
        <PostList postData={paginatedPostData} postCount="" />
        <Pagination subDir="page" pageNum={pageNum} lastPageNum={lastPageNum} />
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: {
  params: {
    pid: string
  }
}) => {
  const pageNum = Number(params.pid)
  const allPostData = getAllPostData()
  const lastPageNum = getLastPageNum(allPostData)
  const paginatedPostData = getPaginatedPostData(allPostData, pageNum)
  return {
    props: {
      pageNum,
      lastPageNum,
      paginatedPostData,
      allPostData,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPostData = getAllPostData()
  const paths = getPagePaths(allPostData)
  return {
    paths,
    fallback: false,
  }
}
