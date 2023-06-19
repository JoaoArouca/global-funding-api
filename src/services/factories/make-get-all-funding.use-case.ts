import { PrismaFundingRepository } from '../../repositories/prisma/prisma.funding.repository'
import { GetAllFundingUseCase } from '../get-all-funding.use-case'

export function MakeGetAllFundingUseCase() {
  const fundingRepository = new PrismaFundingRepository()
  const getAllFundingUseCase = new GetAllFundingUseCase(fundingRepository)

  return getAllFundingUseCase
}
