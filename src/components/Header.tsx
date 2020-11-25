import Link from 'next/link'
import { getCategories } from '../lib/category'
import { getTags } from '../lib/tag'
import { PostData } from '../lib/posts'
import NavbarMenu from './NavbarMenu'
import NavbarMenuTablet from './NavbarMenuTablet'

export default function Header({
  allPostData,
}: {
  allPostData: PostData[]
}): JSX.Element {
  const categories = getCategories(allPostData)
  const tags = getTags(allPostData)

  return (
    <header className="header l-container__full">
      <nav className="navbar l-container">
        <h1 className="navbar__logo">
          <Link href="/">
            <a>{process.env.siteTitle || 'Next Note'}</a>
          </Link>
        </h1>
        <NavbarMenu categories={categories} tags={tags} />
        <NavbarMenuTablet categories={categories} tags={tags} />
      </nav>
    </header>
  )
}
