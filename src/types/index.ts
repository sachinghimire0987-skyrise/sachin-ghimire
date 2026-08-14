export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category_id: string
  category?: Category
  tags?: Tag[]
  cover_image: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  image: string
  link: string
  tags: string[]
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
}

export interface Tag {
  id: string
  name: string
  slug: string
}
