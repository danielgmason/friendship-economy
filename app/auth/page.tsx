'use client';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Logo/Header Section */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold tracking-tight">
          Friendship Economy
        </h1>
        <h2 className="mt-6 text-center text-2xl leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      {/* Auth Card */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <div className="space-y-6">
            {/* Placeholder for Clerk Auth */}
            <div className="flex flex-col gap-6">
              <button
                className="flex w-full justify-center rounded-md bg-black px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800"
              >
                Continue with Google
              </button>
              <button
                className="flex w-full justify-center rounded-md bg-[#1DA1F2] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1a8cd8]"
              >
                Continue with Twitter
              </button>
              <button
                className="flex w-full justify-center rounded-md bg-[#0A66C2] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#084d92]"
              >
                Continue with LinkedIn
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-500">or</span>
              </div>
            </div>

            <div className="mt-10 text-center text-sm text-gray-500">
              By continuing, you agree to our{' '}
              <a href="/terms" className="font-semibold leading-6 text-black hover:text-gray-700">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="font-semibold leading-6 text-black hover:text-gray-700">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
