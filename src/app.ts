import { z } from 'zod'
import fastify from 'fastify'
import { CountriesService } from './services/Countries.service'
import { RegionsService } from './services/Regions.service'
import { OrganizationsService } from './services/Organizations.service'
import { SectorsService } from './services/Sectors.service'
import { PartnerTypesService } from './services/PartnerTypes.service'
import { TechnologiesService } from './services/Technologies.service'
import { prisma } from './lib/prisma'

export const app = fastify()

app.get('/health', (_request, reply) => {
  reply.status(200).send('Server is healthy')
})

app.post('/funding', async (request, reply) => {
  const fundingBodySchema = z.object({
    title: z.string(),
    institution: z.string(),
    program: z.string().nullable(),
    call: z.string().nullable(),
    supportType: z.string(),
    requiresPartner: z.string(),
    TRLmin: z.string(),
    TRLmax: z.string(),
    term: z.string(),
    // currency: z.string().nullable(),
    minValue: z.string(),
    maxValue: z.string(),
    supportTax: z.string(),
    duration: z.string(),
    tax: z.string(),
    shortage: z.string(),
    amortization: z.string(),
    isESG: z.boolean(),
    link: z.string(),
    status: z.string(),
    lastRelease: z.string(),
    objective: z.string().nullable(),
    elegibility: z.string().nullable(),
    expenses: z.string().nullable(),
    observation: z.string().nullable(),
    countries: z.array(z.string()),
    region: z.array(z.string()),
    organizations: z.array(z.string()),
    sector: z.array(z.string()),
    partnerType: z.array(z.string()),
    technologies: z.array(z.string()),
  })

  const {
    title,
    institution,
    program,
    call,
    supportType,
    requiresPartner,
    TRLmin,
    TRLmax,
    term,
    // currency,
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
    countries,
    region,
    organizations,
    sector,
    partnerType,
    technologies,
  } = fundingBodySchema.parse(request.body)

  const countriesServices = new CountriesService()
  const regionsServices = new RegionsService()
  const organizationsService = new OrganizationsService()
  const sectorsService = new SectorsService()
  const partnerTypesService = new PartnerTypesService()
  const technologiesService = new TechnologiesService()

  const _countries = await countriesServices.getCountriesByName(countries)
  const countriesInput = _countries.map((country) => ({
    id: country.id,
  }))

  const _organizations = await organizationsService.getOrganizationsByName(
    organizations,
  )
  const orgsInput = _organizations.map((org) => ({
    id: org.id,
  }))

  const _sectors = await sectorsService.getSectorsByName(sector)
  const sectorInput = _sectors.map((sector) => ({
    id: sector.id,
  }))

  const _technologies = await technologiesService.getTechnologiesByName(
    technologies,
  )
  const techInput = _technologies.map((tech) => ({
    id: tech.id,
  }))

  const _partnerTypes = await partnerTypesService.getPartnerTypesByName(
    partnerType,
  )
  const partnersInput = _partnerTypes.map((type) => ({
    id: type.id,
  }))

  const _regions = await regionsServices.getRegionByName(region)
  const regionInput = _regions.map((region) => ({
    id: region.id,
  }))

  const key = program ? program.concat(call || '') : (call as string)

  const newFund = await prisma.funding.create({
    data: {
      // currency,
      key,
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
    },
    include: {
      countries: true,
      organizations: true,
      partnerType: true,
      region: true,
      sector: true,
      technologies: true,
    },
  })

  reply.status(201).send(newFund)
})
