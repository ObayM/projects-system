
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { Check, X, LoaderCircle } from "lucide-react";

const supabase = createClient();

const USERNAME_REGEX = /^[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?$/;

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default function OnboardingForm() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {user} = useAuth()
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  
  const debouncedUsername = useDebounce(username, 500);

  const router = useRouter();

  const checkAvailability = useCallback(async (name) => {

    if (!USERNAME_REGEX.test(name)) {
      setIsChecking(false);
      setIsAvailable(null);
      return;
    }
    setIsChecking(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", name)
        .maybeSingle();

      setIsAvailable(!data && !error);
    } catch (e) {
      setIsAvailable(false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {

    const name = debouncedUsername.trim().toLowerCase();
    if (name) {
      checkAvailability(name);
    } else {
      setIsAvailable(null);
    }
  }, [debouncedUsername, checkAvailability]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const candidate = username.trim().toLowerCase();

    if (!isAvailable) {
      setError("This name is taken or invalid. Please choose another.");
      return;
    }

    setLoading(true);

    try {

      const { error: insertError } = await supabase
        .from("profiles")
        .insert({ id: user.id, username: candidate });

      if (insertError) throw new Error(insertError.message);

      router.push("/projects");
      router.refresh();
    } catch (err) {
      setError(err.message ?? "An unknown force prevented the ritual.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="mt-8 max-w-sm mx-auto bg-white border border-neutral-700 rounded-lg p-6"
    >
      <div className="relative">
        <label htmlFor="username" className="sr-only">Username</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="your-conjurer-name"
          className="w-full pl-3 pr-10 py-3 bg-neutral-700 border border-neutral-600 rounded-md text-neutral-200 text-lg
          shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          maxLength={39}
          autoComplete="off"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">

          {isChecking && <LoaderCircle className="h-5 w-5 text-neutral-300 animate-spin" />}
          {!isChecking && isAvailable === true && <Check className="h-6 w-6 text-lime-400" />}
          {!isChecking && isAvailable === false && username.length > 0 && <X className="h-6 w-6 text-red-500" />}
        </div>
      </div>

      {error && (
        <p className="text-red-400 bg-red-900/50 border border-red-500/50 rounded-md p-3 mt-4 text-sm">
          {error}
        </p>
      )}
      {!error && isAvailable === false && username.length > 0 && (
         <p className="text-yellow-400 mt-2 text-sm">This name has already been claimed.</p>
      )}

      <div className="mt-6">
        <button
          type="submit"
          disabled={loading || isChecking || !isAvailable}
          className="w-full flex items-center justify-center px-6 py-3 font-semibold text-white
           bg-orange-600 rounded-lg cursor-pointer"
        >
          {loading ? "Carving Name..." : "Pledge Allegiance"}
        </button>
      </div>
    </form>
  );
}