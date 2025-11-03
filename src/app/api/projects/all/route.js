import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }

  return NextResponse.json(projects);
}


const createProjectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  slug: z.string()
    .min(1, 'Slug is required')
    .max(50)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be a valid URL-friendly string '),
  description: z.string().max(500).optional(),
  github_repo: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  deployed_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  image_url: z.string().url('Must be a valid URL').optional(),
  is_public: z.boolean().default(false),
});


export async function POST(request) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const validationResult = createProjectSchema.safeParse(body);

  if (!validationResult.success) {
    console.log(validationResult)
    return NextResponse.json(
      { error: `Invalid input ${validationResult.error}`, details: validationResult.error.flatten() },
      { status: 400 }
    );
  }
  
  const validatedData = validationResult.data;
  const { data: newProject, error } = await supabase
    .from('projects')
    .insert({
      ...validatedData,
      user_id: user.id, 
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
  
    if (error.code === '23505') { 
       return NextResponse.json(
        { error: 'A project with this slug already exists for your account.' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }

  return NextResponse.json(newProject, { status: 201 }); 
}