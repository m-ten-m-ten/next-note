import { getLastPageNum } from './pagination'
import { PostData } from './posts'

export function getTags(allPostData: PostData[]): string[] {
  const tags = []
  allPostData.forEach((post: PostData) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag)
        }
      })
    }
  })
  return tags
}

export function getTagPaths(
  allPostData: PostData[]
): {
  params: {
    tag: string
    tagPid: string
  }
}[] {
  const tags = getTags(allPostData)
  const tagPaths = []

  tags.forEach((tag) => {
    const allPostDataInTheTag = getAllPostDataInTheTag(allPostData, tag)
    const lastPageNum = getLastPageNum(allPostDataInTheTag)
    for (let i = 1; i <= lastPageNum; i++) {
      tagPaths.push({
        params: {
          tag,
          tagPid: String(i),
        },
      })
    }
  })
  return tagPaths
}

export function getAllPostDataInTheTag(
  allPostData: PostData[],
  tag: string
): PostData[] {
  const allPostDataInTheTag = []
  allPostData.forEach((post: PostData) => {
    if (post.tags && post.tags.includes(tag)) {
      allPostDataInTheTag.push(post)
    }
  })
  return allPostDataInTheTag
}
