import { GetStaticPaths, GetStaticProps } from 'next'
import { getSortedPostsData, getCategories, getTags } from '../lib/posts'
import {
  FixedPageData,
  getAllFixedPageSlugs,
  getFixedPageData,
} from '../lib/fixedPages'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import Toc from '../components/Toc'

export default function FixedPage({
  slug,
  fixedPageData,
  categories,
  tags,
}: {
  slug: string
  fixedPageData: FixedPageData
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
            <Toc contentHtml={fixedPageData.contentHtml} />
            <div className="page__body">
              <div
                dangerouslySetInnerHTML={{ __html: fixedPageData.contentHtml }}
              />
            </div>
          </div>
        </div>
        <Sidebar contentHtml={fixedPageData.contentHtml} />
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
  const categories = getCategories(allPostData)
  const tags = getTags(allPostData)
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
