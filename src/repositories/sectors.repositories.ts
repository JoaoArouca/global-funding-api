import { Sector } from '@prisma/client'

export interface SectorRepository {
  findByName(name: string): Promise<Sector | null>
}
