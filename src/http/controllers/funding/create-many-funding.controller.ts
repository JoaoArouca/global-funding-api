import { Workbook } from 'exceljs'
import { prisma } from '../../../lib/prisma'
import CryptoJS from 'crypto-js'
import { FastifyReply, FastifyRequest } from 'fastify'
import { MakeGetUserByIdUseCase } from '../../../services/factories/make-get-preuser-by-id.use-case'
import { CreateaExcelFundingsDTO } from '../../DTO/create-many-funding-dto'
import { MakeGetCountriesUseCase } from '../../../services/factories/make-get-countries.use-case'
import { env } from '../../../env'
import { MakeGetOrganizationsUseCase } from '../../../services/factories/make-get-organizations.use-case'
import { MakeGetPartnerTypesUseCase } from '../../../services/factories/make-get-partner-types.use-case'
import { MakeGetRegionsUseCase } from '../../../services/factories/make-get-regions.use-case'
import { MakeGetSectorsUseCase } from '../../../services/factories/make-get-sectors.use-case'
import { MakeGetTechnologiesUseCase } from '../../../services/factories/make-get-technologies.use-case'
import { MakeHash } from '../../../utils/encrypt'

export async function CreateManyFundingController(
  request: FastifyRequest,
  Reply: FastifyReply,
) {
  try {
    const workbook = new Workbook()
    await workbook.xlsx.readFile('base.xlsx')
    const worksheet = workbook.getWorksheet(1)

    const jsonData: CreateaExcelFundingsDTO[] = []

    const headerRow = worksheet.getRow(1)

    const columnNames: string[] = []
    headerRow.eachCell((cell) => {
      const cellValue = cell.value?.toString() ?? ''
      columnNames.push(cellValue)
    })

    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i)
      const rowData = {}

      row.eachCell((cell, colNumber) => {
        const columnName = columnNames[colNumber - 1]
        const cellValue = cell.value

        if (
          columnName === 'countries' ||
          columnName === 'regions' ||
          columnName === 'sector' ||
          columnName === 'organization' ||
          columnName === 'partnerType' ||
          columnName === 'technologies'
        ) {
          rowData[columnName] = cellValue
            ? cellValue.toString().split(';#')
            : []
        }
        if (columnName === 'isESG') {
          rowData[columnName] = cellValue !== 'Não'
        } else {
          rowData[columnName] = cellValue
        }
      })

      jsonData.push(rowData)
    }

    const getUserById = MakeGetUserByIdUseCase()
    const { preUser } = request
    const responsibleId = await getUserById.execute(preUser.id)

    await Promise.all(
      jsonData.map(async (test) => {
        const getCountriesUseCase = MakeGetCountriesUseCase()
        const getRegionsUseCase = MakeGetRegionsUseCase()
        const getOrgsUseCase = MakeGetOrganizationsUseCase()
        const getSectorsUseCase = MakeGetSectorsUseCase()
        const getTechnologiesUseCase = MakeGetTechnologiesUseCase()
        const getPartnerTypesUseCase = MakeGetPartnerTypesUseCase()

        const countriesArray = test.countries
          ? test.countries.toString().split(';#')
          : []
        const countriesInput = await getCountriesUseCase.execute(countriesArray)
        const regionArray = test.regions
          ? test.regions.toString().split(';#')
          : []
        const regionInput = await getRegionsUseCase.execute(regionArray)
        const orgsArray = test.organization
          ? test.organization.toString().split(';#')
          : []
        const orgsInput = await getOrgsUseCase.execute(orgsArray)
        const sectorArray = test.sector
          ? test.sector.toString().split(';#')
          : []
        const sectorInput = await getSectorsUseCase.execute(sectorArray)
        const techArray = test.technologies
          ? test.technologies.toString().split(';#')
          : []
        const techInput = await getTechnologiesUseCase.execute(techArray)
        const partnersArray = test.partnerType
          ? test.partnerType.toString().split(';#')
          : []
        const partnersInput = await getPartnerTypesUseCase.execute(
          partnersArray,
        )
        const key = test.program
          ? test.program.concat(test.call || '')
          : (test.call as string)

        console.log(key)

        const hashKey = CryptoJS.SHA256(key).toString()
        const hashObjective = MakeHash(test.objective, env.HASH_KEY)
        const hashElegibility = MakeHash(test.elegibility, env.HASH_KEY)
        const hashExpenses = MakeHash(test.expenses, env.HASH_KEY)
        const hashObservation = MakeHash(test.observation, env.HASH_KEY)
        const maxValue =
          test.maxValueNo === 'Não se aplica' ||
          test.maxValueNo === 'Não especificado'
            ? test.maxValueRem
            : test.maxValueNo
        const minValue =
          test.minValueNo === 'Não se aplica' ||
          test.minValueNo === 'Não especificado'
            ? test.minValueRem
            : test.minValueNo
        await prisma.funding.create({
          data: {
            amortization: test.amortization,
            duration: test.duration,
            institution: test.institution,
            maxValue,
            minValue,
            shortage: test.shortage,
            status: test.status,
            term: test.term,
            tax: test.tax,
            title: test.title,
            call: test.call,
            TRLmax: test.TRLmax,
            TRLmin: test.TRLmin,
            link: test.link.text,
            isESG: test.isESG,
            expenses: hashExpenses,
            elegibility: hashElegibility,
            objective: hashObjective,
            observation: hashObservation,
            key: hashKey,
            program: test.program,
            lastRelease: test.lastRelease.toString(),
            requiresPartner: test.requiresPartner,
            supportTax: test.supportTax,
            supportType: test.supportType,
            user_responsible: {
              connect: { id: responsibleId.id },
            },
            countries: {
              connect: countriesInput,
            },
            region: {
              connect: regionInput,
            },
            partnerType: {
              connect: partnersInput,
            },
            organizations: {
              connect: orgsInput,
            },
            sector: {
              connect: sectorInput,
            },
            technologies: {
              connect: techInput,
            },
          },
        })
      }),
    )
  } catch (error) {
    console.error('Erro ao importar dados:', error)
  }
}
