import { Sector } from '@prisma/client'
import { SectorRepository } from '../sectors.repositories'
import { prisma } from '../../lib/prisma'

export class PrismaSectorRepository implements SectorRepository {
  async findByName(name: string): Promise<Sector | null> {
    const sector = await prisma.sector.findFirst({
      where: { name },
    })
    return sector
  }
}
