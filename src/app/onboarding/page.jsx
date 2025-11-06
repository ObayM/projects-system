import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import OnboardingForm from "./OnboardingForm";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();



  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle(); 

  if (profile) {
    redirect("/projects");
  }

  return (
    <div className=" min-h-[calc(100vh-73px)] flex items-center justify-center p-4">
      <main className="container max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-orange-500 sm:text-5xl">
          Choose Your name!
        </h1>
        <p className="mt-4 text-lg text-neutral-200">
          This will be your mark within the coven, an eternal sigil for your public grimoire. Choose wisely, as it cannot be changed.
        </p>
        <p className="mt-2 text-sm text-neutral-100">
          Your creations will be found at: <code>/u/your-chosen-name</code>
        </p>

        <OnboardingForm />
      </main>
    </div>
  );
}