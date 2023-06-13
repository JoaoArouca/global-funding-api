import { CountryRepository } from '../repositories/countries.repositories'

interface Attribute {
  id: string
}

type AttributeList = Attribute[]

export class GetCountriesUseCase {
  constructor(private countryRepository: CountryRepository) {}

  async execute(countries: string[]): Promise<AttributeList> {
    const countriesList = await Promise.all(
      countries.map(async (country) => {
        const countries = await this.countryRepository.findByName(country)
        return countries
      }),
    )

    const list = countriesList
      .filter((country) => country !== null)
      .map((country) => ({ id: country?.id }))

    return list as AttributeList
  }
}
