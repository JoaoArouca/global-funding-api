import { RegionRepository } from '../repositories/regions.repositories'

interface Attribute {
  id: string
}

type AttributeList = Attribute[]

export class GetRegionsUseCase {
  constructor(private regionRepository: RegionRepository) {}

  async execute(regions: string[]): Promise<AttributeList> {
    const regionsList = await Promise.all(
      regions.map(async (region) => {
        const regions = await this.regionRepository.findByName(region)
        return regions
      }),
    )

    const list = regionsList
      .filter((region) => region !== null)
      .map((region) => ({ id: region?.id }))

    return list as AttributeList
  }
}
