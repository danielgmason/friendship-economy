'use client';

import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if already signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md fixed w-full border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Friendship Economy</h1>
            <nav className="flex gap-6 items-center">
              <a href="/use-cases" className="text-sm text-gray-600 hover:text-gray-900">Use Cases</a>
              <a href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</a>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 bg-black text-sm text-white rounded-lg hover:bg-gray-800 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <a href="/dashboard" className="px-4 py-2 bg-black text-sm text-white rounded-lg hover:bg-gray-800 transition-colors">
                  Dashboard
                </a>
              </SignedIn>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1.5 bg-gray-100 rounded-full">
            <span className="text-sm font-medium text-gray-900">Angel Investing, Simplified</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-gray-900 mb-6 tracking-tight">
            Turn Your Network Into A<br/>
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text">
              Deal Pipeline
            </span>
          </h1>
          <p className="text-xl text-gray-600 mx-auto max-w-2xl mb-12">
            Spot investment opportunities by tracking when friends start new ventures or join promising startups. Never miss another angel investment opportunity.
          </p>
          <div className="flex gap-4 justify-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                  Get Started
                </button>
              </SignInButton>
              <a href="/about" className="px-8 py-4 text-gray-600 hover:text-gray-900 transition-colors">
                Learn more →
              </a>
            </SignedOut>
            <SignedIn>
              <a href="/dashboard" className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                Go to Dashboard
              </a>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}
