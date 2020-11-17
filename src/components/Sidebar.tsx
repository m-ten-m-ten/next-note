import PostList from './PostList'

export default function Sidebar({ allPostData }) {
  return (
    <div id="sidebar" className="show__side">
      {
        // -- Table of contents サイドバーのはアコーディオン化しない --
      }
      <div className="show__side-section">
        <div className="toc">
          <div className="toc__title">Table of Contents</div>
          <div className="toc__body"></div>
        </div>
      </div>

      <div id="sidebar__fixed">
        <div className="show__side-section">
          <h3 className="show__side-section-title">最新記事</h3>
          <PostList allPostData={allPostData} postCount="5" />
        </div>
      </div>
    </div>
  )
}
