import Head from 'next/head'

export default function Meta({
  pageTitle,
  pageDescription,
  pageURL,
}: {
  pageTitle: string
  pageDescription: string
  pageURL: string
}): JSX.Element {
  const siteName = process.env.siteName || 'Next Note'
  return (
    <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta charSet="utf-8" />
      <title>
        {pageTitle} - {siteName}
      </title>
      <meta name="Description" content={pageDescription} />
      {/* `<Head>` の内容は必要に応じて変更 */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:url" content={pageURL} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={`${pageURL}/ogp.png`} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${pageURL}/ogp.png`}></meta>
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link
        href="https://fonts.googleapis.com/css?family=Comfortaa"
        rel="stylesheet"
        type="text/css"
      />
    </Head>
  )
}
