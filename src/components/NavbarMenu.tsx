import Link from 'next/link'
import NavbarMenuAccordion from './NavbarMenuAccordion'

export default function NavbarMenu({
  categories,
  tags,
}: {
  categories: string[]
  tags: string[]
}): JSX.Element {
  return (
    <div className="navbar__menu">
      <ul className="navbar__menu-body">
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
          listTitle="category"
          menuToggleEN="Category"
          menuToggleJA="カテゴリー"
        />

        <NavbarMenuAccordion
          list={tags}
          listTitle="tag"
          menuToggleEN="Tags"
          menuToggleJA="タグ"
        />
      </ul>
    </div>
  )
}
