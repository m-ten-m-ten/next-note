import { useState } from 'react'
import EventListener from 'react-event-listener'

// バックトップの出現スクロールポイント
const BP = 30

export default function BackTop(): JSX.Element {
  const [isVisible, setIsVisible] = useState(false)

  function toggle() {
    setIsVisible(window.pageYOffset > BP ? true : false)
  }

  return (
    <div
      className={`backTop ${isVisible ? 'is-visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <EventListener target="window" onScroll={toggle} />
      <i className="fas fa-arrow-up"></i>
    </div>
  )
}
