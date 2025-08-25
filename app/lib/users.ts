import bcrypt from 'bcryptjs'

export interface User {
  id: string
  name: string
  email: string
  password: string
  image: string
}

// Shared mock user database - in production, use a real database
export let users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Beloop Store',
    email: 'beloopstore@gmail.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Mohammed Nabeel',
    email: 'mnabeelca123@gmail.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  }
]

export function findUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email)
}

export function addUser(user: User): void {
  users.push(user)
}

export function findUserById(id: string): User | undefined {
  return users.find(user => user.id === id)
}
