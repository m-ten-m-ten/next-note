import Footer from './Footer'
import Meta from './Meta'
import BackTop from './BackTop'
import Header from './Header'
import { PostData } from '../lib/posts'

export default function Layout({
  pageTitle,
  pageDescription,
  allPostData,
  children,
  pageURL,
}: {
  pageTitle: string
  pageDescription: string
  allPostData: PostData[]
  children: any
  pageURL: string | null
}): JSX.Element {
  return (
    <section id="container">
      <Meta
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageURL={pageURL}
      />
      <Header allPostData={allPostData} />
      <div id="main" className="l-container">
        <div className="l-content">{children}</div>
      </div>
      <Footer />
      <BackTop />
    </section>
  )
}
