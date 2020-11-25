import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import PostList from '../components/PostList'
import { getAllPostData, PostData } from '../lib/posts'

export default function Home({
  allPostData,
}: {
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
        <PostList postData={allPostData} postCount="3" />
        <Link href="/page/1">
          <a className="button-fit mt2 mb2">もっと見る</a>
        </Link>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostData = getAllPostData()
  return {
    props: {
      allPostData,
    },
  }
}
