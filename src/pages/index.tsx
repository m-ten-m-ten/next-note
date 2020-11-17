import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import PostList from '../components/PostList'
import {
  PostData,
  getSortedPostsData,
  getCategories,
  getTags,
} from '../lib/posts'

export default function Home({
  allPostData,
  categories,
  tags,
}: {
  allPostData: PostData[]
  categories: string[]
  tags: string[]
}): JSX.Element {
  return (
    <Layout
      pageTitle="Home"
      pageDescription="Home"
      categories={categories}
      tags={tags}
      pageURL={process.env.siteURL}
    >
      <section className="l-index">
        <PostList allPostData={allPostData} postCount="" />
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostData = getSortedPostsData()
  const categories = getCategories()
  const tags = getTags()
  return {
    props: {
      allPostData,
      categories,
      tags,
    },
  }
}
