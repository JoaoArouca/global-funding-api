import { PartnerType } from '@prisma/client'
import { PartnerTypeRepository } from '../partner-types.repositories'
import { prisma } from '../../lib/prisma'

export class PrismaPartnerTypeRepository implements PartnerTypeRepository {
  async findByName(name: string): Promise<PartnerType | null> {
    const partnerType = await prisma.partnerType.findFirst({
      where: { name },
    })

    return partnerType
  }
}
