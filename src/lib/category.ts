import { PostData } from './posts'
import { getLastPageNum } from './pagination'

export function getCategories(allPostData: PostData[]): string[] {
  const categories = []
  allPostData.forEach((post: PostData) => {
    if (post.category && !categories.includes(post.category)) {
      categories.push(post.category)
    }
  })
  return categories
}

export function getCategoryPaths(
  allPostData: PostData[]
): {
  params: {
    category: string
    categoryPid: string
  }
}[] {
  const categories = getCategories(allPostData)
  const categoryPaths = []
  categories.forEach((category) => {
    const allPostDataInTheCategory = getAllPostDataInTheCategory(
      allPostData,
      category
    )
    const lastPageNum = getLastPageNum(allPostDataInTheCategory)
    for (let i = 1; i <= lastPageNum; i++) {
      categoryPaths.push({
        params: {
          category: category,
          categoryPid: String(i),
        },
      })
    }
  })
  return categoryPaths
}

export function getAllPostDataInTheCategory(
  allPostData: PostData[],
  category: string
): PostData[] {
  const allPostDataInTheCategoryData = []
  allPostData.forEach((post: PostData) => {
    if (post.category === category) {
      allPostDataInTheCategoryData.push(post)
    }
  })
  return allPostDataInTheCategoryData
}
