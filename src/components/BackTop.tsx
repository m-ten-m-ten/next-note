import { useState, useRef, useEffect } from 'react'
import EventListener from 'react-event-listener'

export default function BackTop(): JSX.Element {
  // バックトップの出現スクロールポイント
  const BP = 30
  const BreakPointPC = 1130 //PCブレークポイント
  const BackToTopRadius = 45 //BackToTopの半径

  const [isVisible, setIsVisible] = useState(false)
  const backTopRef = useRef(null)

  useEffect(() => {
    controlPosition()
  })

  function toggle() {
    setIsVisible(window.pageYOffset > BP ? true : false)
  }
  // 画面サイズが「PCブレークポイント + BackToTopの半径」をこえたら、style.rightを調整する。（l-containerから離れないように）
  function controlPosition() {
    const windowWidth = window.innerWidth
    if (windowWidth + BackToTopRadius <= BreakPointPC) {
      backTopRef.current.style.right = null
    } else {
      backTopRef.current.style.right = `${
        (windowWidth - BreakPointPC) / 2 - BackToTopRadius
      }px`
    }
  }

  return (
    <div
      className={`backTop ${isVisible ? 'is-visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      ref={backTopRef}
    >
      <EventListener
        target="window"
        onScroll={toggle}
        onResize={controlPosition}
      />
      <i className="fas fa-arrow-up"></i>
    </div>
  )
}
