import { PrismaCountryRepository } from '../../repositories/prisma/prisma.countries.repositories'
import { GetCountriesUseCase } from '../get-countries.use-case'

export function MakeGetCountriesUseCase() {
  const prismaCountryRepository = new PrismaCountryRepository()
  const getCountriesUseCase = new GetCountriesUseCase(prismaCountryRepository)

  return getCountriesUseCase
}
