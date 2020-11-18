import { useState, useRef, useEffect } from 'react'

export default function Toc({
  contentHtml,
}: {
  contentHtml: string
}): JSX.Element {
  const regex = /<h(2|3)(.*?)>(.*?)<\/h(2|3)>/g
  const headings = contentHtml.match(regex)

  // <h2>,<h3>がないならリターン
  if (!headings) {
    return <></>
  }

  // .toc-body開閉用のstate,useRef
  const [isOpen, setIsOpen] = useState(true)
  const [height, setHeight] = useState(null)
  const content = useRef(null)

  // 初回レンダー完了時のみ、setHeightで高さ設定
  useEffect(() => {
    setHeight(isOpen ? content.current.scrollHeight : 0)
  }, [])

  // .toc-body開閉処理
  function toggleIsOpen() {
    setHeight(isOpen ? 0 : content.current.scrollHeight)
    setIsOpen(!isOpen)
  }

  // toc内リンククリック時、スムーズにスクロールさせる
  function smoothScroll(e) {
    e.preventDefault()
    const element = e.currentTarget.getAttribute('href')
    const position = document.querySelector(element).offsetTop
    window.scrollTo({ top: position, behavior: 'smooth' })
  }

  return (
    <div className="toc">
      <div
        className={`toc__title accordion-trigger ${isOpen ? 'is-open' : ''}`}
        onClick={toggleIsOpen}
      >
        Table of Contents
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${height}px` }}
        className="toc__body"
      >
        <ul>
          {headings.map((heading, i) => {
            const depth = heading[2]
            const textContent = heading.replace(regex, '$3')
            return (
              <li className={`toc-h${depth}`} key={i}>
                <a href={`#tocId-${i}`} onClick={smoothScroll}>
                  {textContent}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
