import { useState, useRef } from 'react'
import EventListener from 'react-event-listener'
import Link from 'next/link'
import Search from './Search'

export default function NavbarMenuTablet({
  categories,
  tags,
}: {
  categories: string[]
  tags: string[]
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [height, setHeight] = useState(0)

  const content = useRef(null)

  function toggleAccordion() {
    setHeight(isOpen ? 0 : content.current.scrollHeight)
    setIsOpen(!isOpen)
  }

  function resetHeight() {
    if (isOpen) {
      setHeight(content.current.scrollHeight)
    }
  }

  function close() {
    setHeight(0)
    setIsOpen(false)
  }

  return (
    <div className="navbar__menu-tablet">
      <EventListener target="window" onResize={resetHeight} />

      <div
        className={`navbar__menu-tablet-toggle ${isOpen ? 'is-open' : ''}`}
        onClick={toggleAccordion}
      >
        <div className="navbar__menu-tablet-toggle-bar"></div>
      </div>

      <ul
        ref={content}
        style={{ maxHeight: `${height}px` }}
        className="navbar__menu-tablet-body"
      >
        <li className="navbar__menu-tablet-item">
          <Link href="/">
            <a onClick={close} className="navbar__menu-tablet-link">
              Home
            </a>
          </Link>
        </li>
        <li className="navbar__menu-tablet-item">
          <Link href="/about">
            <a onClick={close} className="navbar__menu-tablet-link">
              About
            </a>
          </Link>
        </li>
        <li className="navbar__menu-tablet-item">
          <div className="navbar__menu-tablet-link">Category</div>
          <div className="navbar__menu-tablet-innerList l-container">
            {categories.map((category) => {
              return (
                <Link href={`/category/${category}/1`} key={category}>
                  <a onClick={close}>{category}</a>
                </Link>
              )
            })}
          </div>
        </li>
        <li className="navbar__menu-tablet-item">
          <div className="navbar__menu-tablet-link">Tag</div>
          <div className="navbar__menu-tablet-innerList l-container">
            {tags.map((tag) => {
              return (
                <Link href={`/tag/${tag}/1`} key={tag}>
                  <a onClick={close}>{tag}</a>
                </Link>
              )
            })}
          </div>
        </li>
        <li className="navbar__menu-tablet-item">
          <Search query="" />
        </li>
      </ul>
    </div>
  )
}
