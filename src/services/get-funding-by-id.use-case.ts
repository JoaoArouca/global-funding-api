import { FundingRepository } from '../repositories/funding.repositories'
import { FundingNotFoundError } from './errors/funding-not-found.error'

export class GetFundingByIdUseCase {
  constructor(private fundingRepository: FundingRepository) {}

  async execute(id: string) {
    const funding = await this.fundingRepository.getById(id)

    if (!funding) {
      throw new FundingNotFoundError()
    }

    return funding
  }
}
