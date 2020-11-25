import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import { getTocIdAddedContentHtml } from './toc'

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

export function getAllPostData(): PostData[] {
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
  let contentHtml = processedContent.toString()

  //<h2or3>にTable of contents用のid付与。
  contentHtml = getTocIdAddedContentHtml(contentHtml)

  return {
    slug,
    contentHtml,
    ...matterResult.data,
  }
}
