import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";

export default async function ExplorePage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: projects, error } = await supabase
    .from('public_projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (

    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <p className="text-center text-red-500 text-2xl font-bold animate-pulse">
            The spirits refuse to answer. Better luck next time :(
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh - 72px)] text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
            <h1 className="text-4xl font-extrabold text-orange-500 sm:text-5xl md:text-6xl [text-shadow:0_0_15px_#ea580c]">
                Creations Unleashed
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Witness the terrifying creations summoned and unleashed by our coven.
            </p>

            {user && (
                 <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                    <div className="rounded-md shadow">

                        <Link
                            href="/projects/create"
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 md:py-4 md:text-lg md:px-10 transition-colors hover:shadow-lg hover:shadow-orange-500/50"
                        >
                            Unleash Your Own Creation
                        </Link>
                    </div>
                 </div>
            )}
        </div>

        <div className="mt-12">
            {projects.length === 0 ? (

                <div className="text-center py-16 border-2 border-dashed border-gray-700 rounded-lg">
                    <p className="text-xl font-semibold text-gray-300">The abyss is silent... for now :(</p>
                    <p className="mt-2 text-gray-500">
                        Be the first to unleash a creation into the void yay :)
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