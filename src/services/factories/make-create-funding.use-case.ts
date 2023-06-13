import { PrismaFundingRepository } from '../../repositories/prisma/prisma.funding.repository'
import { CreateFundingUseCase } from '../create-funding.use-case'

export function MakeCreateFundingUseCase() {
  const fundingRepository = new PrismaFundingRepository()
  const createFundingUseCase = new CreateFundingUseCase(fundingRepository)
  return createFundingUseCase
}
