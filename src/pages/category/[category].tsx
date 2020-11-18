import Layout from '../../components/Layout'
import PostList from '../../components/PostList'
import Breadcrumb from '../../components/Breadcrumb'
import {
  PostData,
  getCategoryPaths,
  getSortedCategoryPostsData,
  getCategories,
  getTags,
  getSortedPostsData,
} from '../../lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'

export default function CategoryIndex({
  category,
  categoryPostsData,
  categories,
  tags,
}: {
  category: string
  categoryPostsData: PostData[]
  categories: string[]
  tags: string[]
}): JSX.Element {
  return (
    <Layout
      pageTitle={`カテゴリー「${category}」の記事一覧`}
      pageDescription={`カテゴリー「${category}」の記事一覧ページ`}
      categories={categories}
      tags={tags}
      pageURL={`${process.env.siteURL}/category/${category}`}
    >
      <section className="l-index">
        <Breadcrumb
          links={[
            {
              href: `/category/${category}`,
              title: category,
            },
          ]}
        />

        <div className="index__title">{category}の記事一覧</div>
        <PostList allPostData={categoryPostsData} postCount="" />
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: {
  params: {
    category: string
  }
}) => {
  const category = params.category
  const categoryPostsData = getSortedCategoryPostsData(category)
  const allPostData = getSortedPostsData()
  const categories = getCategories(allPostData)
  const tags = getTags(allPostData)
  return {
    props: {
      category,
      categoryPostsData,
      categories,
      tags,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getCategoryPaths()
  return {
    paths,
    fallback: false,
  }
}
