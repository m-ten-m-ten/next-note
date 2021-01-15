import fs from 'fs'
import path from 'path'
import { getTocIdAddedContentHtml } from './toc'
import { getMatterResult, getContentHtml } from './posts'
import { getSlugs } from './util'

const FIXED_PAGES_DIR = path.join(process.cwd(), 'fixedPages')

type FiexdPageMatterResultData = {
  title: string
  description: string
}

export type FixedPageData = FiexdPageMatterResultData & {
  contentHtml: string
}

type FixedPagePath = {
  params: {
    slug: string
  }
}

export function getFixedPagePaths(): FixedPagePath[] {
  const fileNames = fs.readdirSync(FIXED_PAGES_DIR)
  return getSlugs(fileNames)
}

export async function getFixedPageData(
  slug: string
): Promise<{
  contentHtml: string
}> {
  const matterResult = getMatterResult(slug, FIXED_PAGES_DIR)
  const contentHtml = await getContentHtml(matterResult.content)
  const contentHtmlAddedToc = getTocIdAddedContentHtml(contentHtml)
  return {
    contentHtml: contentHtmlAddedToc,
    ...(matterResult.data as FiexdPageMatterResultData),
  }
}
