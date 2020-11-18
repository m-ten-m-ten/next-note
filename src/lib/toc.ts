// mdファイルのcontentHtmlに<h2>,<h3>があれば、Table of contents用のidを追加して返す。
export function getTocIdAddedContentHtml(contentHtml: string): string {
  const regex = /<h(2|3)(.*?)>(.*?)<\/h(2|3)>/g
  const headings = contentHtml.match(regex)

  // <h2or3>がなければそのままリターン
  if (!headings) return contentHtml

  // <h2or3> を <h2or3 id="tocId-連番"> に変換
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i]
    const newHeading = heading.replace(regex, `<h$1 id="tocId-${i}"$2>$3</h$4>`)
    contentHtml = contentHtml.replace(heading, newHeading)
  }
  return contentHtml
}
