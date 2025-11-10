'use client';
import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { ProjectCardSkeleton } from "@/components/projects/ProjectCard";


export default function ExplorePage() {
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({ message: "Failed to fetch projects" }));
          throw new Error(errorData.message || "Failed to fetch projects");
        }
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      }
    }
    loadProjects();
  }, []);


  if (error) {
    return (
      <div className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold text-red-600">
          Error Loading Projects
        </h2>
        <p className="mt-2 text-neutral-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">

          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
            Explore Projects
          </h1>

          <p className="mt-3 max-w-md mx-auto text-base text-neutral-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            See Amazing Stuff! Get inspired!  Share your projects.
          </p>


          {user && (
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link
                href="/projects/create"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3 font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Create a New Project
              </Link>
            </div>
          )}
        </div>

        <div className="mt-12">

          {projects === null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
            </div>
          ) : 

          projects.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-neutral-300 rounded-lg bg-neutral-50">
              <p className="text-xl font-semibold text-neutral-700">No projects shared yet.</p>
              <p className="mt-2 text-neutral-500">
                Why not be the first to share your work?
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}