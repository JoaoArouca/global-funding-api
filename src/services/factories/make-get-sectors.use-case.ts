import { PrismaSectorRepository } from '../../repositories/prisma/prisma.sectors.repositories'
import { GetSectorsUseCase } from '../get-sectors.use-case'

export function MakeGetSectorsUseCase() {
  const sectorRepository = new PrismaSectorRepository()
  const getSectorsUseCase = new GetSectorsUseCase(sectorRepository)
  return getSectorsUseCase
}
