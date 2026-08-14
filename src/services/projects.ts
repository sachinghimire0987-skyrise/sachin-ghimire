import { Project } from '@/types'
import { supabase } from '@/lib/supabase'

export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Project[]
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data as Project
}

export async function saveProject(project: Partial<Project>) {
  if (project.id) {
    const { data, error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', project.id)
      .select()

    if (error) throw error
    return data[0] as Project
  } else {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()

    if (error) throw error
    return data[0] as Project
  }
}
