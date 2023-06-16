import { FastifyReply, FastifyRequest } from 'fastify'
import CryptoJS from 'crypto-js'
import { z } from 'zod'
import { MakeGetCountriesUseCase } from '../../../services/factories/make-get-countries.use-case'
import { MakeGetOrganizationsUseCase } from '../../../services/factories/make-get-organizations.use-case'
import { MakeGetPartnerTypesUseCase } from '../../../services/factories/make-get-partner-types.use-case'
import { MakeGetRegionsUseCase } from '../../../services/factories/make-get-regions.use-case'
import { MakeGetSectorsUseCase } from '../../../services/factories/make-get-sectors.use-case'
import { MakeGetTechnologiesUseCase } from '../../../services/factories/make-get-technologies.use-case'
import { FundingAlreadyExistsError } from '../../../services/errors/funding-already-exists.error'
import { MakeCreateFundingUseCase } from '../../../services/factories/make-create-funding.use-case'
import { MakeHash } from '../../../utils/encrypt'
import { env } from '../../../env'
import { MakeCreateUserFundingResponsibleUseCase } from '../../../services/factories/make-create-user-funding-responsible.use-case'
import { FundingNotFoundError } from '../../../services/errors/funding-not-found.error'
import { UserNotFoundError } from '../../../services/errors/user-not-found.error'

export async function FundingController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
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

  try {
    const getCountriesUseCase = MakeGetCountriesUseCase()
    const getRegionsUseCase = MakeGetRegionsUseCase()
    const getOrgsUseCase = MakeGetOrganizationsUseCase()
    const getSectorsUseCase = MakeGetSectorsUseCase()
    const getTechnologiesUseCase = MakeGetTechnologiesUseCase()
    const getPartnerTypesUseCase = MakeGetPartnerTypesUseCase()
    const countriesInput = await getCountriesUseCase.execute(countries)
    const regionInput = await getRegionsUseCase.execute(region)
    const orgsInput = await getOrgsUseCase.execute(organizations)
    const sectorInput = await getSectorsUseCase.execute(sector)
    const techInput = await getTechnologiesUseCase.execute(technologies)
    const partnersInput = await getPartnerTypesUseCase.execute(partnerType)
    const key = program ? program.concat(call || '') : (call as string)
    const hashKey = CryptoJS.SHA256(key).toString()
    const hashObjective = MakeHash(objective, env.HASH_KEY)
    const hashElegibility = MakeHash(elegibility, env.HASH_KEY)
    const hashExpenses = MakeHash(expenses, env.HASH_KEY)
    const hashObservation = MakeHash(observation, env.HASH_KEY)
    const createFundingUseCase = MakeCreateFundingUseCase()

    const fund = await createFundingUseCase.execute({
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
      objective: hashObjective,
      elegibility: hashElegibility,
      expenses: hashExpenses,
      observation: hashObservation,
      countriesInput,
      regionInput,
      orgsInput,
      sectorInput,
      partnersInput,
      techInput,
    })

    const createUserFundingResponsibleUseCase =
      MakeCreateUserFundingResponsibleUseCase()

    const { preUser } = request

    await createUserFundingResponsibleUseCase.execute({
      userId: preUser.id,
      fundingId: fund.funding.id,
    })

    return reply.status(201).send(fund)
  } catch (error) {
    if (error instanceof FundingAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof FundingNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof UserNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    return reply.status(500).send()
  }
}
