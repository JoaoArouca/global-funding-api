import { PrismaTechnologyRepository } from '../../repositories/prisma/prisma.technologies.repositories'
import { GetTechnologiesUseCase } from '../get-technologies.use-case'

export function MakeGetTechnologiesUseCase() {
  const prismaTechRepository = new PrismaTechnologyRepository()
  const getTechnologiesUseCase = new GetTechnologiesUseCase(
    prismaTechRepository,
  )

  return getTechnologiesUseCase
}
