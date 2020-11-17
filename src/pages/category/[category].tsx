import Layout from '../../components/Layout'
import PostList from '../../components/PostList'
import Breadcrumb from '../../components/Breadcrumb'
import {
  PostData,
  getCategoryPaths,
  getSortedCategoryPostsData,
  getCategories,
  getTags,
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
      pageTitle="Home"
      pageDescription="Home"
      categories={categories}
      tags={tags}
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
        <PostList allPostData={categoryPostsData} />
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
  const categories = getCategories()
  const tags = getTags()
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
