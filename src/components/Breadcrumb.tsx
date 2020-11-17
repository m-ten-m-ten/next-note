import Link from 'next/link'

export default function Breadcrumb({ links }) {
  return (
    <div className="breadcrumb">
      <ul>
        <li>
          <Link href="/">
            <a className="text-link">HOME</a>
          </Link>
        </li>
        {links.length >= 1 &&
          links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <a className="text-link">{link.title}</a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}
