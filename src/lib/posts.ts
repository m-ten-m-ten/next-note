import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export type PostData = {
  slug: string
  status: string
  title: string
  pub_date: string
  mod_date: string
  description: string
  eye_catch: string
  thumbnail: string
  category: string
  tags: string[]
}

export interface PostDataIncludeContentHTML extends PostData {
  contentHtml: string
}

export function getSortedPostsData(): PostData[] {
  // /posts 配下のファイル名を取得する。
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostData = []

  fileNames.forEach((fileName) => {
    if (fileName.charAt(0) !== '.' && fileName.charAt(0) !== '_') {
      // slugを取得するためにファイル名から".md"を削除する。
      const slug = fileName.replace(/\.md$/, '')

      // マークダウンファイルを文字列として読み取る。
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // 投稿のメタデータ部分を解析するためにgray-matterを使う。
      const matterResult = matter(fileContents)

      // データをslugと合わせる。
      allPostData.push({
        slug,
        ...matterResult.data,
      })
    }
  })

  return allPostData.sort((a, b) => {
    if (a.pub_date < b.pub_date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostSlugs(): {
  params: {
    slug: string
  }
}[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(
  slug: string
): Promise<{
  slug: string
  contentHtml: string
}> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    contentHtml,
    ...matterResult.data,
  }
}

export function getCategories(): string[] {
  const allPostData = getSortedPostsData()
  const categories = []
  allPostData.forEach((post) => {
    if (post.category && !categories.includes(post.category)) {
      categories.push(post.category)
    }
  })
  return categories
}

export function getCategoryPaths(): {
  params: {
    category: string
  }
}[] {
  const categories = getCategories()
  return categories.map((category) => {
    return {
      params: {
        category,
      },
    }
  })
}

export function getSortedCategoryPostsData(category: string): PostData[] {
  const allPostData = getSortedPostsData()
  const categoryPostsData = []
  allPostData.forEach((post) => {
    if (post.category === category) {
      categoryPostsData.push(post)
    }
  })
  return categoryPostsData
}

export function getTags(): string[] {
  const allPostData = getSortedPostsData()
  const tags = []
  allPostData.forEach((post) => {
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

export function getTagPaths(): {
  params: {
    tag: string
  }
}[] {
  const tags = getTags()
  return tags.map((tag) => {
    return {
      params: {
        tag,
      },
    }
  })
}

export function getSortedTagPostsData(tag: string): PostData[] {
  const allPostData = getSortedPostsData()
  const tagPostsData = []
  allPostData.forEach((post) => {
    if (post.tags && post.tags.includes(tag)) {
      tagPostsData.push(post)
    }
  })
  return tagPostsData
}
