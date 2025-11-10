'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import { ProjectCardSkeleton } from "@/components/projects/ProjectCard";

export default function MyProjectsPage() {
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects/currentUser");
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({ message: "Failed to fetch your projects" }));
          throw new Error(errorData.message || "Failed to fetch your projects");
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
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold text-red-600">
          Error Loading Your Projects
        </h2>
        <p className="mt-2 text-neutral-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-73px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
              My Projects
            </h1>
            <p className="mt-1 text-neutral-500">
              Manage and showcase your personal projects here.
            </p>
          </div>
          <Link
            href="/projects/create"
            className="mt-4 sm:mt-0 px-6 py-2.5 font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            + New Project
          </Link>
        </div>


        {projects === null ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </div>
        ) : 

        projects.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-neutral-300 rounded-lg bg-neutral-50">
            <h3 className="text-xl font-semibold text-neutral-700">You haven't created any projects yet.</h3>
            <p className="mt-2 text-neutral-500">
              Get started by creating your first one.
            </p>
            <div className="mt-6">
              <Link
                href="/projects/create"
                className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Create Your First Project
              </Link>
            </div>
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