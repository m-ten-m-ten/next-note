export default function Footer() {
  return (
    <footer className="footer">
      <div className="l-container">
        <div className="copyRight">
          Copyright(c) 2020 {process.env.siteTitle || 'Next Note'}. All Right
          Reserved.
        </div>
      </div>
    </footer>
  )
}
