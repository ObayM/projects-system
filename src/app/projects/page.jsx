'use client';
import { redirect } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";

export default function MyProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  if (!user) redirect("/login");

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects/all");
        if (!res.ok) throw new Error("Failed to fetch creations");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      }
    }
    loadProjects();
  }, []);

  if (error) return <div className="text-center text-red-500 text-2xl font-bold animate-pulse">A terrible presence is felt: {error}</div>;

  return (
    <div className="min-h-[calc(100vh-72px)] text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-orange-500 [text-shadow:0_0_10px_#ea580c]">
            My Creations
          </h1>

          <Link
            href="/projects/create"
            className="bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-orange-700 transition-colors hover:shadow-lg hover:shadow-orange-500/50"
          >
            + Summon New Creation
          </Link>
        </div>

        {projects.length === 0 ? (

    <div className="text-center py-16 border-2 border-dashed border-gray-700 rounded-lg">
            <p className="text-gray-400 text-lg">Your grimoire is empty :(</p>
            <Link
              href="/projects/create"
              className="mt-4 inline-block text-orange-500 hover:underline hover:text-orange-400 font-bold"
            >
              Begin your dark work...
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}