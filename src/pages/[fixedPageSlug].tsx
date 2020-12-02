import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPostData, PostData } from '../lib/posts'
import {
  FixedPageData,
  getFixedPagePaths,
  getFixedPageData,
} from '../lib/fixedPages'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import Toc from '../components/Toc'

export default function FixedPage({
  slug,
  fixedPageData,
  allPostData,
}: {
  slug: string
  fixedPageData: FixedPageData
  allPostData: PostData[]
}): JSX.Element {
  return (
    <Layout
      pageTitle={fixedPageData.title}
      pageDescription={fixedPageData.description}
      pageURL={`${process.env.siteURL}/${slug}`}
      allPostData={allPostData}
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
  const allPostData = getAllPostData()
  return {
    props: {
      slug,
      fixedPageData,
      allPostData,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getFixedPagePaths()
  return {
    paths,
    fallback: false,
  }
}
