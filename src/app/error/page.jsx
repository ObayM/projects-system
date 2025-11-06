

export default function ErrorPage() {

  return (
    <div className=" min-h-[calc(100vh-73px)] text-gray-300 flex flex-col items-center justify-center text-center p-4">
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-orange-500">
        An unspeakable horror occurred :(
      </h1>
      
      <p className="mt-4 max-w-xl text-lg text-gray-400">
        Our scrying pool has revealed a dark omen. A restless spirit has disrupted the connection to this page.
      </p>

      <div className="mt-6 max-w-2xl w-full bg-gray-800/50 border border-gray-700 rounded-md p-4 text-left">
        <p className="text-sm font-semibold text-red-400">The Cursed Scroll Reads:</p>
        <code className="mt-2 block text-xs text-red-300 whitespace-pre-wrap">
          { 'An unknown entity caused a disturbance.'}
        </code>
      </div>
      

    </div>
  );
}