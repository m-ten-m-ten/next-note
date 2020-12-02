export default function Search({ query }: { query: string }): JSX.Element {
  return (
    <form className="search" action="/search/" method="get" target="_top">
      <i className="fas fa-search search-icon"></i>
      <input
        className="search-input"
        type="text"
        name="q"
        placeholder={query ? query : '記事を検索'}
      />
      <input className="search-submit" type="submit" value="検索" />
    </form>
  )
}
