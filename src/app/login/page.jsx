import { login } from '@/components/auth/actions'
import Link from 'next/link'

export default function LoginPage() {
  return (

    <main className="flex items-center justify-center min-h-[calc(100vh-72px)]">

      <div className="w-full max-w-md p-8 space-y-8 bg-white border shadow-xl border-gray-200/50">
        

        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-blue-950 ">
            Sign In
          </h1>
          <p className="mt-2 text-sm text-gray-500 ">
            Access your account
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>

            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm appearance-none placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
              />
            </div>

          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm appearance-none placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-"
              />
            </div>
          </div>


          <div>
            <button
              formAction={login}
              type="submit"
              className="flex justify-center w-full px-4 py-3 text-sm font-semibold text-white transition-colors bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Pls add a forgot password feature :) */}
        <p className="mt-10 text-sm text-center text-gray-500 ">
          Don't have an account?{' '}
          <Link href="/signup" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  )
}