import { PostData } from './posts'

const paginationNum = 3

export function getPagePaths(
  allPostData: PostData[]
): {
  params: {
    pageNum: string
  }
}[] {
  const lastPageNum = getLastPageNum(allPostData)
  const paths = []
  for (let i = 1; i <= lastPageNum; i++) {
    paths.push({
      params: {
        pid: String(i),
      },
    })
  }
  return paths
}

export function getPaginatedPostData(
  paginatedPostData: PostData[],
  pageNum: number
): PostData[] {
  const lastPageNum = getLastPageNum(paginatedPostData)
  const startPostIndex = (pageNum - 1) * paginationNum
  let endPostIndex: number

  // 最後のページに端数の記事がある場合
  if (
    pageNum === lastPageNum &&
    paginatedPostData.length % paginationNum !== 0
  ) {
    endPostIndex = startPostIndex + (paginatedPostData.length % paginationNum)

    // 最後のページ以外と、最後のページに端数がない場合
  } else {
    endPostIndex = pageNum * paginationNum
  }
  return paginatedPostData.slice(startPostIndex, endPostIndex)
}

export function getLastPageNum(postData: PostData[]): number {
  const lastPageNum = Math.ceil(postData.length / paginationNum)
  return lastPageNum
}
