"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Github, ExternalLink, CalendarDays, Ghost } from "lucide-react";

function ProjectSkeleton() {
  return (
    <div className=" min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-16 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          <div className="lg:col-span-2 space-y-6">
            <div className="w-full bg-neutral-800 h-96 rounded-xl shadow-lg shadow-orange-900/20"></div>
            <div className="bg-neutral-800 p-6 rounded-lg shadow-lg shadow-orange-900/20">
              <div className="h-8 bg-neutral-700 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-neutral-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-neutral-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-neutral-700 rounded w-3/4"></div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-neutral-800 p-6 rounded-lg shadow-lg shadow-orange-900/20">
              <div className="h-10 bg-neutral-700 rounded w-3/4 mb-4"></div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-neutral-700 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-5 bg-neutral-700 rounded w-32"></div>
                  <div className="h-4 bg-neutral-700 rounded w-24"></div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-800 p-6 rounded-lg space-y-4 shadow-lg shadow-orange-900/20">
              <div className="h-12 bg-neutral-700 rounded-md"></div>
              <div className="h-12 bg-neutral-700 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectPage({ params }) {
  const { username, projectSlug } = use(params);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${username}/${projectSlug}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "This Project could not be summoned from the abyss.");
        }
        
        const data = await response.json();
        setProject(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [username, projectSlug]); 

  if (loading) {
    return <ProjectSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-neutral-900 text-neutral-300 min-h-screen flex flex-col items-center justify-center text-center p-4">
        <Ghost className="w-20 h-20 text-orange-500 mb-4 animate-bounce" />
        <h1 className="text-4xl font-bold text-orange-500 [text-shadow:0_0_10px_#ea580c]">
          This Creation Has Vanished
        </h1>
        <p className="text-lg mt-2 text-neutral-400">{error}</p>
      </div>
    );
  }

  if (!project) return null; 

  const formattedDate = new Date(project.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className=" min-h-[calc(100vh-73px)]">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          <div className="lg:col-span-2">
            <img
                src={project.image_url}
                alt={project.name}
                className="w-full h-auto rounded-xl border-2 border-neutral-700  aspect-video object-cover mb-6 transition-all"
            />
            <div className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-700 shadow-lg shadow-orange-900/30">
                <h2 className="text-2xl font-bold text-orange-400 mb-4 border-b border-neutral-700 pb-2">The Dark Lore</h2>
                <p className="text-lg text-neutral-300 leading-relaxed whitespace-pre-wrap">
                    {project.description ?? "No incantation was scrawled for this creation."}
                </p>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
             <div className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-700 shadow-lg shadow-orange-900/30">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-orange-500">
                    {project.name}
                </h1>
                <div className="mt-4 flex items-center gap-3">
                    <img
                        src={project.owner_avatar_url ?? "https://hc-cdn.hel1.your-objectstorage.com/s/v3/30c0b5fbb35090336972b00ed3b42070edc5a1de_user.png"}
                        alt={project.owner_username}
                        className="w-12 h-12 rounded-full border-2 border-orange-500"
                    />
                    <div>
                        <div className="font-semibold text-neutral-100">{project.owner_full_name ?? project.owner_username}</div>
                        <div className="text-sm text-neutral-400">The Conjurer</div>
                    </div>
                </div>
            </div>

            <div className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-700 shadow-lg shadow-orange-900/30 space-y-4">
                 <h3 className="text-lg font-semibold text-orange-400 border-b pb-2 border-neutral-600">Portals</h3>
                 {project.deployed_url && (
                    <a href={project.deployed_url} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full gap-2 px-4 py-3 font-semibold text-black bg-amber-400 rounded-md">
                        <ExternalLink size={20} />
                        Witness the Specter
                    </a>
                )}
                {project.github_repo && (
                    <a href={project.github_repo} target="_blank" rel="noreferrer" className="flex items-center justify-center w-full gap-2 px-4 py-3 font-semibold text-neutral-200 bg-neutral-700 rounded-md hover:bg-neutral-600 transition-colors duration-200">
                        <Github size={20} />
                        Unseal the Grimoire
                    </a>
                )}
            </div>

             <div className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-700 shadow-lg shadow-orange-900/30">
                <h3 className="text-lg font-semibold text-orange-400 border-b pb-2 border-neutral-600 mb-4">Arcane Details</h3>
                <ul className="space-y-3 text-neutral-300">
                    <li className="flex items-center gap-3">
                        <CalendarDays size={20} className="text-orange-500" />
                        <span>Unleashed on {formattedDate}</span>
                    </li>
                </ul>
                <Link 
                    href={`/u/${username}/${projectSlug}/devlogs`}
                    className="mt-6 block w-full text-center px-4 py-2 font-semibold  border-2 bg-orange-300 border-orange-600/50 rounded-lg hover:bg-orange-400 hover:border-orange-500 transition-all duration-200"
                >
                   Creation's Saga (Devlogs)
                </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}