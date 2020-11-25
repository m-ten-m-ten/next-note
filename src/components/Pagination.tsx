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
  if (lastPageNum === 1) return <></>
  if (subDir) {
    subDir = '/' + subDir + '/'
  } else {
    subDir = ''
  }
  let list = []
  if (lastPageNum === 2) {
    list = [1, 2]
  } else {
    if (pageNum === 1) {
      list = [1, 2, 3]
    } else if (pageNum === lastPageNum) {
      list = [lastPageNum - 2, lastPageNum - 1, lastPageNum]
    } else {
      list = [pageNum - 1, pageNum, pageNum + 1]
    }
  }
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
