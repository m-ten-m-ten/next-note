import Link from 'next/link'

export default function Pagination({
  subDir,
  pageNum,
  lastPageNum,
}: {
  subDir: string
  pageNum: number
  lastPageNum: number
}): JSX.Element {
  // 記事数が1ページに収まる場合、ページネーションは非表示。
  if (lastPageNum === 1) return <></>

  // url(ツリー)の準備
  subDir = '/' + subDir + '/'

  // 表示するページNoのリスト
  let list: number[] = []

  // ページ数が2の場合
  if (lastPageNum === 2) {
    list = [1, 2]
  } else {
    // ページ数が3以上の場合、表示するページNoは３つとして
    // 1ページ目では1,2,3ページを表示
    if (pageNum === 1) {
      list = [1, 2, 3]
      // 最後のページでは最後のページから2ページ前と1ページ前、最後のページを表示
    } else if (pageNum === lastPageNum) {
      list = [lastPageNum - 2, lastPageNum - 1, lastPageNum]
    } else {
      // それ以外のページでは現在のページを中心にして、1ページ前後を表示
      list = [pageNum - 1, pageNum, pageNum + 1]
    }
  }

  // ページネーション表示は
  // [<<]先頭ページ/[<]１つ前のページ/[list]内のページ/[>]１つ後のページ/[>>]最終ページ
  // それぞれリンク不要時には<span>にしてグレーアウトする。
  return (
    <div className="pagination">
      <ul>
        <li>
          {pageNum !== 1 ? (
            <Link href={subDir + '1'}>
              <a className="slim">
                <i className="fas fa-angle-double-left"></i>
              </a>
            </Link>
          ) : (
            <span className="slim">
              <i className="fas fa-angle-double-left"></i>
            </span>
          )}
        </li>
        <li className="overSP">
          {pageNum !== 1 ? (
            <Link href={subDir + String(pageNum - 1)}>
              <a>
                <i className="fas fa-angle-left"></i>
              </a>
            </Link>
          ) : (
            <span>
              <i className="fas fa-angle-left"></i>
            </span>
          )}
        </li>

        {list.map((num) => {
          return (
            <li
              key={num}
              className={num === pageNum ? 'pagination-current' : ''}
            >
              <Link href={subDir + String(num)}>
                <a>{num}</a>
              </Link>
            </li>
          )
        })}

        <li className="overSP">
          {pageNum !== lastPageNum ? (
            <Link href={subDir + String(pageNum + 1)}>
              <a>
                <i className="fas fa-angle-right"></i>
              </a>
            </Link>
          ) : (
            <span>
              <i className="fas fa-angle-right"></i>
            </span>
          )}
        </li>
        <li>
          {pageNum !== lastPageNum ? (
            <Link href={subDir + lastPageNum}>
              <a className="slim">
                <i className="fas fa-angle-double-right"></i>
              </a>
            </Link>
          ) : (
            <span className="slim">
              <i className="fas fa-angle-double-right"></i>
            </span>
          )}
        </li>
      </ul>
    </div>
  )
}
