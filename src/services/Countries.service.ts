import { prisma } from '../lib/prisma'

type CountryResponse = {
  name: string
  id: string
}

interface ICountriesService {
  getCountriesByName(countries: string[]): Promise<CountryResponse[]>
}

export class CountriesService implements ICountriesService {
  async getCountriesByName(countries: string[]): Promise<CountryResponse[]> {
    const countriesList = await Promise.all(
      countries.map(async (country) => {
        const countryData = await prisma.country.findFirst({
          where: {
            name: country,
          },
          // select: {
          //   id: true,
          //   name: true,
          // },
        })
        return countryData
      }),
    )

    const list: CountryResponse[] = countriesList
      .filter((country) => country !== null)
      .map((country) => country as CountryResponse)

    return list
  }
}
