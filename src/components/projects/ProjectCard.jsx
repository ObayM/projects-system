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
      <div className="border border-neutral-700 rounded-lg shadow-lg shadow-orange-900/50 bg-neutral-900 overflow-hidden transition-transform h-full flex flex-col hover:scale-[1.02] ">
        <div className="overflow-hidden">
          <Image
            src={project.image_url}
            alt={project.name}
            width={400}
            height={225}
            className="w-full h-48 object-cover transition-all duration-300 group-hover:brightness-75 group-hover:scale-110"
          />
        </div>
        <div className="p-4 flex flex-col grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-orange-400">{project.name}</h3>
            <span
              className={`shrink-0 px-2 py-1 text-xs font-semibold rounded-full ${
                project.is_public
                  ? "bg-green-900 text-green-300 border border-green-700"
                  : "bg-neutral-700 text-neutral-400 border border-neutral-600"
              }`}
            >
              {project.is_public ? "Unleashed" : "Chained"}
            </span>
          </div>

          <p className="text-neutral-400 text-sm mb-4 h-12 overflow-hidden">
            {project.description || "No description scrawled..."}
          </p>

          <div className="flex space-x-4 mt-auto pt-4 border-t border-neutral-700 relative z-10">
            {project.deployed_url && (
              <a
                href={project.deployed_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stopPropagation}
                className="text-orange-500 hover:text-orange-400 font-semibold"
              >
                Visit Haunt
              </a>
            )}

            {project.github_repo &&
             (
              <a
                href={project.github_repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stopPropagation}
                className="text-neutral-400 hover:text-neutral-200"
              >
                View Grimoire
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}