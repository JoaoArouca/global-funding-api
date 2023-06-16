import { PrimaUserFundingResponsibleRepository } from '../../repositories/prisma/prisma.user-funding-responsible.repositories'
import { CreateUserFundingResponsibleUseCase } from '../create-user-funding-responsible.use-case'

export function MakeCreateUserFundingResponsibleUseCase() {
  const userfundingResponsibleRepository =
    new PrimaUserFundingResponsibleRepository()

  const createUserFundingResponsibleUseCase =
    new CreateUserFundingResponsibleUseCase(userfundingResponsibleRepository)

  return createUserFundingResponsibleUseCase
}
