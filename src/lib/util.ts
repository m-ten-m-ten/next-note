export function getSlugs(
  fileNames: string[]
): {
  params: {
    slug: string
  }
}[] {
  const slugs = []
  fileNames.forEach((fileName) => {
    if (fileName.slice(-3) === '.md') {
      slugs.push({
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      })
    }
  })
  return slugs
}
