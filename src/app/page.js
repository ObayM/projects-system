'use client';

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="relative min-h-[calc(100vh-73px)] flex flex-col justify-center items-center overflow-hidden p-8">
      
      <div className="z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-linear-to-r from-neutral-200 to-slate-200 tracking-tighter mb-4">
          Shiplog
        </h1>

        <p className="text-lg md:text-xl text-neutral-100 max-w-2xl mx-auto mb-10">
          From idea to launch. Organize, track, and document your coding journey, all in one beautiful place.
        </p>
        
        {user ? (
          <div className="flex justify-center items-center gap-4">
            <Link
              href="/projects"
              className="px-8 py-3 font-semibold text-white bg-blue-700 rounded-full hover:bg-blue-800 transition-colors duration-300 transform hover:scale-105"
            >
              Continue your stuff!
            </Link>
              <Link
              href="/explore"
              className="px-8 py-3 font-semibold text-black bg-white rounded-full hover:bg-neutral-200 transition-colors duration-300 transform hover:scale-105"
            >
              Explore cool stuff!
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-3 font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition-colors duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="group text-neutral-300 font-medium hover:text-white transition-colors duration-300"
            >
              Have an account? <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Log in &rarr;</span>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}