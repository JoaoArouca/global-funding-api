import { preUser } from '@prisma/client'

export interface PreUserRepository {
  findByEmail(email: string): Promise<preUser | null>
  getById(id: string): Promise<preUser | null>
}
