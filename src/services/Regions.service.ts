import { RegionUncheckedCreateInput } from 'prisma'
import { prisma } from '../lib/prisma'

interface IRegionsService {
  getRegionByName(regions: string[]): Promise<RegionUncheckedCreateInput[]>
}

export class RegionsService implements IRegionsService {
  async getRegionByName(
    regions: string[],
  ): Promise<RegionUncheckedCreateInput[]> {
    const regionsList = await Promise.all(
      regions.map(async (region) => {
        const regionData = await prisma.region.findFirst({
          where: {
            name: region,
          },
          select: {
            id: true,
            name: true,
          },
        })
        return regionData
      }),
    )

    const list = regionsList.filter((region) => region !== null)

    return list
  }
}
