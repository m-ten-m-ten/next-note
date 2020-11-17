import Document, { Html, Head, Main, NextScript } from 'next/document'

class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ja-JP">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
