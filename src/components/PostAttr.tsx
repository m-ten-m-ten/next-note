import Link from 'next/link'

export default function PostAttr({
  className,
  category,
  tags,
}: {
  className: string
  category: string
  tags: string[]
}): JSX.Element {
  return (
    <div className={className}>
      {category && (
        <Link href={`/category/${category}/1`}>
          <a>{category}</a>
        </Link>
      )}
      {tags &&
        tags.map((tag) => (
          <Link href={`/tag/${tag}/1`} key={tag}>
            <a>{tag}</a>
          </Link>
        ))}
    </div>
  )
}
