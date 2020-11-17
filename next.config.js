// ファイルの先頭に eslint-disable を追加
/* eslint-disable
    @typescript-eslint/no-var-requires,
    @typescript-eslint/explicit-function-return-type
*/
const { resolve } = require('path')

const nextConfig = {
  env: {
    siteTitle: '',
    siteURL: 'https://example.com',
  },
  webpack: (config) => {
    // src ディレクトリをエイリアスのルートに設定
    config.resolve.alias['~'] = resolve(__dirname, 'src')
    return config
  },
}

module.exports = nextConfig
