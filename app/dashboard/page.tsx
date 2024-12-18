'use client';

import { BellIcon } from '@heroicons/react/24/outline';
import { useAuth, UserButton } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Keep connection status for now
const connectionStatus = {
  isConnected: true,
  lastConnected: "2024-03-21T15:30:00Z"
};

interface AnonConnection {
  id: string;
  name: string;
  headline?: string;
  oldHeadline?: string;
  oldHeadlineUpdatedAt?: string;
  status: 'updated' | 'no_change';
  publicProfileUrl?: string;
  publicIdentifier?: string;
  profilePictureUrl?: string;
  connectionCreatedAt: string;
}

interface ConnectionsResponse {
  connections: AnonConnection[];
  cursor?: string;
  error?: string;
}

interface AnonResponse {
  url: string;
}

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [connections, setConnections] = useState<AnonConnection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Protect the dashboard route
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading state while checking auth
  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  const handleRefreshConnection = async () => {
    try {
      if (typeof window === 'undefined') {
        throw new Error('This function must be run in a browser environment');
      }

      const response = await fetch('/api/anon');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as AnonResponse;
      
      if (!data.url) {
        throw new Error('No URL returned from Anon API');
      }

      window.location.href = data.url;
    } catch (error) {
      console.error('Failed to generate Anon link:', error);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const handleUpdateRecords = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/connections', {
        method: 'GET',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as ConnectionsResponse;
      
      if (data.error) {
        throw new Error(data.error);
      }

      setConnections(data.connections);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Failed to fetch connections:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Now with Clerk UserButton */}
      <header className="bg-white/80 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex h-20 justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Friendship Economy</h1>
            <div className="flex items-center gap-6">
              <button className="text-gray-600 hover:text-gray-900">
                <BellIcon className="h-6 w-6" />
              </button>
              {/* Replace the user circle with Clerk's UserButton */}
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Matching homepage spacing */}
      <main className="max-w-7xl mx-auto px-8 pt-32">
        {/* LinkedIn Connection Status */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">LinkedIn Connection</h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`h-3 w-3 rounded-full ${connectionStatus.isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-lg text-gray-900">
                  {connectionStatus.isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <p className="text-gray-600">
                Last synced: {new Date(connectionStatus.lastConnected).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleRefreshConnection}
                className="px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800"
              >
                {connectionStatus.isConnected ? 'Refresh Connection' : 'Connect LinkedIn'}
              </button>
              <button 
                onClick={handleUpdateRecords}
                className="px-8 py-4 bg-gray-200 text-gray-900 rounded-full hover:bg-gray-300"
              >
                Update Records
              </button>
            </div>
          </div>
        </div>

        {/* Recent Connections */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm overflow-x-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Network Changes</h2>
          
          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-xl">
              {error}
            </div>
          )}
          
          {isLoading ? (
            <div className="text-center py-8">Loading connections...</div>
          ) : connections.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No connections found. Click &quot;Update Records&quot; to fetch your connections.
            </div>
          ) : (
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Person</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Current Role</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Previous Role</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Updated At</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {connections.map((connection) => {
                  const hasUpdate = connection.oldHeadline && connection.headline && connection.headline !== connection.oldHeadline;
                  return (
                    <tr key={connection.id} className={`hover:bg-gray-50 ${hasUpdate ? 'bg-blue-50/50' : ''}`}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={connection.profilePictureUrl || 'https://placekitten.com/100/100'}
                            alt={connection.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <span className="font-medium text-gray-900">{connection.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{connection.headline || 'Not available'}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{connection.oldHeadline || 'Not available'}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{connection.oldHeadlineUpdatedAt || 'Not available'}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{connection.status}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {connection.publicProfileUrl && (
                          <a 
                            href={connection.publicProfileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm mt-4 inline-block"
                          >
                            View LinkedIn Profile
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
