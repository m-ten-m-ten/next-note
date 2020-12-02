export default function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="l-container">
        <div className="copyRight">
          Copyright(c) 2020 {process.env.siteName || 'Next Note'}. All Right
          Reserved.
        </div>
      </div>
    </footer>
  )
}
