import Link from 'next/link'
import { useState } from 'react'
import NavbarMenuAccordion from './NavbarMenuAccordion'
import Search from './Search'

export default function NavbarMenu({
  categories,
  tags,
}: {
  categories: string[]
  tags: string[]
}): JSX.Element {
  const [searching, setSearching] = useState(false)

  function toggleSearch() {
    setSearching(!searching)
  }

  return (
    <div className="navbar__menu">
      <ul className={`navbar__menu-body ${searching ? 'searching' : ''}`}>
        <li className="navbar__menu-item">
          <Link href="/">
            <a className="navbar__menu-link">
              <span className="navbar__menu-link-text-en">Home</span>
              <span className="navbar__menu-link-text-ja">ホーム</span>
              <span className="navbar__menu-link-mark"></span>
            </a>
          </Link>
        </li>

        <li className="navbar__menu-item">
          <Link href="/about">
            <a className="navbar__menu-link">
              <span className="navbar__menu-link-text-en">About</span>
              <span className="navbar__menu-link-text-ja">運営者</span>
              <span className="navbar__menu-link-mark"></span>
            </a>
          </Link>
        </li>

        <NavbarMenuAccordion
          list={categories}
          subDir="category"
          menuToggleEN="Category"
          menuToggleJA="カテゴリー"
        />

        <NavbarMenuAccordion
          list={tags}
          subDir="tag"
          menuToggleEN="Tags"
          menuToggleJA="タグ"
        />
        <li className="navbar__menu-item">
          <i
            onClick={toggleSearch}
            className="fas fa-search navbar__menu-search-icon"
          ></i>
        </li>
      </ul>
      <div className={`navbar__search ${searching ? 'searching' : ''}`}>
        <Search query="" />
        <i
          onClick={toggleSearch}
          className="fas fa-times navbar__search-close"
        ></i>
      </div>
    </div>
  )
}
