import { PartnerType } from '@prisma/client'

export interface PartnerTypeRepository {
  findByName(name: string): Promise<PartnerType | null>
}
