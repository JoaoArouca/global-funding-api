import { CreateFundingDTO } from '../http/DTO/create-funding-dto'
import { FundingRepository } from '../repositories/funding.repositories'
import { FundingAlreadyExistsError } from './errors/funding-already-exists.error'

export class CreateFundingUseCase {
  constructor(private fundingRepository: FundingRepository) {}

  async execute({
    hashKey,
    title,
    institution,
    program,
    call,
    supportType,
    requiresPartner,
    TRLmin,
    TRLmax,
    term,
    minValue,
    maxValue,
    supportTax,
    duration,
    tax,
    shortage,
    amortization,
    isESG,
    link,
    status,
    lastRelease,
    objective,
    elegibility,
    expenses,
    observation,
    countriesInput,
    regionInput,
    orgsInput,
    sectorInput,
    partnersInput,
    techInput,
  }: CreateFundingDTO) {
    const fundingWithSameKey = await this.fundingRepository.findByKey(hashKey)

    if (fundingWithSameKey) {
      throw new FundingAlreadyExistsError()
    }

    const funding = await this.fundingRepository.create({
      key: hashKey,
      title,
      institution,
      program,
      call,
      supportType,
      requiresPartner,
      TRLmin,
      TRLmax,
      term,
      minValue,
      maxValue,
      supportTax,
      duration,
      tax,
      shortage,
      amortization,
      isESG,
      link,
      status,
      lastRelease,
      objective,
      elegibility,
      expenses,
      observation,
      countries: {
        connect: countriesInput,
      },
      organizations: {
        connect: orgsInput,
      },
      region: {
        connect: regionInput,
      },
      technologies: {
        connect: techInput,
      },
      sector: {
        connect: sectorInput,
      },
      partnerType: {
        connect: partnersInput,
      },
    })

    return { funding }
  }
}
