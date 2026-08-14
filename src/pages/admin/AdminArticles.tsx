import { Link } from 'react-router-dom'

export default function AdminArticles() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Articles</h2>
        <Link to="/admin/articles/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          New Article
        </Link>
      </div>
      <p className="text-gray-600">Articles management coming soon...</p>
    </div>
  )
}
