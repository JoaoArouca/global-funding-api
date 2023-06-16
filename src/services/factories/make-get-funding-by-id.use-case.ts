import { PrismaFundingRepository } from '../../repositories/prisma/prisma.funding.repository'
import { GetFundingByIdUseCase } from '../get-funding-by-id.use-case'

export function MakeGetFundingByIdUseCase() {
  const fundingRepository = new PrismaFundingRepository()
  const getFundingByIdUseCase = new GetFundingByIdUseCase(fundingRepository)

  return getFundingByIdUseCase
}
