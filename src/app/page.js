import Link from "next/link";

export default function Home(){
  return(
    <div className="min-h-screen flex justify-between items-center">
      <h1>Welcome to the best projects managemet app</h1>
      <Link href={"/logiin"}>Login</Link>
      <Link href={"/signup"}>Login</Link>
    </div>
  );
}
