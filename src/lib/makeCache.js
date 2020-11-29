const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const remark = require(`remark`)
const strip = require(`strip-markdown`)
const { tokenize } = require(`kuromojin`)

const POSTS_DIR = path.join(process.cwd(), 'posts')

function markdownToText(content) {
  let text
  remark()
    .use(strip, { keep: ['code'] })
    .process(content, (err, file) => {
      if (err) throw err
      text = file.contents
    })
  return text
}

async function filterToken(text) {
  const res = await tokenize(text)
  const POS_LIST = [`名詞`, `動詞`, `形容詞`]
  const IGNORE_REGEX = /^[!-/:-@[-`{-~、-〜”’・]+$/
  return res
    .filter((token) => POS_LIST.includes(token.pos))
    .map((token) => token.surface_form)
    .filter((word) => !IGNORE_REGEX.test(word))
    .filter((word) => word.length >= 2)
}

async function makePostsCache() {
  // /posts 配下のファイル名を取得する。
  const fileNames = fs.readdirSync(POSTS_DIR)

  const allPostData = []

  for (let i = 0; i < fileNames.length; i++) {
    if (fileNames[i].charAt(0) === '.' || fileNames[i].charAt(0) === '_') {
      continue
    }
    // slugを取得するためにファイル名から".md"を削除する。
    const slug = fileNames[i].replace(/\.md$/, '')

    // マークダウンファイルを文字列として読み取る。
    const fullPath = path.join(POSTS_DIR, fileNames[i])
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    // 投稿のメタデータ部分を解析するためにgray-matterを使う。
    const matterResult = matter(fileContents)
    const text = markdownToText(matterResult.content)

    const textWords = await filterToken(text)
    console.log(textWords)

    const titleWords = await filterToken(matterResult.data.title)
    const words = [...textWords, ...titleWords]
    // const all_words = [...text_words, ...title_words]
    // const words = [...new Set(all_words)]

    allPostData.push({
      slug,
      data: {
        title: matterResult.data.title,
        words: words.join(' '),
      },
    })
  }

  const fileContents = `export const posts = ${JSON.stringify(allPostData)}`

  const outDir = path.join(process.cwd(), 'cache')

  try {
    fs.readdirSync('cache')
  } catch (e) {
    fs.mkdirSync('cache')
  }

  fs.writeFile(path.join(outDir, 'data.js'), fileContents, async (err) => {
    if (err) return console.log(err)
    console.log('Posts cached.')
  })
}

makePostsCache()
