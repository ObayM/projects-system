'use client';

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="relative min-h-[calc(100vh-73px)] flex flex-col justify-center items-center p-4 sm:p-8">
      
        <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-linear-to-r from-neutral-800 to-slate-800 tracking-tighter mb-4">
          Shiplog
        </h1>

        <p className="text-lg md:text-xl text-neutral-800 max-w-2xl mx-auto mb-10 text-center">
          From idea to launch. Organize, track, and document your coding journey, all in one beautiful place.
        </p>
        
        {user ? (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/projects"
              className="px-8 py-3 font-semibold text-white bg-blue-700 rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-105"
            >
              Go to Your Projects
            </Link>
            <Link
              href="/explore"
              className="px-8 py-3 font-semibold text-neutral-800 bg-white border border-neutral-300 rounded-full shadow-lg hover:bg-neutral-100 transition-all duration-300 transform hover:scale-105"
            >
              Explore Others
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-3 font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Get Started for Free
            </Link>
            <Link
              href="/login"
              className="group text-neutral-600 font-medium hover:text-black transition-colors duration-300"
            >
              Have an account? <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Log in &rarr;</span>
            </Link>
          </div>
        )}
    </main>
  );
}