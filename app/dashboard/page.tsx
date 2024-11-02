'use client';

import { BellIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useAuth, UserButton } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Mock data - replace with real data from your API
const connectionStatus = {
  isConnected: true,
  lastConnected: "2024-03-21T15:30:00Z"
};

const jobChanges = [
  {
    id: 1,
    name: "Sarah Chen",
    imageUrl: "https://placekitten.com/100/100",
    previousRole: "Senior Product Manager at Google",
    newRole: "Director of Product at Stripe",
    aiAnalysis: "Sarah's move appears motivated by career growth, moving from a senior IC role to a leadership position. The fintech industry's recent growth likely played a role in this transition."
  },
  // Add more mock data as needed
];

interface AnonResponse {
  url: string;
}

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

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
            <button 
              onClick={handleRefreshConnection}
              className="px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800"
            >
              {connectionStatus.isConnected ? 'Refresh Connection' : 'Connect LinkedIn'}
            </button>
          </div>
        </div>

        {/* Recent Job Changes */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Network Changes</h2>
          <div className="space-y-8">
            {jobChanges.map((person) => (
              <div key={person.id} className="border border-gray-100 rounded-xl p-6 hover:border-gray-200 transition-colors">
                <div className="flex items-start gap-6">
                  <Image
                    src={person.imageUrl}
                    alt={person.name}
                    width={72}
                    height={72}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-gray-500 line-through">{person.previousRole}</p>
                      <p className="text-gray-900 font-medium">{person.newRole}</p>
                    </div>
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                      <h4 className="text-sm font-bold text-gray-900 mb-2">AI Analysis</h4>
                      <p className="text-gray-600">{person.aiAnalysis}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
