'use client';
import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function ExplorePage() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const {user} = useAuth()

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
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
    <div className="min-h-[calc(100vh - 72px)] text-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
            <h1 className="text-3xl font-extrabold text-orange-500 sm:text-4xl md:text-5xl ">
                Creations Unleashed
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-neutral-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Witness the terrifying creations summoned and unleashed by our coven.
            </p>

            {user && (
                 <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                    <div className="">

                        <Link
                            href="/projects/create"
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent
                             font-medium text-white bg-orange-600 hover:bg-orange-700 md:py-4 md:text-lg md:px-10"
                        >
                            Unleash Your Own Creation
                        </Link>
                    </div>
                 </div>
            )}
        </div>

        <div className="mt-12">
            {projects.length === 0 ? (

                <div className="text-center py-16 border-2 border-dashed border-neutral-50 rounded-lg">
                    <p className="text-xl font-semibold text-neutral-200">The abyss is silent... for now :(</p>
                    <p className="mt-2 text-neutral-100">
                        Be the first to unleash a creation  yay :)
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