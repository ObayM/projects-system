import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()

  const { data: projects, error } = await supabase
    .from('public_projects')
    .select('*, profiles(username)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }

  const projects_username = projects.map(project => {
    return {
      ...project,
      owner_username: project.profiles?.username,
      profiles: undefined,
    };
  });

  return NextResponse.json(projects_username);
}
