import { getLastPageNum } from './pagination'
import { PostData } from './posts'

export function getTags(allPostData: PostData[]): string[] {
  const tags: string[] = []
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

type TagPath = {
  params: {
    tag: string //タグ
    tagPid: string //タグ別一覧ページのページNo.（ページネーション用）
  }
}

// tag別記事一覧ページ(src/pages/tag/[tag]/[tagPid])用のpathを返す。
export function getTagPaths(allPostData: PostData[]): TagPath[] {
  const tags = getTags(allPostData)
  const tagPaths: TagPath[] = []

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

// 全記事から引数のタグを持つ記事を配列で返す。
export function getAllPostDataInTheTag(
  allPostData: PostData[],
  tag: string
): PostData[] {
  const allPostDataInTheTag: PostData[] = []
  allPostData.forEach((post: PostData) => {
    if (post.tags && post.tags.includes(tag)) {
      allPostDataInTheTag.push(post)
    }
  })
  return allPostDataInTheTag
}
