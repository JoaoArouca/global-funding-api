import { Region } from '@prisma/client'
import { RegionRepository } from '../regions.repositories'
import { prisma } from '../../lib/prisma'

export class PrismaRegionRepository implements RegionRepository {
  async findByName(name: string): Promise<Region | null> {
    const region = await prisma.region.findFirst({
      where: { name },
    })
    return region
  }
}
