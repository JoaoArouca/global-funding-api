import { PartnerTypeRepository } from '../repositories/partner-types.repositories'

interface Attribute {
  id: string
}

type AttributeList = Attribute[]

export class GetPartnerTypesUseCase {
  constructor(private partnerTypeRepository: PartnerTypeRepository) {}

  async execute(types: string[]): Promise<AttributeList> {
    const typesList = await Promise.all(
      types.map(async (type) => {
        const types = await this.partnerTypeRepository.findByName(type)
        return types
      }),
    )

    const list = typesList
      .filter((type) => type !== null)
      .map((type) => ({ id: type?.id }))

    return list as AttributeList
  }
}
