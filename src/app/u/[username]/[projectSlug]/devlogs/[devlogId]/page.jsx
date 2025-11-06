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
    <div className=" min-h-[calc(100vh-73px)] text-white">
      <main className="container mx-auto px-4 py-8 md:py-16">

        <div className="max-w-4xl mx-auto mb-8">
          <Link 
            href={`/u/${username}/${projectSlug}/devlogs`} 
            className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors font-semibold"
          >
            <ArrowLeft size={20} />
            Return to the Saga
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">

          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-orange-400 sm:text-5xl">
              {devlog.title ?? "A Whisper from the Void"}
            </h1>
            <div className="mt-4 text-md text-neutral-300">
              A scroll scrawled by {devlog.owner_full_name ?? devlog.owner_username} on {formatDate(devlog.created_at)}
            </div>
          </div>

          {devlog.image_url && (
            <img 
              src={devlog.image_url} 
              alt={devlog.title} 
              className="mt-12 mb-12 w-full rounded-xl border-2 border-neutral-700 shadow-2xl shadow-orange-800/40 aspect-video object-cover" 
            />
          )}

          <article className="
            prose prose-invert prose-lg mx-auto mt-8
            prose-headings:text-orange-400 prose-headings:font-bold
            prose-a:text-lime-400 prose-a:font-semibold hover:prose-a:text-lime-300 prose-a:transition-colors
            prose-strong:text-neutral-100
            prose-blockquote:border-l-4 prose-blockquote:border-orange-600 prose-blockquote:text-neutral-300 prose-blockquote:italic
            prose-code:text-red-400 prose-code:bg-neutral-800/50 prose-code:px-1.5 prose-code:py-1 prose-code:rounded-md
            prose-pre:bg-neutral-800/80 prose-pre:border prose-pre:border-neutral-700
            prose-img:rounded-lg prose-img:border prose-img:border-neutral-700
            prose-hr:border-neutral-700
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {devlog.body}
            </ReactMarkdown>
          </article>
        </div>
      </main>
    </div>
  );
}