import { Prisma, userFundingResponsible } from '@prisma/client'
import { UserFundingResponsibleRepository } from '../user-funding-responsible.repositories'
import { prisma } from '../../lib/prisma'

export class PrimaUserFundingResponsibleRepository
  implements UserFundingResponsibleRepository
{
  async create(
    data: Prisma.userFundingResponsibleCreateInput,
  ): Promise<userFundingResponsible> {
    console.log(data)

    const userfundingResponsible = await prisma.userFundingResponsible.create({
      data,
    })

    return userfundingResponsible
  }
}
