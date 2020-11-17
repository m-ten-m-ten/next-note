import { GetStaticPaths, GetStaticProps } from 'next'
import {
  getSortedPostsData,
  getCategories,
  getTags,
  PostData,
} from '../lib/posts'
import {
  FixedPageData,
  getAllFixedPageSlugs,
  getFixedPageData,
} from '../lib/fixedPages'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'

export default function FixedPage({
  slug,
  fixedPageData,
  allPostData,
  categories,
  tags,
}: {
  slug: string
  fixedPageData: FixedPageData
  allPostData: PostData[]
  categories: string[]
  tags: string[]
}): JSX.Element {
  return (
    <Layout
      pageTitle={fixedPageData.title}
      pageDescription={fixedPageData.description}
      categories={categories}
      tags={tags}
      pageURL={`${process.env.siteURL}/${slug}`}
    >
      <div className="l-show">
        <div className="l-show__main">
          <div className="page">
            <div className="page__body">
              <div
                dangerouslySetInnerHTML={{ __html: fixedPageData.contentHtml }}
              />
            </div>
          </div>
        </div>
        <Sidebar allPostData={allPostData} />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: {
  params: { fixedPageSlug: string }
}) => {
  const slug = params.fixedPageSlug
  const fixedPageData = await getFixedPageData(slug)
  const allPostData = getSortedPostsData()
  const categories = getCategories()
  const tags = getTags()
  return {
    props: {
      slug,
      fixedPageData,
      allPostData,
      categories,
      tags,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllFixedPageSlugs()
  return {
    paths,
    fallback: false,
  }
}
