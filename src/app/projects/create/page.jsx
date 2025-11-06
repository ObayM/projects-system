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

// I tried to make this as SpOOkY as possible 😭, sorry if it looks super wierd, it's just a theme, i promise, i'll change it later to a glassy cool one :)

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

    if (!user) redirect("/login");
    
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
            is_public: isPublic,
        };

        const response = await fetch('/api/projects/currentUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.error || 'An error happened :(');
            setIsSubmitting(false);
        } else {
            router.push('/projects');
            router.refresh();
        }
    };

    return (
        <div className="min-h-[calc(100vh-73px)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="absolute left-20 top-2/9 text-4xl font-bold text-center 
                rotate-320 text-orange-500 [text-shadow:0_0_10px_#ea580c] mb-8">
                    Summon a New Creation
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8 bg-neutral-800 p-8 shadow-lg shadow-orange-900/50 border border-neutral-700">
                    
                    {error && <div className="p-4 bg-red-900/50 border border-red-500 text-red-300 
                    rounded-md animate-pulse">{error}</div>}
                    
                    <div>

                        <label htmlFor="name" className="block text-sm font-medium text-orange-400">Creation's Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            required
                            placeholder="e.g., The Midnight Haunter"
                            className="mt-1 block w-full px-3 py-2 bg-neutral-700 border border-neutral-600 
                            rounded-md text-neutral-200 shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-orange-400">Runic Sigil (URL)</label>
                        <input
                            id="slug"
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-neutral-600 rounded-md bg-neutral-900 text-neutral-400 cursor-not-allowed"
                            readOnly
                        />
                        <p className="text-xs text-neutral-500 mt-1">you/creations/{slug}</p>
                    </div>
                    
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-orange-400">Forbidden Knowledge</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            required
                            placeholder="Scribe the dark purpose of this creation..."
                            className="mt-1 block w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-neutral-200 shadow-sm 
                            focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="githubRepo" className="block text-sm font-medium text-orange-400">Grimoire's Location (GitHub)</label>
                            <input id="githubRepo" type="url" value={githubRepo} onChange={(e) => setGithubRepo(e.target.value)} required 
                            className="mt-1 block w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-neutral-200 shadow-sm 
                            focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                        </div>
                        <div>
                            <label htmlFor="deployedUrl" className="block text-sm font-medium text-orange-400">Haunt's Address (URL)</label>
                            <input id="deployedUrl" type="url" value={deployedUrl} onChange={(e) => setDeployedUrl(e.target.value)} required 
                            className="mt-1 block w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md text-neutral-200 shadow-sm 
                            focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                        </div>
                    </div>

                    <div className="flex items-center">

                        <input
                            id="isPublic"
                            type="checkbox"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                            className="h-4 w-4 accent-orange-600 bg-neutral-700 border-neutral-600 rounded focus:ring-orange-500"
                        />
                        <label htmlFor="isPublic" className="ml-2 block text-sm text-neutral-300">Unleash upon the world?</label>
                    </div>

                    <div className="flex justify-end pt-4">

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-orange-700
                             transition-colors disabled:bg-neutral-600 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-orange-500/50"
                        >
                            {isSubmitting ? 'Conjuring...' : 'Conjure Creation'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}