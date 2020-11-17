import Link from 'next/link'
import { useState } from 'react'
import EventListener from 'react-event-listener'
import NavbarMenu from './NavbarMenu'
import NavbarMenuTablet from './NavbarMenuTablet'

// タブレット/PCのブレークポイント
const BP = 768

export default function Header({
  categories,
  tags,
}: {
  categories: string[]
  tags: string[]
}): JSX.Element {
  const [isPC, setIsPC] = useState(window.innerWidth > BP ? true : false)

  function resetWidth() {
    setIsPC(window.innerWidth > BP ? true : false)
  }

  return (
    <header className="header l-container__full">
      <EventListener target="window" onResize={resetWidth} />
      <nav className="navbar l-container">
        <h1 className="navbar__logo">
          <Link href="/">
            <a>{process.env.siteTitle || 'Next Note'}</a>
          </Link>
        </h1>
        {isPC ? (
          <NavbarMenu categories={categories} tags={tags} />
        ) : (
          <NavbarMenuTablet categories={categories} tags={tags} />
        )}
      </nav>
    </header>
  )
}
