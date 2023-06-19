import { FundingRepository } from '../repositories/funding.repositories'

export class GetAllFundingUseCase {
  constructor(private fundingRepository: FundingRepository) {}

  async execute() {
    const fundings = await this.fundingRepository.getAll()

    return fundings
  }
}
