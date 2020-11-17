import dynamic from 'next/dynamic'
import Footer from './Footer'
import Meta from './Meta'
import BackTop from './BackTop'
const Header = dynamic(() => import('./Header'), { ssr: false })

export default function Layout({
  pageTitle,
  pageDescription,
  categories,
  tags,
  children,
  pageURL,
}: {
  pageTitle: string
  pageDescription: string
  categories: string[]
  tags: string[]
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
      <Header categories={categories} tags={tags} />
      <div id="main" className="l-container">
        <div className="l-content">{children}</div>
      </div>
      <Footer />
      <BackTop />
    </section>
  )
}
