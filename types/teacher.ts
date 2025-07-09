export interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  address: string
  department: string
  status: "active" | "inactive" | "on-leave"
  experience: number
  subjects: string[]
  bio?: string
  avatar?: string
}
