'use client';

import { 
  ChatBubbleLeftIcon, 
  UserGroupIcon, 
  CalendarIcon,
  BellIcon 
} from '@heroicons/react/24/outline';

export default function AppPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full z-10">
        <div className="mx-auto px-4">
          <div className="flex h-16 justify-between items-center">
            <h1 className="text-xl font-semibold text-blue-600">FriendshipApp</h1>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <BellIcon className="h-6 w-6" />
              </button>
              <img
                src="https://placekitten.com/32/32"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Left Sidebar - Navigation */}
        <aside className="w-64 bg-white shadow-sm fixed h-full">
          <nav className="p-4 space-y-2">
            <a href="#" className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-50 rounded-md">
              <ChatBubbleLeftIcon className="h-5 w-5" />
              <span>Chat</span>
            </a>
            <a href="#" className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-50 rounded-md">
              <UserGroupIcon className="h-5 w-5" />
              <span>Groups</span>
            </a>
            <a href="#" className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-50 rounded-md">
              <CalendarIcon className="h-5 w-5" />
              <span>Events</span>
            </a>
            <a href="#" className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-50 rounded-md">
              <BellIcon className="h-5 w-5" />
              <span>Notifications</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
              <p className="text-3xl font-semibold text-gray-900">1,234</p>
              <p className="text-green-600 text-sm mt-2">↑ 12% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium">Revenue</h3>
              <p className="text-3xl font-semibold text-gray-900">$12,345</p>
              <p className="text-green-600 text-sm mt-2">↑ 8% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium">Active Projects</h3>
              <p className="text-3xl font-semibold text-gray-900">23</p>
              <p className="text-red-600 text-sm mt-2">↓ 2% from last month</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">New user signed up</p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                      Completed
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
