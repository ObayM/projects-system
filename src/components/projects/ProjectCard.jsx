import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project }) {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <Link 
      href={`/u/${project.owner_username}/${project.slug}`} 
      className="block group"
    >
      <div className="border border-neutral-200 rounded-lg shadow-md bg-white overflow-hidden transition-all duration-300 h-full flex flex-col hover:shadow-xl hover:scale-[1.02]">
        
        <div className="overflow-hidden">
          <Image
            src={project.image_url}
            alt={project.name}
            width={400}
            height={225}
            className="w-full h-48 object-cover transition-all duration-300 group-hover:brightness-95 group-hover:scale-110"
          />
        </div>

        <div className="p-4 flex flex-col grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-neutral-800">{project.name}</h3>

            <span
              className={`shrink-0 px-2 py-1 text-xs font-semibold rounded-full ${
                project.is_public
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-neutral-100 text-neutral-800 border border-neutral-200"
              }`}
            >
              {project.is_public ? "Public" : "Private"}
            </span>
          </div>

          <p className="text-neutral-600 text-sm mb-4 h-12 overflow-hidden">
            {project.description || "No description available."}
          </p>

          <div className="flex space-x-4 mt-auto pt-4 border-t border-neutral-200 relative z-10">
            {project.deployed_url && (
              <a
                href={project.deployed_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stopPropagation}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Live Demo
              </a>
            )}

            {project.github_repo && (
              <a
                href={project.github_repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stopPropagation}
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="border border-neutral-200 rounded-lg shadow-md bg-white overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-neutral-200"></div>
      <div className="p-4">
        <div className="h-6 w-3/4 bg-neutral-200 rounded mb-3"></div>
        <div className="h-4 w-1/2 bg-neutral-200 rounded mb-4"></div>
        <div className="mt-auto pt-4 border-t border-neutral-200 flex space-x-4">
          <div className="h-5 w-20 bg-neutral-200 rounded"></div>
          <div className="h-5 w-20 bg-neutral-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}