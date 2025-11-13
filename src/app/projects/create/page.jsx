'use client';

import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter, redirect } from "next/navigation";


const generateSlug = (name) => {
    return name
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};

export default function CreateProject() {
    const { user } = useAuth();
    const router = useRouter();

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [githubRepo, setGithubRepo] = useState('');
    const [deployedUrl, setDeployedUrl] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    if (!user) {
        redirect("/login");
    }
    
    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        setSlug(generateSlug(newName));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const projectData = {
            name,
            slug,
            description,
            github_repo: githubRepo,
            deployed_url: deployedUrl,
            is_public: true,
        };

        const response = await fetch('/api/projects/currentUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.error || 'An unexpected error occurred.');
            setIsSubmitting(false);
        } else {
            router.push('/projects');
            router.refresh();
        }
    };

    return (
        <div className="min-h-[calc(100vh-73px)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
                        Create a New Project
                    </h1>
                    <p className="mt-2 text-lg text-neutral-500">
                        Fill out the details below to start your project!
                    </p>
                </div>


                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg border border-neutral-200 shadow-lg">
                    
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-md">
                            {error}
                        </div>
                    )}
                    
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700">Project Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            required
                            placeholder="e.g., My cool thing"
                            className="mt-1 block w-full px-3 py-2  border border-neutral-600 
                            rounded-md  shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-neutral-700">Project Slug (URL)</label>
                        <input
                            id="slug"
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-neutral-600 rounded-md  cursor-not-allowed"
                            readOnly
                        />

                        <p className="text-xs text-neutral-500 mt-1">
                            URL will be: /u/{user?.username || 'username'}/{slug}
                        </p>
                    </div>
                    
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-neutral-700">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            required
                            placeholder="Describe what your project is about..."
                            className="mt-1 block w-full px-3 py-2  border border-neutral-600 
                            rounded-md  shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="githubRepo" className="block text-sm font-medium text-neutral-700">GitHub Repository</label>
                            <input id="githubRepo" type="url" placeholder="https://github.com/user/repo" value={githubRepo} onChange={(e) => setGithubRepo(e.target.value)} required 
                            className="mt-1 block w-full px-3 py-2  border border-neutral-600 
                            rounded-md  shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="deployedUrl" className="block text-sm font-medium text-neutral-700">Live URL</label>
                            <input id="deployedUrl" type="url" placeholder="https://my-app.com" value={deployedUrl} onChange={(e) => setDeployedUrl(e.target.value)} required 
                            className="mt-1 block w-full px-3 py-2  border border-neutral-600 
                            rounded-md  shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>

                    {/* <div className="flex items-center">
                        <input
                            id="isPublic"
                            type="checkbox"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                            className="h-4 w-4 rounded border-neutral-300 accent-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="isPublic" className="ml-2 block text-sm text-neutral-700">Make this project public</label>
                    </div> */}

                    <div className="flex justify-end pt-4 border-t border-neutral-200">

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex justify-center rounded-full bg-blue-600 py-2 px-6 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}