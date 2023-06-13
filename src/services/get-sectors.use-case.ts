import { SectorRepository } from '../repositories/sectors.repositories'

interface Attribute {
  id: string
}

type AttributeList = Attribute[]

export class GetSectorsUseCase {
  constructor(private sectorRepository: SectorRepository) {}

  async execute(sectors: string[]): Promise<AttributeList> {
    const sectorsList = await Promise.all(
      sectors.map(async (sector) => {
        const sectorData = await this.sectorRepository.findByName(sector)
        return sectorData
      }),
    )

    const list = sectorsList
      .filter((sector) => sector !== null)
      .map((sector) => ({ id: sector?.id }))

    return list as AttributeList
  }
}
