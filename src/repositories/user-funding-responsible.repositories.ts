import { Prisma, userFundingResponsible } from '@prisma/client'

export interface UserFundingResponsibleRepository {
  // TODO: Validação caso o id do funding já esteja registrado nesta tabela
  create(
    data: Prisma.userFundingResponsibleCreateInput,
  ): Promise<userFundingResponsible>
}
