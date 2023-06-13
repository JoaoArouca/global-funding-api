import { Technology } from '@prisma/client'

export interface TechnologyRepository {
  findByName(name: string): Promise<Technology | null>
}
