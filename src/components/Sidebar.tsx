import PostList from './PostList'
import Toc from './Toc'
import { PostData } from '../lib/posts'

export default function Sidebar({
  allPostData,
  contentHtml,
}: {
  allPostData: PostData[]
  contentHtml: string
}): JSX.Element {
  return (
    <div id="sidebar" className="show__side">
      <div className="show__side-section">
        <Toc contentHtml={contentHtml} />
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
