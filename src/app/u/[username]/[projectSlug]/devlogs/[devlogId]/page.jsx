import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default async function DevlogPage({ params }) {
  const supabase = await createClient();
  const { username, projectSlug, devlogId } = await params;

  const { data: project } = await supabase
    .from("public_projects")
    .select("id, name")
    .eq("slug", projectSlug)
    .eq("owner_username", username)
    .maybeSingle();

  if (!project) return notFound();

  const { data: devlog } = await supabase
    .from("public_devlogs")
    .select("*")
    .eq("id", devlogId)
    .maybeSingle();

  if (!devlog) return notFound();

  return (
    <div className="min-h-[calc(100vh-73px)]">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto mb-8">

          <Link 
            href={`/u/${username}/${projectSlug}/devlogs`} 
            className="flex items-center gap-2 text-neutral-600 hover:text-blue-600 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Back to Devlogs for {project.name}
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          <header className="text-center">

            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              {devlog.title ?? "Untitled Devlog"}
            </h1>

            <div className="mt-4 text-md text-neutral-500">
              Published by {devlog.owner_full_name ?? devlog.owner_username} on {formatDate(devlog.created_at)}
            </div>
          </header>

          {devlog.image_url && (
            <img 
              src={devlog.image_url} 
              alt={devlog.title || 'Devlog cover image'} 
              className="mt-12 mb-12 w-full rounded-xl border border-neutral-200 shadow-xl aspect-video object-cover" 
            />
          )}

          <div className="
            prose prose-lg mx-auto mt-12
            prose-headings:text-neutral-800 prose-headings:font-bold
            prose-a:text-blue-600 hover:prose-a:underline
            prose-strong:text-neutral-800
            prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:text-neutral-700
            prose-code:text-red-600 prose-code:bg-red-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
            prose-pre:bg-neutral-100 prose-pre:border prose-pre:border-neutral-200
            prose-img:rounded-lg prose-img:border prose-img:border-neutral-200
            prose-hr:border-neutral-200
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {devlog.body}
            </ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  );
}