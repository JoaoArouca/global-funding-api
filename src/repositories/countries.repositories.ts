import { Country } from '@prisma/client'

export interface CountryRepository {
  findByName(name: string): Promise<Country | null>
}
