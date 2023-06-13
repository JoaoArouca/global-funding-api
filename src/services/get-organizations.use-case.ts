import { OrgRepository } from '../repositories/organizations.repositories'

interface Attribute {
  id: string
}

type AttributeList = Attribute[]

export class GetOrgsUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute(orgs: string[]): Promise<AttributeList> {
    const orgsList = await Promise.all(
      orgs.map(async (org) => {
        const orgs = await this.orgRepository.findByName(org)
        return orgs
      }),
    )

    const list = orgsList
      .filter((org) => org !== null)
      .map((org) => ({ id: org?.id }))

    return list as AttributeList
  }
}
