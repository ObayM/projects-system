import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-73px)] flex flex-col justify-center items-center overflow-hidden  p-8">
      
      <div className="z-10 text-center">
        
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-800 to-orange-200 mb-4 ">
          ProjectY
        </h1>

        <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-8">
          Here, you can organize, start and track and document every single coding project you have, from automation and integrations to devlogs to see your journey again
        </p>
        
        <div className="flex justify-center gap-6">
          <Link
            href={"/signup"}
            className="px-8 py-3 font-semibold text-white bg-linear-to-r from-orange-500 to-amber-600"
          >
            Get Started
          </Link>
          <Link
            href={"/login"}
            className="px-8 py-3 font-semibold text-white bg-amber-800"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}