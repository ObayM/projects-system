import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";

const createExcerpt = (markdown, length = 250) => {
  const text = markdown
    .replace(/!\[.*?\]\(.*?\)/g, '')   
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') 
    .replace(/#{1,6}\s/g, '')        
    .replace(/`{1,3}/g, '')           
    .replace(/[*>_-]/g, '');         
  
  if (text.length <= length) return text;
  return text.slice(0, length) + '…';
};


function DevlogCard({ devlog, username, projectSlug }) {
  const formattedDate = new Date(devlog.created_at).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });
  const excerpt = createExcerpt(devlog.body);

  return (
    <Link 
      href={`/u/${username}/${projectSlug}/devlogs/${devlog.id}`}
      className="block group"
    >
      <article className="bg-neutral-900 border border-neutral-700 p-6 shadow-lg shadow-orange-900/30 transition-all duration-300
       hover:border-orange-500 hover:scale-[1.02] hover:shadow-orange-700/40">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="grow">
            <h2 className="text-xl font-bold text-orange-400 group-hover:text-orange-300 transition-colors">
              {devlog.title ?? "A New Whisper from the Void"}
            </h2>
            <div className="text-sm text-neutral-300 mt-1">Scrawled on {formattedDate}</div>
            
            <p className="mt-4 text-neutral-200 leading-relaxed">
              {excerpt}
            </p>

          </div>
          {devlog.image_url && (
            <div className="shrink-0 w-full sm:w-40 h-32 overflow-hidden rounded-md border-2 border-neutral-700 group-hover:border-orange-600 transition-colors">
              <img 
                src={devlog.image_url} 
                alt={devlog.title ?? 'Devlog image'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
          )}
        </div>
        <div className="mt-4 text-sm font-semibold text-orange-500 group-hover:underline">
          Read the full scroll &rarr;
        </div>
      </article>
    </Link>
  );
}

export default async function DevlogListPage({ params }) {
  const supabase = await createClient();
  const { username, projectSlug } = await params;

  const { data: project } = await supabase
    .from("projects")
    .select("id, name, user_id")
    .eq("slug", projectSlug)
    .maybeSingle();

  if (!project) return notFound();

  const { data: { user } } = await supabase.auth.getUser();

  const isOwner = user && user.id === project.user_id;

  const { data: devlogs, error } = await supabase
    .from("public_devlogs")
    .select("*")
    .eq("project_id", project.id) 
    .order("created_at", { ascending: false });

  if (error) {
    console.error("The spirits failed to retrieve the scrolls:", error);
    return notFound();
  }

  return (
    <div className="min-h-[calc(100vh - 73px)] text-neutral-200">
      <main className="container mx-auto px-4 py-8 md:py-16">
        
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-12">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-orange-500 sm:text-4xl">
              The Saga of {project.name}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-neutral-200">
              Forbidden knowledge and visions captured from the aether during its creation.
            </p>
          </div>
          
          {isOwner && (
            <Link
              href={`/u/${username}/${projectSlug}/devlogs/new`}
              className="shrink-0 bg-orange-600 text-white font-semibold py-2 px-4  hover:bg-orange-700 transition-colors "
            >
              + Scribe a New Scroll
            </Link>
          )}
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {devlogs && devlogs.length > 0 ? (
            devlogs.map((devlog) => (
              <DevlogCard 
                key={devlog.id} 
                devlog={devlog} 
                username={username} 
                projectSlug={projectSlug} 
              />
            ))
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-neutral-100 rounded-lg">
              <p className="text-xl font-semibold text-neutral-300">The scrolls are blank.</p>
              <p className="mt-2 text-neutral-500">
                {isOwner 
                  ? "Begin the saga by scribing your first scroll." 
                  : "No whispers have been recorded from the void... yet."}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}