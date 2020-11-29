import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import { getTocIdAddedContentHtml } from './toc'

const POSTS_DIR = path.join(process.cwd(), 'posts')

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

export function getAllPostData(): PostData[] {
  // /posts 配下のファイル名を取得する。
  const fileNames = fs.readdirSync(POSTS_DIR)

  const allPostData = []

  fileNames.forEach((fileName) => {
    if (fileName.charAt(0) !== '.' && fileName.charAt(0) !== '_') {
      // slugを取得するためにファイル名から".md"を削除する。
      const slug = fileName.replace(/\.md$/, '')

      const matterResult = getMatterResult(slug)

      // データをslugと合わせる。
      allPostData.push({
        slug,
        ...matterResult.data,
      })
    }
  })

  return sortPostData(allPostData)
}

export async function getAllPostDataIncludeContent() {
  // /posts 配下のファイル名を取得する。
  const fileNames = fs.readdirSync(POSTS_DIR)

  const allPostDataIncludeContent = []

  await fileNames.forEach(async (fileName) => {
    if (fileName.charAt(0) !== '.' && fileName.charAt(0) !== '_') {
      // slugを取得するためにファイル名から".md"を削除する。
      const slug = fileName.replace(/\.md$/, '')

      const matterResult = getMatterResult(slug)

      const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
      const contentHtml = processedContent.toString()

      allPostDataIncludeContent.push({
        slug,
        ...matterResult.data,
        contentHtml,
      })
    }
  })
  return sortPostData(allPostDataIncludeContent)
}

function sortPostData(postData) {
  return postData.sort((a, b) => {
    if (a.pub_data < b.pub_data) {
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
  const fileNames = fs.readdirSync(POSTS_DIR)
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export function getPostData(
  slug: string
): {
  slug: string
} {
  const matterResult = getMatterResult(slug)
  return {
    slug,
    ...matterResult.data,
  }
}

export async function getPostDataIncludeContent(
  slug: string
): Promise<{
  slug: string
  contentHtml: string
}> {
  const matterResult = getMatterResult(slug)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  let contentHtml = processedContent.toString()

  //<h2or3>にTable of contents用のid付与。
  contentHtml = getTocIdAddedContentHtml(contentHtml)

  return {
    slug,
    contentHtml,
    ...matterResult.data,
  }
}

function getMatterResult(slug) {
  // マークダウンファイルを文字列として読み取る。
  const fullPath = path.join(POSTS_DIR, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  // 投稿のメタデータ部分を解析するためにgray-matterを使う。
  return matter(fileContents)
}
