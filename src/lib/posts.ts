import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import { getTocIdAddedContentHtml } from './toc'
import { getSlugs } from './util'

const POSTS_DIR = path.join(process.cwd(), 'posts')

type MatterResultData = {
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

export type PostData = MatterResultData & {
  slug: string
}

export type PostDataIncludeContentHtml = PostData & {
  contentHtml: string
}

export function getAllPostData(): PostData[] {
  // /posts 配下のファイル名を取得する。
  const fileNames = fs.readdirSync(POSTS_DIR)

  const allPostData: PostData[] = []

  fileNames.forEach((fileName) => {
    if (fileName.slice(-3) === '.md') {
      // slugを取得するためにファイル名から".md"を削除する。
      const slug = fileName.replace(/\.md$/, '')

      const matterResult = getMatterResult(slug, POSTS_DIR)

      // データをslugと合わせる。
      allPostData.push({
        slug,
        ...(matterResult.data as MatterResultData),
      })
    }
  })

  return sortPostData(allPostData)
}

export async function getAllPostDataIncludeContent(): Promise<
  PostDataIncludeContentHtml[]
> {
  // /posts 配下のファイル名を取得する。
  const fileNames = fs.readdirSync(POSTS_DIR)

  const allPostDataIncludeContent: PostDataIncludeContentHtml[] = []

  await fileNames.forEach(async (fileName) => {
    if (fileName.slice(-3) === '.md') {
      // slugを取得するためにファイル名から".md"を削除する。
      const slug = fileName.replace(/\.md$/, '')

      const matterResult = getMatterResult(slug, POSTS_DIR)
      const contentHtml = await getContentHtml(matterResult.content)

      allPostDataIncludeContent.push({
        slug,
        ...(matterResult.data as MatterResultData),
        contentHtml,
      })
    }
  })
  return sortPostData<PostDataIncludeContentHtml[]>(allPostDataIncludeContent)
}

function sortPostData<T extends PostData[]>(postData: T): T {
  return postData.sort((a, b) => {
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
  const fileNames = fs.readdirSync(POSTS_DIR)
  return getSlugs(fileNames)
}

export function getPostData(slug: string): PostData {
  const matterResult = getMatterResult(slug, POSTS_DIR)
  return {
    slug,
    ...(matterResult.data as MatterResultData),
  }
}

export async function getPostDataIncludeContent(
  slug: string
): Promise<PostDataIncludeContentHtml> {
  const matterResult = getMatterResult(slug, POSTS_DIR)
  const contentHtml = await getContentHtml(matterResult.content)
  //<h2or3>にTable of contents用のid付与。
  const contentHtmlAddedToc = getTocIdAddedContentHtml(contentHtml)

  return {
    slug,
    contentHtml: contentHtmlAddedToc,
    ...(matterResult.data as MatterResultData),
  }
}

export function getMatterResult(
  slug: string,
  fileDir: string
): matter.GrayMatterFile<string> {
  // マークダウンファイルを文字列として読み取る。
  const fullPath = path.join(fileDir, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  // 投稿のメタデータ部分を解析するためにgray-matterを使う。
  return matter(fileContents)
}

export async function getContentHtml(
  matterResultContent: string
): Promise<string> {
  const processedContent = await remark().use(html).process(matterResultContent)
  return processedContent.toString()
}
