import Image from "next/image";

export default function ProjectCard({ project }) {
  return (

<div className="group border border-gray-700 rounded-lg shadow-lg shadow-orange-900/50 bg-gray-800 overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-orange-700/60">
      <div className="overflow-hidden">
        <Image
          src={project.image_url}
          alt={project.name}
          width={400}
          height={225}

          className="w-full h-48 object-cover transition-all duration-300 group-hover:brightness-75 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">

          <h3 className="text-xl font-bold text-orange-400">{project.name}</h3>

          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              project.is_public
                ? "bg-green-900 text-green-300 border border-green-700" 
                : "bg-gray-700 text-gray-400 border border-gray-600"
            }`}
          >
            {project.is_public ? "Unleashed" : "Chained"}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-4 h-12 overflow-hidden">
          {project.description || "No description scrawled..."}
        </p>
        <div className="flex space-x-4">
          {project.deployed_url && (
            <a
              href={project.deployed_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-400 font-semibold"
            >
              Visit Haunt
            </a>
          )}
          {project.github_repo && (
            <a
              href={project.github_repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200"
            >
              View Grimoire
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
