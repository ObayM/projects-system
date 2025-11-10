import React from "react";
import { redirect, notFound } from "next/navigation";
import CreateDevlogForm from "./form";
import { createClient } from "@/utils/supabase/server";

export default async function NewDevlogPage({ params }) {
  const { username, projectSlug } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("id, user_id, name")
    .eq("slug", projectSlug)
    .maybeSingle();

  if (!project) notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", project.user_id)
    .maybeSingle();

  if (!profile || profile.username !== username) {
    notFound();
  }

  async function createDevlog(formData) {
    "use server";

    const supabase = await createClient();

    const title = (formData.get("title") || "").toString().trim() || null;
    const body = (formData.get("body") || "").toString().trim();
    const image_url = (formData.get("image_url") || "").toString().trim() || null;

    if (!body) throw new Error("The devlog content cannot be empty.");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    if (project.user_id !== user.id) {
      throw new Error("You are not authorized to create a devlog for this project :(");
    }

    const { data: insertData, error: insertError } = await supabase
      .from("devlogs")
      .insert({
        project_id: project.id,
        user_id: user.id,
        title,
        body,
        image_url,
        is_public: true,
      })
      .select("id")
      .single();

    if (insertError) {
        console.error("Error creating devlog:", insertError);
        throw new Error(insertError.message);
    }
    
    redirect(`/u/${username}/${projectSlug}/devlogs/${insertData.id}`);
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-neutral-900 sm:text-5xl">
              Create a New Devlog
            </h1>
            <p className="mt-3 text-lg text-neutral-600">
              For the project: <span className="font-bold text-neutral-800">{project.name}</span>
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              Your new entry will be publicly visible to everyone.
            </p>
          </div>

          <CreateDevlogForm action={createDevlog} />
        </div>
      </main>
    </div>
  );
}