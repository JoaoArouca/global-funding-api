import { TechnologyRepository } from '../repositories/technologies.repositories'

interface Attribute {
  id: string
}

type AttributeList = Attribute[]

export class GetTechnologiesUseCase {
  constructor(private technologyRepository: TechnologyRepository) {}

  async execute(techs: string[]): Promise<AttributeList> {
    const techsList = await Promise.all(
      techs.map(async (tech) => {
        const techs = await this.technologyRepository.findByName(tech)
        return techs
      }),
    )

    const list = techsList
      .filter((tech) => tech !== null)
      .map((tech) => ({ id: tech?.id }))

    return list as AttributeList
  }
}
