import { PartnerTypeUncheckedCreateInput } from 'prisma'
import { prisma } from '../lib/prisma'

interface IPartnerTypes {
  getPartnerTypesByName(
    types: string[],
  ): Promise<PartnerTypeUncheckedCreateInput[]>
}

export class PartnerTypesService implements IPartnerTypes {
  async getPartnerTypesByName(
    types: string[],
  ): Promise<PartnerTypeUncheckedCreateInput[]> {
    const typesList = await Promise.all(
      types.map(async (type) => {
        const typeData = await prisma.partnerType.findFirst({
          where: {
            name: type,
          },
          select: {
            id: true,
            name: true,
          },
        })
        return typeData
      }),
    )

    const list = typesList.filter((type) => type !== null)

    return list
  }
}
