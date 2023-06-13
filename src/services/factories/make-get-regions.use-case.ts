import { PrismaRegionRepository } from '../../repositories/prisma/prisma.regions.repositories'
import { GetRegionsUseCase } from '../get-regions.use-case'

export function MakeGetRegionsUseCase() {
  const regionRepository = new PrismaRegionRepository()
  const getRegionsUseCase = new GetRegionsUseCase(regionRepository)
  return getRegionsUseCase
}
