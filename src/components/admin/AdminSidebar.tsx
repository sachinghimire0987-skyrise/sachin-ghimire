import { Link } from 'react-router-dom'
import { FileText, FolderOpen, Tag, Settings, Image } from 'lucide-react'

export default function AdminSidebar() {
  const menuItems = [
    { label: 'Articles', href: '/admin/articles', icon: FileText },
    { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
    { label: 'Categories', href: '/admin/categories', icon: FileText },
    { label: 'Tags', href: '/admin/tags', icon: Tag },
    { label: 'Media', href: '/admin/media', icon: Image },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <aside className="w-64 bg-gray-100 border-r border-gray-200 min-h-screen">
      <nav className="p-6 space-y-2">
        {menuItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            to={href}
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
