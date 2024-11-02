'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header - Simplified, minimal navbar */}
      <header className="bg-white/80 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex h-20 justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Friendship Economy</h1>
            <nav className="flex gap-8 items-center">
              <a href="/use-cases" className="text-gray-600 hover:text-gray-900">Use Cases</a>
              <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-6 py-2.5 bg-black text-white rounded-full hover:bg-gray-800">
                    Get started now →
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <a href="/dashboard" className="text-gray-600 hover:text-gray-900 mr-4">
                  Dashboard
                </a>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Centered, clean typography */}
      <div className="pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-[72px] font-bold leading-tight text-gray-900 mb-6">
            Never miss an <br/>
            opportunity.
          </h1>
          <p className="text-xl text-gray-600 mx-auto max-w-2xl mb-12">
            Build the digital version of your professional network to scale
            your investment opportunities and availability, infinitely.
          </p>
          <div className="flex gap-4 justify-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800">
                  Try now
                </button>
              </SignInButton>
              <a href="/browse" className="px-8 py-4 text-gray-900 hover:text-gray-600">
                Browse network →
              </a>
            </SignedOut>
            <SignedIn>
              <a href="/dashboard" className="px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800">
                Go to Dashboard
              </a>
              <a href="/browse" className="px-8 py-4 text-gray-900 hover:text-gray-600">
                Browse network →
              </a>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}