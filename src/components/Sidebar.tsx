import { useEffect, useRef } from 'react'
import PostList from './PostList'
import Toc from './Toc'
import { PostData } from '../lib/posts'
import EventListener from 'react-event-listener'

export default function Sidebar({
  allPostData,
  contentHtml,
}: {
  allPostData: PostData[]
  contentHtml: string
}): JSX.Element {
  const sidebarFixedRef = useRef(null)

  let sidebarFixedOriginalTop: number, //固定する要素のY軸初期位置
    sidebarFixedHeight: number, // 固定する要素の高さ。数値判定に使用するのでNumber化
    sidebarFixedWitdh: string, // 固定する要素の横幅(px付き)
    notSetValue = true // 初期値セット判定用

  useEffect(() => {
    setValue()
  }, [])

  function setValue() {
    sidebarFixedOriginalTop = sidebarFixedRef.current.getBoundingClientRect()
      .top
    sidebarFixedHeight = Number(
      document.defaultView
        .getComputedStyle(sidebarFixedRef.current, null)
        .height.replace('px', '')
    )
    sidebarFixedWitdh = document.defaultView.getComputedStyle(
      sidebarFixedRef.current,
      null
    ).width
    notSetValue = false
  }

  function getScrollTop(): number {
    return Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    )
  }

  function followUp() {
    if (notSetValue) return

    const scrollTop = getScrollTop()
    const main = document.querySelector('#main')
    const contentBottom = main.scrollHeight // メインの高さ

    // スクロール位置が「追従要素の初期位置より下」〜「メインの高さ - 追従要素の高さ」の時
    if (
      scrollTop > sidebarFixedOriginalTop &&
      scrollTop < contentBottom - sidebarFixedHeight
    ) {
      sidebarFixedRef.current.style.position = 'fixed'
      sidebarFixedRef.current.style.top = '0'
      sidebarFixedRef.current.style.width = sidebarFixedWitdh
      //スクロール位置が「メインの高さ - 追従要素の高さ」よりも下に来た時
    } else if (scrollTop >= contentBottom - sidebarFixedHeight) {
      sidebarFixedRef.current.style.position = 'absolute'
      sidebarFixedRef.current.style.top = `${
        contentBottom - sidebarFixedHeight
      }px`
      sidebarFixedRef.current.style.width = sidebarFixedWitdh
      //それ以外（スクロール位置が「Top位置から追従要素の初期位置まで」の時)
    } else {
      sidebarFixedRef.current.style.position = 'static'
    }
  }

  return (
    <div id="sidebar" className="show__side">
      <EventListener target="window" onResize={followUp} onScroll={followUp} />
      <div id="sidebar__fixed" ref={sidebarFixedRef}>
        <div className="show__side-section">
          <Toc contentHtml={contentHtml} />
        </div>

        <div className="show__side-section">
          <h3 className="show__side-section-title">最新記事</h3>
          <PostList allPostData={allPostData} postCount="5" />
        </div>
      </div>
    </div>
  )
}
