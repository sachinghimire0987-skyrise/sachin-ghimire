import { useAuth } from '@/context/AuthContext'
import { LogOut } from 'lucide-react'

export default function AdminHeader() {
  const { user, signOut } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user?.email}</span>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>
    </header>
  )
}
