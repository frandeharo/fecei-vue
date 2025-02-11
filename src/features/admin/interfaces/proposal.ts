export interface Proposal {
  id?: number
  project_title: string
  resumen: string
  category_id: number
  proponent: string
  category_name: string
  entity: string
  location: string
  phone_contact: string
  email: string
  candidate: string
  title: string
  doc_1: string | null
  doc_2: string | null
  doc_3: string | null
  doc_4: string | null
  development: string
  scope: string
  results: string
  image: string | null
  testimony_name: string
  testimonial: string
  testimony_name_2: string
  testimonial_2: string
  testimony_name_3: string
  testimonial_3: string
  links: string[]
  status: string
  created_at?: string
  updated_at?: string
  user_name?: string
}
