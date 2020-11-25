import Link from 'next/link'
import { PostData } from '../lib/posts'
import PostAttr from './PostAttr'

export default function PostList({
  postData,
  postCount = null,
}: {
  postData: PostData[]
  postCount: string | null
}): JSX.Element {
  if (postCount && Number.isInteger(Number(postCount))) {
    postData = postData.slice(0, Number(postCount))
  }
  return (
    <ul className="postList">
      {postData.map(({ slug, thumbnail, pub_date, title, category, tags }) => (
        <li className="postList__item" key={slug}>
          <Link href={`/posts/${slug}`}>
            <a className="postList__link">
              <figure className="postList__figure">
                <img
                  className="postList__img"
                  src={`/thumbnail/${thumbnail}`}
                  alt={thumbnail}
                />
              </figure>
              <div className="postList__header">
                <span className="postList__date">{pub_date}</span>
              </div>
              <div className="postList__body">
                <h2 className="postList__title">{title}</h2>
              </div>
            </a>
          </Link>
          {(category || tags) && (
            <div className="postList__footer">
              <PostAttr
                className="postList__attr"
                category={category || null}
                tags={tags || null}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
