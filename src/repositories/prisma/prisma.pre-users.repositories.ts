import { preUser } from '@prisma/client'
import { PreUserRepository } from '../pre-users.repositories'
import { prisma } from '../../lib/prisma'

export class PrismaPreUserRepository implements PreUserRepository {
  async findByEmail(email: string): Promise<preUser | null> {
    const user = await prisma.preUser.findFirst({
      where: {
        email,
      },
    })

    return user
  }

  async getById(id: string): Promise<preUser | null> {
    const user = await prisma.preUser.findFirst({
      where: {
        id,
      },
    })

    return user
  }
}
