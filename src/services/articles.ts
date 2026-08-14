import { Article } from '@/types'
import { supabase } from '@/lib/supabase'

export async function getArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Article[]
}

export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data as Article
}

export async function saveArticle(article: Partial<Article>) {
  if (article.id) {
    const { data, error } = await supabase
      .from('articles')
      .update(article)
      .eq('id', article.id)
      .select()

    if (error) throw error
    return data[0] as Article
  } else {
    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select()

    if (error) throw error
    return data[0] as Article
  }
}
