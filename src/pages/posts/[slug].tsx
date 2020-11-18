import { GetStaticPaths, GetStaticProps } from 'next'
import {
  PostData,
  getSortedPostsData,
  getAllPostSlugs,
  getPostData,
  getCategories,
  getTags,
  PostDataIncludeContentHTML,
} from '../../lib/posts'
import Layout from '../../components/Layout'
import PostAttr from '../../components/PostAttr'
import Breadcrumb from '../../components/Breadcrumb'
import Sidebar from '../../components/Sidebar'
import Toc from '../../components/Toc'

export default function Post({
  slug,
  postData,
  allPostData,
  categories,
  tags,
}: {
  slug: string
  postData: PostDataIncludeContentHTML
  allPostData: PostData[]
  categories: string[]
  tags: string[]
}): JSX.Element {
  return (
    <Layout
      pageTitle={postData.title}
      pageDescription={postData.description}
      categories={categories}
      tags={tags}
      pageURL={`${process.env.siteURL}/posts/${slug}`}
    >
      <div className="l-show">
        <div className="l-show__main">
          <Breadcrumb
            links={
              postData.category && [
                {
                  href: `/category/${postData.category}`,
                  title: postData.category,
                },
              ]
            }
          />
          <article className="article">
            <figure className="article__eye-catch">
              <img
                src={`/eye_catch/${postData.eye_catch}`}
                alt={postData.title}
              />
            </figure>

            <div className="article__header">
              <span className="article__pub-date">
                公開日：{postData.pub_date}
                {postData.mod_date && `更新日：${postData.mod_date}`}
              </span>
            </div>
            <h1 className="article__title">{postData.title}</h1>
            <PostAttr
              className="article__attr"
              category={postData.category || null}
              tags={postData.tags || null}
            />
            <hr className="overPC" />
            <Toc contentHtml={postData.contentHtml} />
            <div className="article__body">
              <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </div>
          </article>
        </div>
        <Sidebar allPostData={allPostData} contentHtml={postData.contentHtml} />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const slug = params.slug
  const postData = await getPostData(slug)
  const allPostData = getSortedPostsData()
  const categories = getCategories(allPostData)
  const tags = getTags(allPostData)
  return {
    props: {
      slug,
      postData,
      allPostData,
      categories,
      tags,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs()
  return {
    paths,
    fallback: false,
  }
}
