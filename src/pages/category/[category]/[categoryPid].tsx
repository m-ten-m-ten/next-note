import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../../components/Layout'
import PostList from '../../../components/PostList'
import Breadcrumb from '../../../components/Breadcrumb'
import { PostData, getAllPostData } from '../../../lib/posts'
import {
  getCategoryPaths,
  getAllPostDataInTheCategory,
} from '../../../lib/category'
import { getLastPageNum, getPaginatedPostData } from '../../../lib/pagination'
import Pagination from '../../../components/Pagination'

export default function CategoryIndex({
  category,
  pageNum,
  allPostData,
}: {
  category: string
  pageNum: number
  allPostData: PostData[]
}): JSX.Element {
  const allPostDataInTheCategory = getAllPostDataInTheCategory(
    allPostData,
    category
  )
  const paginatedPostData = getPaginatedPostData(
    allPostDataInTheCategory,
    pageNum
  )
  const lastPageNum = getLastPageNum(allPostDataInTheCategory)
  return (
    <Layout
      pageTitle={`カテゴリー「${category}」の記事一覧`}
      pageDescription={`カテゴリー「${category}」の記事一覧ページ`}
      allPostData={allPostData}
      pageURL={`${process.env.siteURL}/category/${category}/${pageNum}`}
    >
      <section className="l-index">
        <Breadcrumb
          links={[
            {
              href: `/category/${category}/1`,
              title: category,
            },
          ]}
        />

        <div className="index__title">{category}の記事一覧</div>
        <PostList postData={paginatedPostData} postCount="" />
        <Pagination
          subDir={`category/${category}`}
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
    category: string
    categoryPid: string
  }
}) => {
  const category = params.category
  const pageNum = Number(params.categoryPid)
  const allPostData = getAllPostData()
  return {
    props: {
      category,
      pageNum,
      allPostData,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPostData = getAllPostData()
  const paths = getCategoryPaths(allPostData)
  return {
    paths,
    fallback: false,
  }
}
