import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            Sachin Ghimire
          </Link>
          <div className="flex gap-8">
            <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
            <Link to="/projects" className="text-gray-700 hover:text-gray-900">Projects</Link>
            <Link to="/articles" className="text-gray-700 hover:text-gray-900">Articles</Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
