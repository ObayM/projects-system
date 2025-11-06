import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { username, projectSlug } =await params;

  if (!username || !projectSlug) {
    return NextResponse.json(
      { message: "Username and project slug are required" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("public_projects")
    .select(
      `
      id,
      name,
      slug,
      description,
      deployed_url,
      github_repo,
      image_url,
      created_at,
      owner_username,
      owner_full_name,
      owner_avatar_url
    `
    )
    .eq("slug", projectSlug)
    .eq("owner_username", username)
    .single();

  if (error || !project) {

    if (error) {
      console.error("Supabase Error:", error.message);
    }
    return NextResponse.json(
      { message: "Project not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(project, { status: 200 });
}