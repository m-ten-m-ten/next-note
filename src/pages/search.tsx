import Layout from '../components/Layout'
import PostList from '../components/PostList'
import Search from '../components/Search'
import { getAllPostData, getPostData, PostData } from '../lib/posts'

export default function SearchPage({
  query,
  postData,
  allPostData,
}: {
  query: string
  postData: PostData[]
  allPostData: PostData[]
}): JSX.Element {
  return (
    <Layout
      pageTitle={`「${query}」の検索結果`}
      pageDescription={`「${query}」の検索結果一覧ページ`}
      allPostData={allPostData}
      pageURL={`${process.env.siteURL}/search?q={${query}}`}
    >
      <section className="l-index">
        <Search query={query} />
        <div className="index__title">「{query}」の検索結果</div>
        {postData.length > 0 ? (
          <PostList postData={postData} postCount="" />
        ) : (
          <p>「{query}」に関する記事が見つかりませんでした。</p>
        )}
      </section>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const { posts } = await require('../../cache/data')
  const FlexSearch = require('flexsearch')
  const query = ctx.query.q

  const index = new FlexSearch({
    tokenize: function (str) {
      return str.split(' ')
    },
    doc: {
      id: 'slug',
      field: ['data:words'],
    },
  })

  await index.add(posts)

  const results = await index.search(query)
  const postData = results.map((result) => {
    return getPostData(result.slug)
  })

  const allPostData = getAllPostData()

  return {
    props: { query, postData, allPostData },
  }
}
