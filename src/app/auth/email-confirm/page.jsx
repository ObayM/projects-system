'use client';

import { useSearchParams } from 'next/navigation';
import { Mail } from 'lucide-react';

export default function AuthConfirmPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div className="min-h-[calc(100vh-73px)] text-gray-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center bg-neutral-800 border border-gray-700 p-8 shadow-2xl shadow-orange-900/40">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-600/20 p-4 rounded-full border-2 border-orange-500/50">
            <Mail className="w-12 h-12 text-orange-400 animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-orange-400">
          Confirm your email
        </h1>
        
        <p className="mt-4 text-gray-300">
          A sacred confirmation link has been sent to the aetherial address:
        </p>
        
        {email && (
          <p className="mt-2 text-lg font-semibold text-white bg-gray-700/50 inline-block px-4 py-2 rounded-md">
            {email}
          </p>
        )}
        
        <p className="mt-6 text-sm text-gray-500">
          Click the link in the email to complete the ritual and unleash your account.
        </p>
      </div>
    </div>
  );
}