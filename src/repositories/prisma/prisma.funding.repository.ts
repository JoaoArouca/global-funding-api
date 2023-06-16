import { Prisma, funding } from '@prisma/client'
import { FundingRepository } from '../funding.repositories'
import { prisma } from '../../lib/prisma'

export class PrismaFundingRepository implements FundingRepository {
  async findByKey(hash: string): Promise<funding | null> {
    const funding = await prisma.funding.findUnique({
      where: {
        key: hash,
      },
    })

    return funding
  }

  async create(data: Prisma.fundingCreateInput): Promise<funding> {
    const newFunding = await prisma.funding.create({
      data,
      include: {
        countries: true,
        organizations: true,
        partnerType: true,
        region: true,
        sector: true,
        technologies: true,
      },
    })

    return newFunding
  }

  async getById(id: string): Promise<funding | null> {
    const funding = await prisma.funding.findFirst({
      where: {
        id,
      },
    })

    return funding
  }
}
