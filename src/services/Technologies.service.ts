import { TechnologyUncheckedCreateInput } from 'prisma'
import { prisma } from '../lib/prisma'

interface ITechnologiesService {
  getTechnologiesByName(
    techs: string[],
  ): Promise<TechnologyUncheckedCreateInput[]>
}

export class TechnologiesService implements ITechnologiesService {
  async getTechnologiesByName(
    techs: string[],
  ): Promise<TechnologyUncheckedCreateInput[]> {
    const techsList = await Promise.all(
      techs.map(async (tech) => {
        const techData = await prisma.technology.findFirst({
          where: {
            name: tech,
          },
          select: {
            id: true,
            name: true,
          },
        })
        return techData
      }),
    )

    const list = techsList.filter((tech) => tech !== null)

    return list
  }
}
