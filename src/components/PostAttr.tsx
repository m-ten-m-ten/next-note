import Link from 'next/link'

export default function PostAttr({ className, category, tags }) {
  return (
    <div className={className}>
      {category && (
        <Link href={`/category/${category}`}>
          <a>{category}</a>
        </Link>
      )}
      {tags &&
        tags.map((tag) => (
          <Link href={`/tag/${tag}`} key={tag}>
            <a>{tag}</a>
          </Link>
        ))}
    </div>
  )
}
