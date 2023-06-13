import { PrismaPartnerTypeRepository } from '../../repositories/prisma/prisma.partner-types.repositories'
import { GetPartnerTypesUseCase } from '../get-partner-types.use-case'

export function MakeGetPartnerTypesUseCase() {
  const partnerTypeRepository = new PrismaPartnerTypeRepository()
  const getPartnerTypesUseCase = new GetPartnerTypesUseCase(
    partnerTypeRepository,
  )
  return getPartnerTypesUseCase
}
