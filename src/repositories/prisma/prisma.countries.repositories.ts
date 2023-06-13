import { Country } from '@prisma/client'
import { CountryRepository } from '../countries.repositories'
import { prisma } from '../../lib/prisma'

export class PrismaCountryRepository implements CountryRepository {
  async findByName(name: string): Promise<Country | null> {
    const country = await prisma.country.findFirst({
      where: {
        name,
      },
    })

    return country
  }
}
