import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const fixedPagesDirectory = path.join(process.cwd(), 'fixedPages')

export type FixedPageData = {
  contentHtml: string
  title: string
  description: string
}

export function getAllFixedPageSlugs(): {
  params: {
    fixedPageSlug: string
  }
}[] {
  const fileNames = fs.readdirSync(fixedPagesDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        fixedPageSlug: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getFixedPageData(slug: string) {
  const fullPath = path.join(fixedPagesDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterRusult = matter(fileContents)
  const processedContent = await remark()
    .use(html)
    .process(matterRusult.content)
  const contentHtml = processedContent.toString()

  return {
    contentHtml,
    ...matterRusult.data,
  }
}
