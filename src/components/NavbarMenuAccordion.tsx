import { useState, useRef } from 'react'
import Link from 'next/link'

export default function NavbarMenuAccordion({
  list,
  subDir,
  menuToggleEN,
  menuToggleJA,
}: {
  list: string[]
  subDir: string
  menuToggleEN: string
  menuToggleJA: string
}): JSX.Element {
  const [onToggle, setOnToggle] = useState(false)
  const [onMenu, setOnMenu] = useState(false)
  const [menuHeight, setMenuHeight] = useState(0)

  const menu = useRef(null)

  function onMenuToggle() {
    setMenuHeight(menu.current.scrollHeight)
    setOnToggle(true)
  }

  function outMenuToggle() {
    setMenuHeight(onMenu ? menu.current.scrollHeight : 0)
    setOnToggle(false)
  }

  function onMenuBody() {
    setMenuHeight(menu.current.scrollHeight)
    setOnMenu(true)
  }

  function outMenuBody() {
    setMenuHeight(onToggle ? menu.current.scrollHeight : 0)
    setOnMenu(false)
  }

  function close() {
    setMenuHeight(0)
    setOnMenu(false)
    setOnToggle(false)
  }

  return (
    <li className="navbar__menu-item">
      <div
        className="navbar__menu-link"
        onMouseOver={onMenuToggle}
        onMouseOut={outMenuToggle}
      >
        <span className="navbar__menu-link-text-en">{menuToggleEN}</span>
        <span className="navbar__menu-link-text-ja">{menuToggleJA}</span>
        <span className="navbar__menu-link-mark"></span>
      </div>
      <div
        className="navbar__menu-child l-container__full"
        onMouseOver={onMenuBody}
        onMouseOut={outMenuBody}
        style={{ maxHeight: `${menuHeight}px` }}
        ref={menu}
      >
        <div className="navbar__menu-child-inner l-container">
          {list.map((listItem) => {
            return (
              <Link href={`/${subDir}/${listItem}/1`} key={listItem}>
                <a onClick={close}>{listItem}</a>
              </Link>
            )
          })}
        </div>
      </div>
    </li>
  )
}
