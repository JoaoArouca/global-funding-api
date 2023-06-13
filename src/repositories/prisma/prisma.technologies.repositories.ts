import { Technology } from '@prisma/client'
import { TechnologyRepository } from '../technologies.repositories'
import { prisma } from '../../lib/prisma'

export class PrismaTechnologyRepository implements TechnologyRepository {
  async findByName(name: string): Promise<Technology | null> {
    const tech = await prisma.technology.findFirst({
      where: { name },
    })

    return tech
  }
}
