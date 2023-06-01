import { SectorUncheckedCreateInput } from 'prisma'
import { prisma } from '../lib/prisma'

interface ISectorService {
  getSectorsByName(sectors: string[]): Promise<SectorUncheckedCreateInput[]>
}

export class SectorsService implements ISectorService {
  async getSectorsByName(
    sectors: string[],
  ): Promise<SectorUncheckedCreateInput[]> {
    const sectorsList = await Promise.all(
      sectors.map(async (sector) => {
        const sectorData = await prisma.sector.findFirst({
          where: {
            name: sector,
          },
          select: {
            id: true,
            name: true,
          },
        })
        return sectorData
      }),
    )

    const list = sectorsList.filter((sector) => sector !== null)

    return list
  }
}
