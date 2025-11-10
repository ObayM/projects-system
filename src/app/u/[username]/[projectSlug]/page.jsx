"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  Github,
  ExternalLink,
  CalendarDays,
  ServerCrash,
  BookOpen,
} from "lucide-react";


function ProjectSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-50/50">
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-16 animate-pulse">
        <div className="mb-8 md:mb-12">
          <div className="h-10 bg-neutral-200 rounded w-3/4 mb-4"></div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-neutral-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-5 bg-neutral-200 rounded w-32"></div>
              <div className="h-4 bg-neutral-200 rounded w-24"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="w-full bg-neutral-200 h-96 rounded-xl"></div>
            <div>
              <div className="h-8 bg-neutral-200 rounded w-1/3 mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-neutral-200 rounded w-full"></div>
                <div className="h-4 bg-neutral-200 rounded w-full"></div>
                <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white border border-neutral-200 p-6 rounded-lg space-y-4">
              <div className="h-12 bg-neutral-200 rounded-lg"></div>
              <div className="h-12 bg-neutral-200 rounded-lg"></div>
              <div className="h-12 bg-neutral-200 rounded-lg"></div>
              <div className="h-px bg-neutral-200 my-2"></div>
              <div className="h-5 bg-neutral-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectPage({params}) {
  const { username, projectSlug } = use(params);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (!username || !projectSlug) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/projects/${username}/${projectSlug}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Could not find this project :("
          );
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
      <div className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center text-center p-4 bg-neutral-50">
        <ServerCrash className="w-20 h-20 text-red-400 mb-4" />
        <h1 className="text-4xl font-bold text-neutral-800">
          Something Went Wrong
        </h1>
        <p className="text-lg mt-2 text-neutral-600">{error}</p>
        <Link href="/" className="mt-8 px-6 py-2 font-semibold text-blue-600 border-2 border-blue-200 rounded-full hover:bg-blue-50 transition-colors">
          Go Home
        </Link>
      </div>
    );
  }

  if (!project) return null;

  const formattedDate = new Date(project.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="min-h-[calc(100vh-73px)] bg-neutral-50/50">
      <main className="container mx-auto max-w-6xl px-4 py-8 md:py-16">
        
        <header className="mb-8 md:mb-12 border-b border-neutral-200 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
                {project.name}
            </h1>
            <Link href={`/u/${username}`} className="mt-4 inline-flex items-center gap-3 group">
                <img
                    src={project.owner_avatar_url ?? "https://avatar.vercel.sh/default.png"}
                    alt={project.owner_username}
                    className="w-12 h-12 rounded-full border-2 border-neutral-300 group-hover:border-blue-500 transition-colors"
                />
                <div>
                    <div className="font-semibold text-neutral-800 group-hover:text-blue-600 transition-colors">{project.owner_full_name ?? project.owner_username}</div>
                    <div className="text-sm text-neutral-500">Project Owner</div>
                </div>
            </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          <div className="lg:col-span-2">
            <img
              src={project.image_url}
              alt={project.name}
              className="w-full h-auto rounded-xl border border-neutral-200 shadow-xl aspect-video object-cover mb-8"
            />
            <div className="prose prose-neutral max-w-none lg:prose-lg">
              <h2 className="text-3xl font-bold  mb-6 border-l-4 border-blue-500 pl-4">
                About this Project
              </h2>
                <p>
                    {project.description ?? "No description was provided for this project."}
                </p>
            </div>
          </div>

          <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
             <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm space-y-4">

                 <Link 
                    href={`/u/${username}/${projectSlug}/devlogs`}
                    className="flex items-center justify-center w-full gap-2 px-4 py-3 font-semibold
                     text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 transition-all duration-200 transform hover:scale-[1.02]"
                >
                   <BookOpen size={20} />
                   View Devlogs
                </Link>

                 {project.deployed_url && (
                    <a href={project.deployed_url} target="_blank" rel="noreferrer"
                     className="flex items-center justify-center w-full gap-2 px-4 py-3 font-semibold
                      text-neutral-700 bg-white border border-neutral-300 rounded-lg shadow-sm hover:bg-neutral-100 transition-colors">
                        <ExternalLink size={20} />
                        Live Demo
                    </a>
                )}
                {project.github_repo && (
                    <a href={project.github_repo} target="_blank" rel="noreferrer" 
                    className="flex items-center justify-center w-full gap-2 px-4 py-3 font-semibold
                     text-neutral-700 bg-white border border-neutral-300 rounded-lg shadow-sm hover:bg-neutral-100 transition-colors">
                        <Github size={20} />
                        View Source Code
                    </a>
                )}
                
                {(project.deployed_url || project.github_repo) && <hr className="border-neutral-200 my-6!" />}
                
                <ul className="space-y-3 text-neutral-600 text-sm pt-2">
                    <li className="flex items-center gap-3">
                        <CalendarDays size={18} className="text-neutral-400" />
                        <span>Created on {formattedDate}</span>
                    </li>
                </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}