import { Region } from '@prisma/client'

export interface RegionRepository {
  findByName(name: string): Promise<Region | null>
}
