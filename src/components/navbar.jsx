"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from './auth/AuthProvider';
import { logOut } from '@/components/auth/actions';
import { Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">

        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold tracking-tight text-gray-100">
              Beauty Of The Making
              {/* ofc i'll change this :pf: */}
            </span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-100"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-x-12">
          {/* I'll be adding links here when i am done with the pages */}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <User className="w-6 h-6 text-gray-600" />
              </button>

              {isProfileOpen && (
                <div
                  className="absolute -right-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg"
                >
                  <div className="py-1">

                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-semibold">Welcome!</p>
                      <p className="truncate text-gray-500">{user.email || 'oops'}</p>
                    </div>
                    <Link href="/profile" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100">
                      My Profile
                    </Link>

                    <form action={logOut} className="w-full">
                      <button
                        type="submit"
                        className="text-red-600 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        role="menuitem"
                      >
                        Log Out
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-sm font-semibold leading-6 text-gray-100 transition-colors hover:text-white">
                Log in
              </Link>
              <Link href="/signup" className="bg-amber-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* {isMobileMenuOpen && (
      )} */}
    </header>
  );
}
